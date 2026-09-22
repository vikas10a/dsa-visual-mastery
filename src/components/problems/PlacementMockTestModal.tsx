import React, { useState, useEffect } from 'react';
import { Problem } from '../../types';
import {
  X,
  Clock,
  Briefcase,
  Play,
  CheckCircle2,
  Trophy,
  AlertCircle,
  Building2,
  Award
} from 'lucide-react';

interface PlacementMockTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProblems: Problem[];
  onSelectProblemForTest: (problem: Problem) => void;
  solvedProblemIds: string[];
}

export const PlacementMockTestModal: React.FC<PlacementMockTestModalProps> = ({
  isOpen,
  onClose,
  allProblems,
  onSelectProblemForTest,
  solvedProblemIds
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('Amazon');
  const [testDurationMinutes, setTestDurationMinutes] = useState<number>(45);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(45 * 60);
  const [testProblems, setTestProblems] = useState<Problem[]>([]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTestActive && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsTestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestActive, timeRemainingSeconds]);

  if (!isOpen) return null;

  const companiesList = [
    { name: 'Amazon', role: 'SDE-1 Online Assessment', problemsCount: 2, defaultMins: 45 },
    { name: 'Google', role: 'SWE Technical Round', problemsCount: 2, defaultMins: 45 },
    { name: 'Meta', role: 'Coding Screen', problemsCount: 2, defaultMins: 45 },
    { name: 'Microsoft', role: 'Codility / Interview Test', problemsCount: 3, defaultMins: 60 },
    { name: 'Bloomberg', role: 'Technical Interview', problemsCount: 2, defaultMins: 45 }
  ];

  const handleStartTest = () => {
    // Filter problems tagged with selected company
    const matching = allProblems.filter(
      (p) => p.companies && p.companies.some((c) => c.toLowerCase() === selectedCompany.toLowerCase())
    );

    // Pick 2-3 problems
    const selected = (matching.length >= 2 ? matching : allProblems).slice(0, 3);
    setTestProblems(selected);
    setTimeRemainingSeconds(testDurationMinutes * 60);
    setIsTestActive(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const solvedInTestCount = testProblems.filter((p) => solvedProblemIds.includes(p.id)).length;
  const scorePercent = testProblems.length > 0 ? Math.round((solvedInTestCount / testProblems.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                Company Placement & Interview Assessment
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Simulated timed company placement round with live evaluation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isTestActive && (
            <>
              {/* Company Selection */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase font-bold block mb-2.5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  Select Target Placement Company:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {companiesList.map((comp) => {
                    const isSelected = selectedCompany === comp.name;
                    return (
                      <button
                        key={comp.name}
                        onClick={() => {
                          setSelectedCompany(comp.name);
                          setTestDurationMinutes(comp.defaultMins);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500/30'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm font-mono text-white">{comp.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            {comp.defaultMins} mins
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">{comp.role}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration Setting */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase font-bold block mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Test Duration:
                </label>
                <div className="flex gap-2">
                  {[30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setTestDurationMinutes(mins)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition border ${
                        testDurationMinutes === mins
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mins} Minutes
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono space-y-1.5">
                <span className="font-bold text-slate-100 block mb-1">Assessment Rules:</span>
                <div>• You will be assigned 2-3 genuine LeetCode questions asked in {selectedCompany} placements.</div>
                <div>• Write and verify your code in Java, run against sample tests, and submit to pass all test cases.</div>
                <div>• The timer begins as soon as you press Start Assessment.</div>
              </div>

              <button
                onClick={handleStartTest}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-sm font-bold shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start {selectedCompany} Placement Assessment</span>
              </button>
            </>
          )}

          {/* Active Test View */}
          {isTestActive && (
            <div className="space-y-6">
              {/* Timer Bar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">
                    {selectedCompany} Mock Test
                  </span>
                  <span className="text-sm font-bold text-slate-200 font-mono">
                    Progress: {solvedInTestCount} / {testProblems.length} Solved ({scorePercent}%)
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700">
                  <Clock className={`w-4 h-4 ${timeRemainingSeconds < 300 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
                  <span
                    className={`text-lg font-mono font-bold ${
                      timeRemainingSeconds < 300 ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {formatTimer(timeRemainingSeconds)}
                  </span>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
                  Assigned Problems:
                </span>
                {testProblems.map((prob, idx) => {
                  const isSolved = solvedProblemIds.includes(prob.id);
                  return (
                    <div
                      key={prob.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                prob.difficulty === 'Easy'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : prob.difficulty === 'Medium'
                                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                  : 'bg-rose-950 text-rose-400 border border-rose-800'
                              }`}
                            >
                              {prob.difficulty}
                            </span>
                            <span className="text-xs font-mono text-cyan-400">
                              LC #{prob.leetcodeNumber || 'N/A'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white font-mono">
                            {prob.title}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">
                            {prob.conceptName || prob.patternName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSolved ? (
                          <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Solved
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              onSelectProblemForTest(prob);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition shadow"
                          >
                            Solve Now
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* End Test Button */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setIsTestActive(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition"
                >
                  End Assessment
                </button>

                {solvedInTestCount === testProblems.length && testProblems.length > 0 && (
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <Award className="w-4 h-4" />
                    All questions completed! Outstanding score!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
