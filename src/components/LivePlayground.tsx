"use client";

import React, { useState } from "react";
import { MarkdownView } from "@/components/MarkdownView";
import {
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  Copy,
  Check,
  Zap,
  X,
} from "lucide-react";

interface LivePlaygroundProps {
  initialPrompt?: string;
  initialTitle?: string;
  onClose?: () => void;
}

export const LivePlayground: React.FC<LivePlaygroundProps> = ({
  initialPrompt = "",
  initialTitle = "",
  onClose,
}) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // If initialPrompt changes, update prompt
  React.useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deptName: initialTitle || "AI 길잡이 튜토리얼",
          systemPrompt:
            "당신은 초등학생 조카와 부모님도 쉽게 이해할 수 있도록 친절하고 명쾌하게 알려주는 세계 최고의 AI 길잡이 멘토입니다. 친절하고 쉬운 한국어로 답변하고, 마크다운 형식으로 보기 좋게 정리해주세요.",
          prompt: prompt,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setResponse(data.reply);
      } else {
        setResponse(`⚠️ 오류가 발생했습니다: ${data.error || "응답 없음"}`);
      }
    } catch (err: any) {
      setResponse(`❌ 통신 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResponse = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-indigo-200/80 shadow-xl overflow-hidden p-6 space-y-6">
      {/* Playground Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>실시간 AI 놀이터 (Playground)</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Live Test
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {initialTitle
                ? `선택됨: [${initialTitle}] 프롬프트를 마음껏 수정하고 결과를 확인하세요.`
                : "어떤 질문이나 프롬프트든 입력하면 AI가 바로 답변을 생성합니다."}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder="여기에 복사한 프롬프트를 넣거나, 궁금한 점을 적어보세요..."
            className="w-full p-4 text-xs font-mono bg-slate-50 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-y leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Ctrl+Enter 또는 오른쪽 버튼을 누르면 AI가 바로 작성해줍니다.
          </span>
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI가 열심히 작성하는 중...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>지금 바로 실행해보기</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Response Box */}
      {response && (
        <div className="mt-4 p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Bot className="w-4 h-4" />
              <span>AI 응답 결과</span>
            </div>
            <button
              onClick={handleCopyResponse}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>결과 복사</span>
                </>
              )}
            </button>
          </div>
          <div className="text-xs prose prose-invert max-w-none">
            <MarkdownView content={response} />
          </div>
        </div>
      )}
    </div>
  );
};
