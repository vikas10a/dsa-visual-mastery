import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import {
  Sparkles,
  Send,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  Coffee,
  Brain,
  Zap,
  Target,
  Bug,
  BookOpen,
  ArrowRight,
  Code2,
  RefreshCw,
  HelpCircle,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Pattern } from '../../types';
import { CORE_15_PATTERNS } from '../../data/patternsData';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
  roleType?: string;
  isError?: boolean;
  failedPrompt?: string;
}

interface AiJavaExpertProps {
  currentPattern?: Pattern;
  onSelectPattern?: (patternId: string) => void;
}

const EXPERT_ROLES = [
  {
    id: 'interviewer',
    name: 'FAANG Staff Interviewer',
    icon: Target,
    tagline: 'High-stakes technical interview simulation, trade-offs & edge cases',
    promptInstruction:
      'Adopt the persona of a Senior FAANG Staff Interviewer. Rigorously evaluate code, challenge asymptotic assumptions, ask targeted follow-up questions, and highlight real production trade-offs.'
  },
  {
    id: 'tutor',
    name: 'DSA Intuition Master',
    icon: Brain,
    tagline: 'Step-by-step visual models, analogies & memory breakdown',
    promptInstruction:
      'Adopt the persona of a Master Computer Science Educator. Break down complex algorithms into simple, intuitive mental models with clear step-by-step dry-run traces and visual ASCII/conceptual diagrams.'
  },
  {
    id: 'optimizer',
    name: 'Code Optimizer & Bug Hunter',
    icon: Bug,
    tagline: 'Fix off-by-one errors, TLE, and optimize to O(N) or O(1) space',
    promptInstruction:
      'Adopt the persona of a High-Performance Java Systems Architect. Focus on identifying logic bugs, off-by-one errors, memory bloat (e.g., Integer vs int autoboxing), cache locality, and algorithmic optimization.'
  },
  {
    id: 'jvm',
    name: 'Java Collections & JVM Guru',
    icon: Coffee,
    tagline: 'Deep dive into HashMap internals, TreeMap Red-Black trees, Heap invariants',
    promptInstruction:
      'Adopt the persona of a Java Virtual Machine & standard library expert. Explain internal mechanics of java.util collections (table resizing, treeification, PriorityQueue binary heap, ArrayDeque circular buffer).'
  }
];

const AVAILABLE_MODELS = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    badge: 'Recommended',
    description: 'Fast, highly articulate coding & DSA reasoning'
  },
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    badge: 'Standard',
    description: 'Balanced multi-turn reasoning and explanations'
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    badge: 'Ultra Fast',
    description: 'Lightning-quick algorithmic queries and lookups'
  }
];

const QUICK_QUESTIONS = [
  'Explain Two Pointers vs Sliding Window in Java with real examples',
  'How does HashMap handle hash collisions & treeification in Java 8+?',
  'Why does (low + high) / 2 cause integer overflow in Binary Search?',
  'Show an optimal Java solution for 3Sum with O(1) extra space',
  'How to design a custom Comparator in PriorityQueue for interval merging?',
  'When should I choose Monotonic Stack over Two Pointers?',
  'Explain the 5 core steps of Backtracking with state restoration',
  'What is the difference between ArrayDeque and LinkedList as a Queue?'
];

export const AiJavaExpert: React.FC<AiJavaExpertProps> = ({
  currentPattern,
  onSelectPattern
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('dsa_ai_expert_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        text: `### Welcome to the **Java DSA AI Expert** ☕✨
I am your dedicated **Staff-Level DSA Architect & FAANG Interview Coach**. Ask me anything about Data Structures and Algorithms in Java:

- **Algorithm Pattern Breakdowns** (Two Pointers, Sliding Window, Monotonic Stack, DP, Graphs)
- **Java Collection Internals** (\`HashMap\`, \`TreeMap\`, \`PriorityQueue\`, \`ArrayDeque\`)
- **Code Reviews & Debugging** (Send your Java solution to find bugs, edge cases, or TLE causes)
- **Asymptotic Complexity (Big-O)** with mathematical space & time proofs
- **Live Interview Prep** & dry-run simulation

Choose a persona above or pick a quick question below to get started!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.8-flash',
        roleType: 'interviewer'
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState(EXPERT_ROLES[0]);
  const [selectedModel, setSelectedModel] = useState('gemini-3.8-flash');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [includePatternContext, setIncludePatternContext] = useState(true);
  const [showCodeSnippetInput, setShowCodeSnippetInput] = useState(false);
  const [customCodeSnippet, setCustomCodeSnippet] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem('dsa_ai_expert_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Check for pending quick prompt from floating widget
  useEffect(() => {
    try {
      const pendingPrompt = sessionStorage.getItem('dsa_ai_pending_prompt');
      if (pendingPrompt) {
        sessionStorage.removeItem('dsa_ai_pending_prompt');
        handleSendMessage(pendingPrompt);
      }
    } catch {
      // ignore
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    // Prepare context payload
    const contextPayload: any = {};
    if (includePatternContext && currentPattern) {
      contextPayload.patternName = currentPattern.name;
      contextPayload.codeSnippet = customCodeSnippet || currentPattern.javaCode;
    } else if (customCodeSnippet) {
      contextPayload.codeSnippet = customCodeSnippet;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, text: m.text })),
          model: selectedModel,
          systemInstruction: selectedRole.promptInstruction,
          context: Object.keys(contextPayload).length > 0 ? contextPayload : undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.text || 'No response returned from the model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
        roleType: selectedRole.id
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const isHighDemand =
        err?.message?.includes('high demand') ||
        err?.message?.includes('503') ||
        err?.message?.includes('UNAVAILABLE') ||
        err?.message?.includes('Demand Spike');

      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: isHighDemand
          ? `⚠️ **Gemini Model Demand Spike (503):**\n\nThe AI servers are currently experiencing heavy traffic. You can retry immediately or switch to **Gemini 3.1 Flash Lite** below.`
          : `⚠️ **Error communicating with AI Expert:**\n\n${err?.message || 'Unable to fetch response.'}\n\nPlease check your internet connection or verify your API key in AI Studio Settings.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
        failedPrompt: query
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your conversation history?')) {
      const initialWelcome: ChatMessage = {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: `### Conversation Cleared ✨\nI am ready for your next Java DSA challenge. What would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
        roleType: selectedRole.id
      };
      setMessages([initialWelcome]);
      try {
        localStorage.removeItem('dsa_ai_expert_chat_history');
      } catch {
        // ignore
      }
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight font-mono flex items-center gap-2">
                  AI Java DSA Expert
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-bold">
                    Powered by Gemini 3.8
                  </span>
                </h1>
                <p className="text-sm text-slate-400">
                  Full-stack conversational architect for algorithmic proofs, JVM memory optimization, and FAANG interviews
                </p>
              </div>
            </div>
          </div>

          {/* Model & History Action Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Model Selector */}
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <div className="text-xs font-mono">
                <span className="text-slate-400 text-[10px] block">Active Model</span>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer"
                >
                  {AVAILABLE_MODELS.map((m) => (
                    <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                      {m.name} ({m.badge})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear History Button */}
            <button
              onClick={handleClearHistory}
              title="Clear chat history"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-800/60 transition text-xs font-mono"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Persona / Role Selector Chips */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            Select Expert Persona:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {EXPERT_ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole.id === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-950/40 text-white ring-1 ring-emerald-500/50'
                      : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/50 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="font-mono text-xs font-bold">{role.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{role.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Thread & Context Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column: Context & Quick Prompts (1 col) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Current Pattern Context Box */}
          {currentPattern && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Context Binding
                </span>
                <label className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePatternContext}
                    onChange={(e) => setIncludePatternContext(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Sync Pattern</span>
                </label>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                <div className="text-emerald-400 font-bold mb-1">{currentPattern.name}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">{currentPattern.tagline}</div>
              </div>

              <button
                onClick={() =>
                  handleSendMessage(
                    `Explain the optimal Java solution for the "${currentPattern.name}" pattern, including exact time and space complexity, and how to write it cleanly in an interview.`
                  )
                }
                disabled={isLoading}
                className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/80 text-xs font-mono font-semibold transition flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Explain Current Pattern</span>
              </button>

              <button
                onClick={() => setShowCodeSnippetInput((prev) => !prev)}
                className="w-full text-center text-[11px] font-mono text-slate-400 hover:text-slate-200 transition"
              >
                {showCodeSnippetInput ? '▲ Hide Custom Java Code' : '▼ Paste Custom Java Code to Review'}
              </button>

              {showCodeSnippetInput && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <textarea
                    rows={4}
                    value={customCodeSnippet}
                    onChange={(e) => setCustomCodeSnippet(e.target.value)}
                    placeholder="Paste your Java code here to debug or optimize..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                  <button
                    onClick={() =>
                      handleSendMessage(
                        `Please review, debug, and optimize my Java code snippet below. Point out any subtle bugs, off-by-one errors, or memory inefficiencies, and provide the refined production-grade version:\n\n\`\`\`java\n${customCodeSnippet}\n\`\`\``
                      )
                    }
                    disabled={!customCodeSnippet.trim() || isLoading}
                    className="w-full py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-semibold hover:bg-cyan-900 transition disabled:opacity-40"
                  >
                    Analyze My Java Code
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Questions Starter Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Frequently Asked DSA
            </span>
            <div className="space-y-1.5">
              {QUICK_QUESTIONS.slice(0, 5).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="w-full text-left p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition flex items-start gap-2 group disabled:opacity-50"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  <span className="line-clamp-2">{q}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Chat Thread (3 cols) */}
        <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col h-[750px] shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Thread Header Bar */}
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-bold text-white">
                Active Session: {selectedRole.name}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {messages.length} messages in history
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Model Avatar */}
                  {!isUser && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 shrink-0 shadow-md">
                      <Bot className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex items-center justify-between gap-4 mb-2 text-[11px] opacity-75 font-mono">
                      <span className="font-bold flex items-center gap-1">
                        {isUser ? 'You' : 'Java DSA Expert'}
                        {!isUser && message.modelUsed && (
                          <span className="text-[10px] text-cyan-400 font-normal">
                            ({message.modelUsed})
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>{message.timestamp}</span>
                        {!isUser && (
                          <button
                            onClick={() => copyToClipboard(message.text, message.id)}
                            title="Copy response"
                            className="hover:text-white transition"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content Rendering */}
                    {isUser ? (
                      <div className="text-sm whitespace-pre-wrap font-sans leading-relaxed">
                        {message.text}
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed font-sans">
                        <Markdown
                          components={{
                            code({ className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || '');
                              const codeString = String(children).replace(/\n$/, '');
                              if (match) {
                                return (
                                  <div className="relative my-3 rounded-xl overflow-hidden border border-slate-800 bg-[#06080d] font-mono text-xs">
                                    <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-slate-400">
                                      <span className="font-bold text-emerald-400 uppercase text-[11px]">
                                        {match[1]}
                                      </span>
                                      <button
                                        onClick={() => copyToClipboard(codeString, `code-${Math.random()}`)}
                                        className="text-[11px] hover:text-white flex items-center gap-1 transition text-slate-300"
                                      >
                                        <Copy className="w-3 h-3" />
                                        <span>Copy Code</span>
                                      </button>
                                    </div>
                                    <pre className="p-3.5 overflow-x-auto text-emerald-300 font-mono leading-relaxed">
                                      <code>{codeString}</code>
                                    </pre>
                                  </div>
                                );
                              }
                              return (
                                <code
                                  className="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-xs font-mono"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                            h1: ({ children }) => (
                              <h1 className="text-lg font-bold text-white font-mono mt-3 mb-2">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-base font-bold text-emerald-400 font-mono mt-3 mb-2">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-sm font-bold text-cyan-300 font-mono mt-2 mb-1">{children}</h3>
                            ),
                            ul: ({ children }) => <ul className="list-disc pl-5 my-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 my-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="text-slate-300">{children}</li>,
                            strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>
                          }}
                        >
                          {message.text}
                        </Markdown>

                        {/* Interactive Retry Buttons for Errors */}
                        {message.isError && message.failedPrompt && (
                          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => handleSendMessage(message.failedPrompt)}
                              disabled={isLoading}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition shadow disabled:opacity-50"
                            >
                              <RefreshCw className="w-3 h-3" />
                              Retry Question
                            </button>
                            <button
                              onClick={() => {
                                setSelectedModel('gemini-3.1-flash-lite');
                                handleSendMessage(message.failedPrompt);
                              }}
                              disabled={isLoading}
                              className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-mono text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                            >
                              <Zap className="w-3 h-3 text-cyan-400" />
                              Retry with Flash Lite
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 border border-slate-700 shadow-md">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Streaming Indicator */}
            {isLoading && (
              <div className="flex gap-3.5 justify-start">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 shrink-0 animate-pulse">
                  <Bot className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="bg-slate-950 border border-slate-800 text-slate-300 rounded-2xl rounded-tl-none p-4 shadow-lg flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span className="text-xs font-mono text-slate-400 animate-pulse">
                    Synthesizing Java algorithmic logic & complexity bounds...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Chat Input Area */}
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <div className="relative flex items-end gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 focus-within:border-emerald-500 transition-all shadow-inner">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask any Java DSA question (e.g. 'How does TreeMap rebalance in Java?', 'Help me solve LeetCode 15'). Press Enter to send..."
                rows={2}
                disabled={isLoading}
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none font-sans px-2 py-1 leading-relaxed max-h-32"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 flex items-center justify-center transition shrink-0 font-bold shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
              <span>Shift + Enter for new line • Enter to send</span>
              <span className="text-emerald-400 font-semibold">Java 17 / 21 Idiomatic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
