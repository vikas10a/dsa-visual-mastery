import React, { useState, useEffect } from 'react';
import { CORE_15_PATTERNS } from './data/patternsData';
import { useTheme } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { UniversalVisualizer } from './components/visualizer/UniversalVisualizer';
import { PatternDetective } from './components/detective/PatternDetective';
import { PatternDecisionTree } from './components/detective/PatternDecisionTree';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { JavaDsGuide } from './components/guide/JavaDsGuide';
import { ProblemLibrary } from './components/problems/ProblemLibrary';
import { ComplexityVisualizer } from './components/complexity/ComplexityVisualizer';
import { InterviewMode } from './components/interview/InterviewMode';
import { QuizSection } from './components/quiz/QuizSection';
import { RevisionFlashcards } from './components/flashcards/RevisionFlashcards';
import { PersonalNotes } from './components/notes/PersonalNotes';
import { TaxonomyModal } from './components/taxonomy/TaxonomyModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { AiJavaExpert } from './components/ai/AiJavaExpert';
import { FloatingAiChatWidget } from './components/ai/FloatingAiChatWidget';

export default function App() {
  const { theme } = useTheme();
  const [currentTab, setCurrentTab] = useState<string>('visualizer');
  const [selectedPatternId, setSelectedPatternId] = useState<string>('two-pointers');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTaxonomyOpen, setIsTaxonomyOpen] = useState(false);

  // Local storage for bookmarked patterns
  const [bookmarkedPatterns, setBookmarkedPatterns] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dsa_visual_bookmarks');
      return saved ? JSON.parse(saved) : ['two-pointers', 'sliding-window', 'monotonic-stack'];
    } catch {
      return ['two-pointers', 'sliding-window', 'monotonic-stack'];
    }
  });

  const handleBookmarkToggle = (patternId: string) => {
    let updated: string[];
    if (bookmarkedPatterns.includes(patternId)) {
      updated = bookmarkedPatterns.filter((id) => id !== patternId);
    } else {
      updated = [...bookmarkedPatterns, patternId];
    }
    setBookmarkedPatterns(updated);
    try {
      localStorage.setItem('dsa_visual_bookmarks', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentPattern =
    CORE_15_PATTERNS.find((p) => p.id === selectedPatternId) || CORE_15_PATTERNS[0];

  const handlePatternSelect = (patternId: string) => {
    setSelectedPatternId(patternId);
    setCurrentTab('visualizer');
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === 'light'
          ? 'bg-[#f8fafc] text-slate-900 selection:bg-emerald-200 selection:text-emerald-950'
          : 'bg-[#07090e] text-slate-100 selection:bg-emerald-500 selection:text-slate-950'
      }`}
    >
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTaxonomy={() => setIsTaxonomyOpen(true)}
        bookmarkedCount={bookmarkedPatterns.length}
      />

      {/* Navigation Sub-header & Pattern Pills */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        selectedPatternId={selectedPatternId}
        onSelectPattern={setSelectedPatternId}
      />

      {/* Main App Content View Area */}
      <main className="flex-1 w-full px-4 sm:px-6 pt-6">
        {currentTab === 'visualizer' && (
          <UniversalVisualizer
            pattern={currentPattern}
            onBookmarkToggle={handleBookmarkToggle}
            isBookmarked={bookmarkedPatterns.includes(currentPattern.id)}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'detective' && (
          <PatternDetective onSelectPattern={handlePatternSelect} />
        )}

        {currentTab === 'tree' && (
          <PatternDecisionTree onSelectPattern={handlePatternSelect} />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapView onSelectPattern={handlePatternSelect} />
        )}

        {currentTab === 'guide' && <JavaDsGuide />}

        {currentTab === 'problems' && (
          <ProblemLibrary
            onSelectPattern={handlePatternSelect}
            onOpenAiWithPrompt={(prompt) => {
              try {
                sessionStorage.setItem('dsa_ai_pending_prompt', prompt);
              } catch {
                // ignore
              }
              setCurrentTab('ai-expert');
            }}
          />
        )}

        {currentTab === 'complexity' && <ComplexityVisualizer />}

        {currentTab === 'interview' && <InterviewMode />}

        {currentTab === 'quiz' && <QuizSection />}

        {currentTab === 'flashcards' && <RevisionFlashcards />}

        {currentTab === 'notes' && (
          <PersonalNotes
            bookmarkedPatterns={bookmarkedPatterns}
            onSelectPattern={handlePatternSelect}
          />
        )}

        {currentTab === 'ai-expert' && (
          <AiJavaExpert
            currentPattern={currentPattern}
            onSelectPattern={handlePatternSelect}
          />
        )}
      </main>

      {/* Floating Quick Ask AI Widget */}
      <FloatingAiChatWidget
        onOpenFullAiTab={() => setCurrentTab('ai-expert')}
        currentPattern={currentPattern}
      />

      {/* 329 Taxonomy Explorer Modal */}
      <TaxonomyModal
        isOpen={isTaxonomyOpen}
        onClose={() => setIsTaxonomyOpen(false)}
      />

      {/* Global Cmd+K Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPattern={handlePatternSelect}
        onSelectTab={setCurrentTab}
      />
    </div>
  );
}
