"use client";

import React, { useState } from "react";
import { GuideProject } from "@/data/guides";
import {
  X,
  Copy,
  Check,
  Zap,
  BookOpen,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface GuideDetailModalProps {
  guide: GuideProject | null;
  onClose: () => void;
  onTestInPlayground: (prompt: string, title: string) => void;
}

export const GuideDetailModal: React.FC<GuideDetailModalProps> = ({
  guide,
  onClose,
  onTestInPlayground,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!guide) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(guide.quickPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              {guide.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  {guide.targetAudience}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  난이도: {guide.difficulty}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  • {guide.categoryLabel}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {guide.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/60 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* 1. MAGIC PROMPT SECTION */}
          <section className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border-2 border-amber-300/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600 fill-amber-500 animate-pulse" />
                <h3 className="text-base font-black text-amber-950">
                  ⚡ 3초 완성 복붙 마법 프롬프트
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTestInPlayground(guide.quickPrompt, guide.title)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>여기서 바로 테스트</span>
                </button>
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs ${
                    copied
                      ? "bg-emerald-600 text-white scale-105"
                      : "bg-amber-500 hover:bg-amber-600 text-white hover:shadow-md"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>복사 완료! 붙여넣기만 하세요</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>프롬프트 복사하기</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-2xl overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed border border-slate-800 shadow-inner max-h-60">
                {guide.quickPrompt}
              </pre>
            </div>
            <p className="text-xs text-amber-900 font-medium bg-amber-100/60 p-3 rounded-xl border border-amber-200/50">
              💡 <strong>팁:</strong> {guide.quickPromptExplanation} (ChatGPT, Claude, Gemini 어디에나 그대로 붙여넣으면 됩니다!)
            </p>
          </section>

          {/* 2. BACKGROUND & STORY (WHY) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold">1. 배경 (왜 만들었을까요?)</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1.5">
                <span className="text-xs font-bold text-rose-700">🚨 마주쳤던 불편함</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {guide.background.problem}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                <span className="text-xs font-bold text-indigo-700">✨ AI로 해결한 발상</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {guide.background.story}
                </p>
              </div>
            </div>
          </section>

          {/* 3. OBJECTIVE & BENEFITS (WHAT) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold">2. 목적 (무엇을 얻을 수 있나요?)</h3>
            </div>
            <p className="text-sm font-semibold text-slate-800 bg-slate-100/80 p-3 rounded-xl">
              🎯 목표: {guide.objective.goal}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {guide.objective.benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700 leading-snug">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. DELIVERABLE PREVIEW (RESULT) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Terminal className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold">3. 결과물 (이렇게 나옵니다)</h3>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>실제 생성 결과물 요약</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                  {guide.deliverable.previewType.toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-bold text-emerald-300">
                {guide.deliverable.summary}
              </p>
              <div className="p-3 bg-slate-800/80 rounded-xl text-xs font-mono text-slate-300">
                {JSON.stringify(guide.deliverable.previewData, null, 2)}
              </div>
            </div>
          </section>

          {/* 5. STEP-BY-STEP HOW TO RUN */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <Rocket className="w-5 h-5 text-rose-500" />
              <h3 className="text-lg font-bold">4. 따라하기 (초보자용 3단계)</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">1단계: 프롬프트 입력</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {guide.executionGuide.step1}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">2단계: 결과 확인 및 저장</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {guide.executionGuide.step2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">3단계: 실행 및 무료 배포</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {guide.executionGuide.step3}
                  </p>
                </div>
              </div>

              {guide.executionGuide.deployTip && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <span className="font-bold shrink-0">🎁 꿀팁:</span>
                  <span>{guide.executionGuide.deployTip}</span>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between bg-white">
          <span className="text-xs text-slate-500">
            모든 프롬프트는 상업적/개인 프로젝트에 자유롭게 복사하여 사용할 수 있습니다.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
