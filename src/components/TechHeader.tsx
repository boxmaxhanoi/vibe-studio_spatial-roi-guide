"use client";

import React from "react";
import { Terminal, Shield, Cpu, Search, Sparkles, Activity, Calculator, Layers } from "lucide-react";

interface TechHeaderProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentView: "estimator" | "registry" | "warroom" | "portal";
  onSwitchView: (view: "estimator" | "registry" | "warroom" | "portal") => void;
  totalCount: number;
}

const CATEGORIES = [
  "ALL",
  "PropTech",
  "Enterprise",
  "Vision",
  "Marketing",
  "FinTech",
  "Intelligence",
  "ZeroCode",
];

export const TechHeader: React.FC<TechHeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  currentView,
  onSwitchView,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-white/10">
      {/* Top Engineering Ticker */}
      <div className="border-b border-white/5 py-1.5 px-4 text-[11px] font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ACTIVE
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">ENGINE: VIBE-STUDIO v2.8</span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-slate-500 hidden sm:inline">ONE-SHOT BLUEPRINT REGISTRY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">INDEXED ENGINES:</span>
            <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded text-[10px]">
              {String(totalCount).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Terminal className="w-4 h-4" />
              </div>
              <h1 className="text-base sm:text-lg font-black tracking-wider text-white font-mono uppercase">
                AI Engine Registry <span className="text-indigo-400 text-xs font-normal">/ Production Blueprints</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 pl-10.5">
              도면 비전 감리, 전사 AI 포털, 바이럴 숏폼, 금융 첩보까지 검증된 실전 시스템 및 원샷 프롬프트 허브
            </p>
          </div>

          {/* Navigation Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 self-start md:self-auto text-xs font-mono">
            <button
              onClick={() => onSwitchView("estimator")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentView === "estimator"
                  ? "bg-indigo-600 text-white font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>도면 견적 & 매출 추이</span>
            </button>
            <button
              onClick={() => onSwitchView("registry")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentView === "registry"
                  ? "bg-white/15 text-white font-bold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>전체 프로젝트 레지스트리</span>
            </button>
            <button
              onClick={() => onSwitchView("portal")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentView === "portal"
                  ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              사내 포털
            </button>
            <button
              onClick={() => onSwitchView("warroom")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                currentView === "warroom"
                  ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Shield className="w-3 h-3 text-rose-400" />
              <span>워룸</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar (only show on registry or estimator) */}
        {currentView === "registry" && (
          <div className="mt-3 pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[260px]">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="검색: 도면, 포털, 숏폼, 회계, 코인..."
                className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-slate-900 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500/80 transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
