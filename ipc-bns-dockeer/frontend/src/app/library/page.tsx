"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
  X,
  ChevronRight,
  Brain,
  Scale
} from "lucide-react";

interface SearchResult {
  section_number: string;
  type: "IPC" | "BNS";
  title: string;
  description: string;
  explanation: string;
  mapped_section: string;
  related_sections: string[];
  examples: string[];
  cross_references: string;
}

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "ipc" | "bns">("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // AI Modal State
  const [explainingSection, setExplainingSection] = useState<SearchResult | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Perform search
  const fetchResults = async (searchQuery: string, activeFilter: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/section-search?query=${encodeURIComponent(searchQuery)}&filter=${activeFilter}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (err) {
      console.error("Error searching library:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchResults(query, filter);
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [query, filter]);

  // Request AI assistant explanation
  const handleExplain = async (section: SearchResult) => {
    setExplainingSection(section);
    setIsAiLoading(true);
    setAiAnalysis(null);

    try {
      const res = await fetch("/api/explain-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionNumber: section.section_number,
          title: section.title,
          type: section.type,
          description: section.description,
          explanation: section.explanation,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiAnalysis(data.detailed_analysis);
      } else {
        setAiAnalysis("<p class='text-red-500'>Failed to retrieve legal analysis from AI assistant.</p>");
      }
    } catch (err) {
      console.error("Error explaining section:", err);
      setAiAnalysis("<p class='text-red-500'>Error contacting AI backend.</p>");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex-grow py-12 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            Legal Library
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            IPC-BNS Comparative Database
          </h1>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Search through historical Indian Penal Code sections and their modern Bharatiya Nyaya Sanhita equivalents with detailed case summaries.
          </p>
        </div>

        {/* Search controls card */}
        <div className="rounded-2xl border border-border-color bg-card p-6 shadow-md space-y-4 mb-8">
          <div className="relative">
            <label htmlFor="search-input" className="sr-only">Search IPC or BNS Section</label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-foreground/45">
              <Search className="h-5 w-5" />
            </div>
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search IPC or BNS Section (e.g. '302', 'Murder', 'Cheating', 'Theft')..."
              className="w-full rounded-xl border border-border-color bg-background py-3.5 pl-12 pr-4 text-sm text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Filter selection buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-color/50 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground/50">Filter Source:</span>
              <div className="flex rounded-lg border border-border-color bg-muted/30 p-0.5">
                {(["all", "ipc", "bns"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilter(opt)}
                    className={`rounded-md px-3.5 py-1.5 text-xs font-semibold uppercase transition-all cursor-pointer ${
                      filter === opt
                        ? "bg-card text-primary shadow-sm"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-semibold text-foreground/40">
              Showing {results.length} references
            </div>
          </div>
        </div>

        {/* Search Results Display */}
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                className="rounded-2xl border border-border-color bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                {/* Visual marker */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  section.type === "IPC" ? "bg-blue-500" : "bg-green-500"
                }`} />

                <div className="space-y-4 pl-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        section.type === "IPC"
                          ? "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400"
                          : "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400"
                      }`}>
                        {section.type}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1.5 group-hover:text-primary transition-colors">
                        {section.section_number}
                      </h3>
                      <p className="text-xs font-bold text-foreground/50">
                        {section.title}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-foreground/40 uppercase font-bold tracking-wider">
                        Mapped To
                      </span>
                      <div className="text-xs font-bold text-primary flex items-center gap-1 mt-0.5 justify-end">
                        <Scale className="h-3 w-3" />
                        {section.mapped_section}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border-color/40 text-xs">
                    <div>
                      <span className="font-bold text-foreground/75 block">Offence Description:</span>
                      <p className="text-foreground/60 leading-relaxed mt-0.5">{section.description}</p>
                    </div>

                    {section.cross_references && (
                      <div>
                        <span className="font-bold text-foreground/75 block">Cross Reference:</span>
                        <p className="text-foreground/60 leading-relaxed mt-0.5">{section.cross_references}</p>
                      </div>
                    )}

                    {section.examples.length > 0 && (
                      <div className="rounded-lg bg-muted/40 p-3 mt-2 flex gap-2">
                        <Lightbulb className="h-4 w-4 text-accent-orange shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-foreground/75 block">Illustration / Example:</span>
                          <p className="text-foreground/60 leading-relaxed mt-0.5">{section.examples[0]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pl-2 pt-4 border-t border-border-color/40 flex flex-wrap items-center justify-between gap-4">
                  {/* Related tags */}
                  <div className="flex flex-wrap items-center gap-1.5 max-w-[60%]">
                    {section.related_sections.slice(0, 3).map((rel, rIdx) => (
                      <span key={rIdx} className="rounded bg-muted px-2 py-0.5 text-[9px] font-semibold text-foreground/60">
                        {rel}
                      </span>
                    ))}
                  </div>

                  {/* AI Assistant Call Button */}
                  <button
                    onClick={() => handleExplain(section)}
                    className="flex items-center gap-1 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground px-3 py-2 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    Explain Section
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-border-color rounded-2xl bg-card">
            <HelpCircle className="h-10 w-10 text-foreground/30 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground/70">No matching sections found.</p>
            <p className="text-xs text-foreground/40 mt-1">Try entering numeric codes like &apos;302&apos;, &apos;375&apos;, or keywords like &apos;murder&apos;, &apos;rape&apos;, &apos;theft&apos;.</p>
          </div>
        )}

        {/* AI Explanation Modal */}
        <AnimatePresence>
          {explainingSection && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExplainingSection(null)}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-xl rounded-2xl border border-border-color bg-card p-6 shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-border-color">
                  <div className="flex gap-2.5 items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Brain className="h-5.5 w-5.5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
                        AI Assistant Explanation
                      </h3>
                      <p className="text-xs text-foreground/50 font-medium">
                        Deep legislative analysis for {explainingSection.section_number}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setExplainingSection(null)}
                    className="rounded-lg p-1 text-foreground/50 hover:bg-muted hover:text-foreground cursor-pointer"
                    aria-label="Close Modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Analysis Body */}
                <div className="flex-grow overflow-y-auto py-6 space-y-4">
                  <div className="flex items-center justify-between bg-muted/30 border border-border-color rounded-xl p-3.5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-foreground/40 block">Section</span>
                      <span className="text-sm font-bold text-foreground">{explainingSection.section_number}</span>
                    </div>
                    <div className="text-center text-foreground/40">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-foreground/40 block">Mapped Equivalent</span>
                      <span className="text-sm font-bold text-primary">{explainingSection.mapped_section}</span>
                    </div>
                  </div>

                  {isAiLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-3">
                      <svg className="animate-spin h-7 w-7 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-xs font-semibold text-foreground/60 animate-pulse">Consulting AI Knowledge Base...</span>
                    </div>
                  ) : (
                    aiAnalysis && (
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none text-foreground select-text"
                        dangerouslySetInnerHTML={{ __html: aiAnalysis }}
                      />
                    )
                  )}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-border-color flex justify-end">
                  <button
                    onClick={() => setExplainingSection(null)}
                    className="rounded-xl border border-border-color bg-card hover:bg-muted text-foreground px-5 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close Analysis
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
