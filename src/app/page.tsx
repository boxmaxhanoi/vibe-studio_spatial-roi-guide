"use client";

import React, { useState, useMemo } from "react";
import { GUIDES, GuideProject } from "@/data/guides";
import { GuideHeader } from "@/components/GuideHeader";
import { GuideCard } from "@/components/GuideCard";
import { GuideDetailModal } from "@/components/GuideDetailModal";
import { LivePlayground } from "@/components/LivePlayground";
import { StaffPortal } from "@/components/StaffPortal";
import { CommanderWarRoom } from "@/components/CommanderWarRoom";
import {
  Sparkles,
  Zap,
  HelpCircle,
  ShieldCheck,
  Building2,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  // Navigation View: "guides" (엄마·조카 길잡이) | "portal" (박스풀 사내포털) | "warroom" (총사령관 워룸)
  const [viewMode, setViewMode] = useState<"guides" | "portal" | "warroom">("guides");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Guide State
  const [quickMode, setQuickMode] = useState<boolean>(true); // 기본을 "초스피드 복붙 모드"로 친절하게 설정!
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [targetFilter, setTargetFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeGuide, setActiveGuide] = useState<GuideProject | null>(null);

  // Playground State
  const [playgroundOpen, setPlaygroundOpen] = useState<boolean>(false);
  const [playgroundPrompt, setPlaygroundPrompt] = useState<string>("");
  const [playgroundTitle, setPlaygroundTitle] = useState<string>("");

  // Filtered Guides
  const filteredGuides = useMemo(() => {
    return GUIDES.filter((g) => {
      // Category filter
      if (selectedCategory !== "all" && g.category !== selectedCategory) {
        return false;
      }
      // Target Audience filter
      if (targetFilter !== "all" && g.targetAudience !== targetFilter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = g.title.toLowerCase().includes(query);
        const matchesTagline = g.tagline.toLowerCase().includes(query);
        const matchesCategory = g.categoryLabel.toLowerCase().includes(query);
        const matchesPrompt = g.quickPrompt.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTagline && !matchesCategory && !matchesPrompt) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, targetFilter, searchQuery]);

  const handleTestInPlayground = (prompt: string, title: string) => {
    setPlaygroundPrompt(prompt);
    setPlaygroundTitle(title);
    setPlaygroundOpen(true);
    // Smooth scroll down to playground
    setTimeout(() => {
      const el = document.getElementById("playground-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70">
      {/* Switcher bar: Guides vs Corporate Portal */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">AI Studio Live</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">
              누구나 따라하는 실전 AI 프로젝트 허브
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("guides")}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                viewMode === "guides"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🌟 엄마·조카 AI 길잡이
            </button>
            <button
              onClick={() => setViewMode("portal")}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                viewMode === "portal"
                  ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🏢 회사 전용 포털
            </button>
            <button
              onClick={() => setViewMode("warroom")}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                viewMode === "warroom"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🔒 총사령관 워룸
            </button>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      {viewMode === "guides" ? (
        <>
          {/* Header */}
          <GuideHeader
            quickMode={quickMode}
            onToggleQuickMode={setQuickMode}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            targetFilter={targetFilter}
            onTargetFilterChange={setTargetFilter}
          />

          {/* Quick Notice Banner */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-rose-50 to-indigo-50 border border-amber-200/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md text-2xl">
                  💡
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>어떻게 쓰면 되나요? (초간단 2단계)</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      초보자 환영
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    1️⃣ 원하는 프로젝트 카드의 <strong>[원클릭 프롬프트 복사]</strong> 버튼을 누릅니다. ➔ 2️⃣ <strong>ChatGPT</strong>나 <strong>Claude</strong>에 붙여넣기(Ctrl+V)만 하면 끝!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPlaygroundOpen(!playgroundOpen)}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{playgroundOpen ? "실시간 놀이터 닫기" : "웹에서 바로 써보기 (Live)"}</span>
              </button>
            </div>
          </div>

          {/* Optional Live Playground Section */}
          {playgroundOpen && (
            <div id="playground-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <LivePlayground
                initialPrompt={playgroundPrompt}
                initialTitle={playgroundTitle}
                onClose={() => setPlaygroundOpen(false)}
              />
            </div>
          )}

          {/* Card Grid */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">
                  실전 프로젝트 가이드 목록
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                  총 {filteredGuides.length}개
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {quickMode ? "⚡ 초스피드 복붙 모드 활성화됨" : "📖 친절 설명 모드 활성화됨"}
              </span>
            </div>

            {filteredGuides.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
                <p className="text-4xl">🔍</p>
                <h3 className="text-base font-bold text-slate-800 mt-3">
                  검색 결과가 없습니다.
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  다른 검색어를 입력하시거나 카테고리를 전체로 변경해보세요.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setTargetFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  필터 초기화
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => (
                  <GuideCard
                    key={guide.id}
                    guide={guide}
                    quickMode={quickMode}
                    onOpenDetail={setActiveGuide}
                    onTestInPlayground={handleTestInPlayground}
                  />
                ))}
              </div>
            )}
          </main>

          {/* Detail Modal */}
          <GuideDetailModal
            guide={activeGuide}
            onClose={() => setActiveGuide(null)}
            onTestInPlayground={handleTestInPlayground}
          />
        </>
      ) : viewMode === "portal" ? (
        <div className="flex-1">
          <StaffPortal />
        </div>
      ) : (
        <div className="flex-1">
          <CommanderWarRoom
            isUnlocked={isUnlocked}
            onUnlock={() => setIsUnlocked(true)}
          />
        </div>
      )}

      {/* Global Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="text-xl">🤖✨</span>
            <div>
              <p className="font-bold text-slate-800">
                엄마도 조카도 따라하는 AI 길잡이 프로젝트
              </p>
              <p className="text-[11px] text-slate-400">
                AI 바이브 코딩으로 실전 개발된 모든 프로젝트를 누구나 쉽게 따라 할 수 있도록 정리합니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Next.js 14 · Tailwind CSS · Vercel Hosted</span>
            <span>•</span>
            <button
              onClick={() => {
                setViewMode("guides");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-indigo-600 font-bold hover:underline"
            >
              맨 위로 가기 ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
