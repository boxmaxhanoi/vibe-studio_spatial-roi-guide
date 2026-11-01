"use client";

import React from "react";
import { Sparkles, Zap, BookOpen, Search, Heart, HelpCircle } from "lucide-react";
import { CATEGORIES } from "@/data/guides";

interface GuideHeaderProps {
  quickMode: boolean;
  onToggleQuickMode: (mode: boolean) => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  targetFilter: string;
  onTargetFilterChange: (target: string) => void;
}

export const GuideHeader: React.FC<GuideHeaderProps> = ({
  quickMode,
  onToggleQuickMode,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  targetFilter,
  onTargetFilterChange,
}) => {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
      {/* Top Banner / Announcement */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white py-2 px-4 text-center text-xs font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-bounce" />
        <span>
          <strong>이해하기 귀찮으신가요?</strong> [초스피드 복붙 모드]를 켜면 복잡한 설명 없이 <strong>3초 만에 쓰는 마법 프롬프트</strong>만 쏙쏙 모아 볼 수 있습니다!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Slogan */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🤖</span>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  엄마도 조카도 따라하는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-rose-500 to-amber-500">AI 길잡이</span>
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 pl-1">
              <span>어려운 코딩 몰라도 OK! 프롬프트 복붙 한 번으로 나만의 웹사이트·비서가 뚝딱 완성됩니다.</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </p>
          </div>

          {/* Quick Mode Toggle Switch */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => onToggleQuickMode(true)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                quickMode
                  ? "bg-amber-500 text-white shadow-md scale-102"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>⚡ 이해 싫어요! 복붙 모드</span>
            </button>
            <button
              onClick={() => onToggleQuickMode(false)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                !quickMode
                  ? "bg-indigo-600 text-white shadow-md scale-102"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 친절하게 다 볼래요</span>
            </button>
          </div>
        </div>

        {/* Search & Audience Filter */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Target Audience Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: "all", label: "🌟 전체 보기" },
              { id: "조카도 재미있어요 👧", label: "👧 조카 맞춤 (재미/웹)" },
              { id: "엄마도 쉬워요 👩", label: "👩 엄마 맞춤 (생활/SNS)" },
              { id: "실무 직장인 💼", label: "💼 직장인 맞춤 (자동화)" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onTargetFilterChange(t.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  targetFilter === t.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="예: 웹사이트, 릴스, 가계부, 도면..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 shadow-2xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
