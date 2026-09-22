import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in AI Studio settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "DSA Java AI Expert API" });
});

// Helper function to execute Gemini request with automatic fallback on transient 503/429 errors
async function generateWithFallback(
  ai: GoogleGenAI,
  primaryModel: string,
  contents: any[],
  config: any
): Promise<{ text: string; modelUsed: string }> {
  // Ordered sequence of fallback models based on task compatibility
  const candidatePool = [
    primaryModel,
    'gemini-3.8-flash',
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite'
  ];
  // Deduplicate while preserving order
  const modelsToTry = Array.from(new Set(candidatePool));

  let lastError: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const candidate = modelsToTry[i];
    try {
      const response = await ai.models.generateContent({
        model: candidate,
        contents,
        config,
      });

      const replyText = response.text;
      if (replyText) {
        return { text: replyText, modelUsed: candidate };
      }
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || String(err);
      console.warn(`Attempt with '${candidate}' failed (${errMsg}).`);

      // If there are more models to try, wait briefly before switching
      if (i < modelsToTry.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }
  }

  throw lastError;
}

// AI Chat Endpoint for Java DSA Expert
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model, systemInstruction, context } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
    }

    const ai = getAI();

    // Default to gemini-3.8-flash as specified by project configuration
    const selectedModel = model || "gemini-3.8-flash";

    // Build the system instruction tailored for Java DSA expert
    const defaultSystemInstruction = `You are a world-class Senior FAANG Principal Engineer, Staff Interviewer, and Master DSA Coach specializing in Java (Java 8 through Java 21).
Your mission is to provide deep, crystal-clear, pedagogically sound, and mathematically rigorous answers to any Data Structures and Algorithms question in Java.

When answering:
1. EXPLANATION & INTUITION: Start with an intuitive mental model or high-level visual concept before diving into code.
2. PRODUCTION JAVA CODE: Write clean, modern, idiomatic Java with proper generics, naming conventions, and inline comments explaining key lines.
3. COMPLEXITY ANALYSIS: Always state exact Time Complexity and Auxiliary Space Complexity using standard Big-O notation, with a 1-2 sentence justification for both.
4. EDGE CASES & TRAPS: Highlight subtle Java-specific edge cases (e.g., Integer overflow with (low + high) / 2 vs low + (high - low) / 2, null handling, empty arrays, comparator contracts in PriorityQueue/TreeMap, object reference equality == vs .equals()).
5. DRY-RUN: When applicable, provide a concise table or step-by-step dry-run of a small example.
6. FORMATTING: Use clean Markdown with syntax-highlighted java code blocks (\`\`\`java). Use bolding and structured headings for readability.`;

    const finalSystemInstruction = systemInstruction
      ? `${defaultSystemInstruction}\n\nAdditional Role Focus:\n${systemInstruction}`
      : defaultSystemInstruction;

    // Format conversation history for Gemini API
    // Gemini SDK expects contents array: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    // If context is provided (e.g. current pattern, problem, code snippet) and there is a last message,
    // we enrich the prompt context seamlessly
    if (context && context.patternName && contents.length > 0) {
      const lastUserIndex = contents.map(c => c.role).lastIndexOf("user");
      if (lastUserIndex !== -1) {
        const originalText = contents[lastUserIndex].parts[0].text;
        contents[lastUserIndex].parts[0].text = `[Active Learning Context: Pattern: "${context.patternName}"]\n${
          context.codeSnippet ? `[Active Java Code Snippet]:\n\`\`\`java\n${context.codeSnippet}\n\`\`\`\n\n` : ""
        }${originalText}`;
      }
    }

    const { text, modelUsed } = await generateWithFallback(
      ai,
      selectedModel,
      contents,
      {
        systemInstruction: finalSystemInstruction,
        temperature: 0.6,
      }
    );

    return res.json({ text, modelUsed });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    const rawError = error?.message || String(error);
    const isHighDemand =
      rawError.includes("503") ||
      rawError.includes("high demand") ||
      rawError.includes("UNAVAILABLE") ||
      rawError.includes("Resource has been exhausted");

    const userFriendlyMessage = isHighDemand
      ? "The Gemini model is currently experiencing temporary high demand spikes. Please wait a few seconds and try sending again or switch models."
      : rawError;

    return res.status(isHighDemand ? 503 : 500).json({
      error: userFriendlyMessage,
      isHighDemand,
    });
  }
});

// Vite middleware for development vs Static file server for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DSA Visual Mastery server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
