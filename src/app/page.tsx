"use client";

import React, { useState, useMemo } from "react";
import { REGISTRY_PROJECTS, RegistryProject } from "@/data/projects";
import { TechHeader } from "@/components/TechHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { TerminalPlayground } from "@/components/TerminalPlayground";
import { StoreEstimator } from "@/components/StoreEstimator";
import { StaffPortal } from "@/components/StaffPortal";
import { CommanderWarRoom } from "@/components/CommanderWarRoom";
import { Terminal, Cpu, ArrowUpRight, ShieldCheck, Zap, Calculator } from "lucide-react";

export default function Home() {
  // Navigation: "estimator" (도면/30·50·70평 견적 & 매출) | "registry" (전체 프로젝트) | "portal" | "warroom"
  const [currentView, setCurrentView] = useState<"estimator" | "registry" | "warroom" | "portal">("estimator");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<RegistryProject | null>(null);

  // Playground state
  const [playgroundOpen, setPlaygroundOpen] = useState<boolean>(false);
  const [playgroundPrompt, setPlaygroundPrompt] = useState<string>("");
  const [playgroundTitle, setPlaygroundTitle] = useState<string>("");

  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return REGISTRY_PROJECTS.filter((p) => {
      if (selectedCategory !== "ALL" && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(q);
        const matchesStack = p.stack.some((s) => s.toLowerCase().includes(q));
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesPrompt = p.productionPrompt.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesStack && !matchesCode && !matchesPrompt) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleTestInPlayground = (prompt: string, title: string) => {
    setPlaygroundPrompt(prompt);
    setPlaygroundTitle(title);
    setPlaygroundOpen(true);
    setTimeout(() => {
      const el = document.getElementById("terminal-playground-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative">
      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Global Tech Header */}
      <TechHeader
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onSwitchView={setCurrentView}
        totalCount={REGISTRY_PROJECTS.length}
      />

      {/* Main View Router */}
      <div className="flex-1 w-full relative z-10">
        {currentView === "estimator" ? (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <StoreEstimator />
          </main>
        ) : currentView === "registry" ? (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Hero Banner: Spec Sheet Summary */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    <span className="font-mono text-[11px] text-indigo-400 font-semibold tracking-wider uppercase">
                      One-Shot Production Blueprints
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    실전 AI 프로젝트 레지스트리 (Blueprints & Specs)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    도면 비전 감리, 전사 AI 포털, 바이럴 숏폼 파이프라인, 금융 첩보까지—실무에서 검증된 시스템 스펙과 <strong>클릭 한 번으로 복사해 바로 실행할 수 있는 원샷 프롬프트</strong>를 제공합니다.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <button
                    onClick={() => setPlaygroundOpen(!playgroundOpen)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{playgroundOpen ? "Close Terminal" : "Open Live Terminal"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Playground (Collapsible) */}
            {playgroundOpen && (
              <div id="terminal-playground-section" className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span>Interactive Execution Runtime</span>
                  <span>Mode: Direct API Stream</span>
                </div>
                <TerminalPlayground
                  initialPrompt={playgroundPrompt}
                  initialTitle={playgroundTitle}
                  onClose={() => setPlaygroundOpen(false)}
                />
              </div>
            )}

            {/* Registry Projects Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 px-1 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">SYSTEM RECORDS</span>
                  <span>/</span>
                  <span className="text-slate-500">Showing {filteredProjects.length} of {REGISTRY_PROJECTS.length} active blueprints</span>
                </div>
                <span className="text-slate-500 text-[11px]">SORT: TOOL_INDEX</span>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-white/5 space-y-3 font-mono">
                  <p className="text-slate-500 text-sm">NO MATCHING BLUEPRINTS FOUND.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("ALL");
                      setSearchQuery("");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpenDetail={setActiveProject}
                      onTestInPlayground={handleTestInPlayground}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Modal */}
            <ProjectDetailModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
              onTestInPlayground={handleTestInPlayground}
            />
          </main>
        ) : currentView === "portal" ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50 text-slate-900 min-h-[80vh] rounded-2xl my-6">
            <StaffPortal />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
            <CommanderWarRoom
              isUnlocked={isUnlocked}
              onUnlock={() => setIsUnlocked(true)}
            />
          </div>
        )}
      </div>

      {/* Global Tech Footer */}
      <footer className="mt-auto border-t border-white/10 bg-slate-950/90 py-6 font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">AI ENGINE REGISTRY</span>
            <span>•</span>
            <span>PROD V2.8</span>
            <span>•</span>
            <span>VERIFIED ON VERCEL SERVERLESS</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
