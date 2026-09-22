import React, { useState, useEffect, useRef } from 'react';
import { Problem } from '../../types';
import {
  Play,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  Terminal,
  Clock,
  Cpu,
  Trophy,
  AlertTriangle,
  Lightbulb,
  FileCode2,
  Flame
} from 'lucide-react';
import {
  runSampleTestCases,
  submitSolution,
  TestCaseResult,
  SubmissionResult
} from '../../utils/javaCodeRunner';

interface CodePlaygroundRunnerProps {
  problem: Problem;
  onAskAi: (prompt: string) => void;
  onProblemSolved?: (problemId: string) => void;
}

export const CodePlaygroundRunner: React.FC<CodePlaygroundRunnerProps> = ({
  problem,
  onAskAi,
  onProblemSolved
}) => {
  const [code, setCode] = useState<string>(problem.starterCode);
  const [copied, setCopied] = useState(false);
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [runResults, setRunResults] = useState<TestCaseResult[] | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmissionResult | null>(null);
  const [consoleTab, setConsoleTab] = useState<'cases' | 'result'>('cases');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync starter code when problem changes, checking if user had saved code
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem(`dsa_code_${problem.id}`);
      if (savedCode) {
        setCode(savedCode);
      } else {
        setCode(problem.starterCode);
      }
    } catch {
      setCode(problem.starterCode);
    }
    setRunResults(null);
    setSubmitResult(null);
    setActiveTestCaseIdx(0);
    setConsoleTab('cases');
  }, [problem.id, problem.starterCode]);

  // Persist code on change
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    try {
      localStorage.setItem(`dsa_code_${problem.id}`, newCode);
    } catch {
      // ignore
    }
  };

  // Handle Tab key in code editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      const updated = value.substring(0, start) + '    ' + value.substring(end);
      handleCodeChange(updated);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    if (window.confirm('Reset code back to the initial starter template?')) {
      handleCodeChange(problem.starterCode);
      setRunResults(null);
      setSubmitResult(null);
    }
  };

  const handleLoadOptimal = () => {
    handleCodeChange(problem.javaSolution);
    setRunResults(null);
    setSubmitResult(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setConsoleTab('cases');
    try {
      const results = await runSampleTestCases(code, problem.testCases);
      setRunResults(results);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setConsoleTab('result');
    try {
      const result = await submitSolution(code, problem.testCases, problem.hiddenTestCases || []);
      setSubmitResult(result);
      if (result.verdict === 'Accepted') {
        try {
          const saved = localStorage.getItem('dsa_solved_problems') || '[]';
          const parsed = JSON.parse(saved);
          if (!parsed.includes(problem.id)) {
            parsed.push(problem.id);
            localStorage.setItem('dsa_solved_problems', JSON.stringify(parsed));
          }
          if (onProblemSolved) {
            onProblemSolved(problem.id);
          }
        } catch {
          // ignore
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Line numbers calculation
  const linesCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: linesCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Editor Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-200">
            <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">Solution.java</span>
            <span className="text-[10px] text-slate-500 font-normal">Java 21</span>
          </div>

          {problem.conceptName && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
              <Lightbulb className="w-3 h-3 text-cyan-400" />
              {problem.conceptName}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleLoadOptimal}
            title="Load the optimal, verified Java solution into the editor"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 text-xs font-mono transition"
          >
            <Sparkles className="w-3 h-3" />
            <span>Load Solution</span>
          </button>

          <button
            onClick={handleResetCode}
            title="Reset code template"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyCode}
            title="Copy code"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="relative flex bg-[#0c1017] min-h-[300px] max-h-[460px] overflow-hidden">
        {/* Line Numbers Gutter */}
        <div className="w-10 select-none py-3 px-1 text-right font-mono text-xs text-slate-600 bg-slate-950/50 border-r border-slate-800/60">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="flex-1 w-full p-3 font-mono text-xs text-emerald-200 bg-transparent resize-none leading-6 focus:outline-none selection:bg-emerald-500/30 selection:text-white"
        />
      </div>

      {/* Execution Control Footer */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAi(`Here is my Java code for "${problem.title}" (LC #${problem.leetcodeNumber || ''}):\n\n\`\`\`java\n${code}\n\`\`\`\nPlease review my code, analyze time/space complexity, and point out any potential edge cases or bugs.`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/70 hover:bg-purple-900/80 text-purple-300 border border-purple-800/60 text-xs font-mono font-semibold transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Ask AI Review</span>
          </button>

          <button
            onClick={() => onAskAi(`I am working on "${problem.title}" (${problem.conceptName || problem.patternName}). Can you give me a small hint without spoiling the complete solution?`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Need Hint</span>
          </button>
        </div>

        {/* Run & Submit Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-bold border border-slate-700 shadow transition disabled:opacity-50"
          >
            {isRunning ? (
              <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            )}
            <span>Run Code</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-950/60 border border-emerald-500 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            <span>Submit</span>
          </button>
        </div>
      </div>

      {/* Testcases & Execution Console Area */}
      <div className="bg-slate-950 border-t border-slate-800 p-4 flex flex-col gap-3">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setConsoleTab('cases')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                consoleTab === 'cases'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Test Cases</span>
            </button>

            {submitResult && (
              <button
                onClick={() => setConsoleTab('result')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                  consoleTab === 'result'
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Submission Verdict</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
            <span>{problem.testCases.length} sample cases</span>
            {problem.hiddenTestCases && <span>• {problem.hiddenTestCases.length} hidden</span>}
          </div>
        </div>

        {/* Submit Result View */}
        {consoleTab === 'result' && submitResult && (
          <div className="flex flex-col gap-3">
            {submitResult.verdict === 'Accepted' ? (
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-600/70 flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <Trophy className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-emerald-400 font-mono flex items-center gap-2">
                        Accepted
                        <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {submitResult.totalPassed} / {submitResult.totalTests} test cases passed.
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Solved & Verified
                  </span>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px]">Runtime:</span>
                      <span className="font-bold text-slate-200">
                        {submitResult.runtimeMs} ms{' '}
                        <span className="text-emerald-400 font-normal">
                          (Beats {submitResult.runtimePercentile})
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px]">Memory:</span>
                      <span className="font-bold text-slate-200">
                        {submitResult.memoryMb}{' '}
                        <span className="text-cyan-400 font-normal">
                          (Beats {submitResult.memoryPercentile})
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/60 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <h4 className="text-sm font-bold text-rose-400 font-mono">
                    {submitResult.verdict}
                  </h4>
                </div>
                {submitResult.errorMessage && (
                  <p className="text-xs text-rose-200 font-mono bg-slate-950/80 p-3 rounded-lg border border-rose-900/40">
                    {submitResult.errorMessage}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                  <span>Passed {submitResult.totalPassed} of {submitResult.totalTests} test cases.</span>
                  <button
                    onClick={handleLoadOptimal}
                    className="text-emerald-400 underline hover:text-emerald-300 ml-2"
                  >
                    View optimal solution
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Test Case Selection & Details View */}
        {consoleTab === 'cases' && (
          <div className="flex flex-col gap-3">
            {/* Case Selector Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {problem.testCases.map((tc, idx) => {
                const result = runResults ? runResults[idx] : null;
                const isSelected = !isCustomMode && activeTestCaseIdx === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsCustomMode(false);
                      setActiveTestCaseIdx(idx);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-800 text-white border border-cyan-500/50'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>Case {idx + 1}</span>
                    {result && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          result.passed ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => setIsCustomMode(true)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                  isCustomMode
                    ? 'bg-slate-800 text-white border border-cyan-500/50'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                + Custom Input
              </button>
            </div>

            {/* Selected Case Content */}
            {!isCustomMode && problem.testCases[activeTestCaseIdx] && (
              <div className="flex flex-col gap-2 font-mono text-xs">
                {/* Input */}
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Input:</span>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-slate-200 overflow-x-auto">
                    {problem.testCases[activeTestCaseIdx].input}
                  </div>
                </div>

                {/* Expected Output */}
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Expected Output:</span>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-emerald-400 overflow-x-auto font-bold">
                    {problem.testCases[activeTestCaseIdx].expectedOutput}
                  </div>
                </div>

                {/* Run Results if executed */}
                {runResults && runResults[activeTestCaseIdx] && (
                  <div className="mt-1 pt-2 border-t border-slate-800/80 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">Your Output:</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-bold ${
                          runResults[activeTestCaseIdx].passed
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {runResults[activeTestCaseIdx].passed ? 'Test Passed' : 'Wrong Answer'}
                      </span>
                    </div>
                    <div
                      className={`p-2.5 rounded-lg border overflow-x-auto ${
                        runResults[activeTestCaseIdx].passed
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                          : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                      }`}
                    >
                      {runResults[activeTestCaseIdx].actualOutput}
                    </div>

                    {runResults[activeTestCaseIdx].errorMessage && (
                      <div className="p-2 bg-rose-950/30 border border-rose-900/50 rounded text-rose-300 text-[11px]">
                        {runResults[activeTestCaseIdx].errorMessage}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Custom Input Mode */}
            {isCustomMode && (
              <div className="flex flex-col gap-2 font-mono text-xs">
                <span className="text-[11px] text-slate-400">Custom Testcase Input:</span>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g. nums = [1, 2, 3], target = 4"
                  className="w-full h-20 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="self-start px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition disabled:opacity-50"
                >
                  Run Custom Case
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
