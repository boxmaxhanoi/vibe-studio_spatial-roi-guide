"use client";

import React, { useState } from "react";
import { GuideProject } from "@/data/guides";
import {
  Copy,
  Check,
  Zap,
  ArrowRight,
  Eye,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface GuideCardProps {
  guide: GuideProject;
  quickMode: boolean;
  onOpenDetail: (guide: GuideProject) => void;
  onTestInPlayground: (prompt: string, title: string) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  guide,
  quickMode,
  onOpenDetail,
  onTestInPlayground,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showPromptPreview, setShowPromptPreview] = useState<boolean>(quickMode);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(guide.quickPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Header Bar of Card */}
      <div className="p-6 pb-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
              {guide.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {guide.targetAudience}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  ⏱️ {guide.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors">
                {guide.title}
              </h3>
            </div>
          </div>
          <span className="text-xs font-black text-slate-300">
            #{String(guide.order).padStart(2, "0")}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {guide.tagline}
        </p>
      </div>

      {/* HIGHLIGHT: 3-Second One-Click Magic Prompt Box */}
      <div className="mx-6 my-2 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
            <span>⚡ 3초 완성 복붙 프롬프트</span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs ${
              copied
                ? "bg-emerald-600 text-white scale-105"
                : "bg-amber-500 hover:bg-amber-600 text-white hover:shadow-md"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>복사 완료! 붙여넣기만 하세요</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>원클릭 프롬프트 복사</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Snippet Preview */}
        <div className="relative">
          <p className="text-[11px] text-amber-900/80 bg-white/70 p-2.5 rounded-xl border border-amber-200/50 line-clamp-3 font-mono leading-relaxed">
            {guide.quickPrompt}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-amber-800">
            <span className="truncate pr-2">👉 {guide.quickPromptExplanation}</span>
            <button
              onClick={() => onTestInPlayground(guide.quickPrompt, guide.title)}
              className="shrink-0 text-indigo-600 hover:text-indigo-800 font-bold underline flex items-center gap-1"
            >
              <span>여기서 바로 테스트</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Background & Purpose summary for Standard Mode */}
      {!quickMode && (
        <div className="px-6 py-3 space-y-2 text-xs border-t border-slate-100 mt-2 bg-slate-50/50">
          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-700 shrink-0">💡 왜 만듦?</span>
            <span className="text-slate-600 line-clamp-2">
              {guide.background.problem}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-indigo-700 shrink-0">🎯 목표:</span>
            <span className="text-slate-600 line-clamp-1">
              {guide.objective.goal}
            </span>
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="mt-auto p-4 px-6 border-t border-slate-100 flex items-center justify-between bg-white">
        <button
          onClick={() => onOpenDetail(guide)}
          className="text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
        >
          <Eye className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
          <span>결과물 & 따라하기 가이드 보기</span>
        </button>

        <button
          onClick={() => onOpenDetail(guide)}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-600 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
