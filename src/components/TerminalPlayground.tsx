"use client";

import React, { useState, useEffect } from "react";
import { MarkdownView } from "@/components/MarkdownView";
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  X,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

interface TerminalPlaygroundProps {
  initialPrompt?: string;
  initialTitle?: string;
  onClose?: () => void;
}

export const TerminalPlayground: React.FC<TerminalPlaygroundProps> = ({
  initialPrompt = "",
  initialTitle = "",
  onClose,
}) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deptName: initialTitle || "AI Engine Benchmark",
          systemPrompt:
            "당신은 엔터프라이즈급 AI 솔루션을 정밀하게 산출하는 시니어 소프트웨어 아키텍트입니다. 간결하고 엄격하며, 실무에서 즉시 배포 가능한 코드와 마크다운 표준으로 답변하십시오.",
          prompt: prompt,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setResponse(data.reply);
      } else {
        setResponse(`[ERROR] System fault: ${data.error || "No response stream"}`);
      }
    } catch (err: any) {
      setResponse(`[FATAL] Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = async () => {
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
    <div className="bg-black/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 text-[11px] font-semibold">
            ai-runtime-console: <span className="text-indigo-400">{initialTitle || "interactive-session"}</span>
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Terminal Input Area */}
      <form onSubmit={handleExecute} className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-[11px] text-slate-500 pb-1">
          <span className="text-emerald-400 font-bold">$</span>
          <span>ai run --interactive --model claude-3-5-sonnet</span>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder="Type or paste prompt blueprint..."
            className="w-full p-3.5 bg-slate-900/90 border border-white/10 rounded-xl text-slate-200 font-mono text-xs focus:outline-hidden focus:border-indigo-500/80 transition-all resize-y leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-500">
            Press [Cmd+Enter] or click Run to trigger execution runtime.
          </span>
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold transition-all flex items-center gap-2 text-xs shadow-lg"
          >
            {loading ? (
              <>
                <RotateCcw className="w-3 h-3 animate-spin" />
                <span>Executing Stream...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Run Execution</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Output Console */}
      {response && (
        <div className="p-5 border-t border-white/10 bg-slate-950 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-bold text-slate-300">RUNTIME OUTPUT (STDOUT)</span>
            </div>
            <button
              onClick={handleCopyResult}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy stdout</span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed font-sans max-h-96 overflow-y-auto pr-2">
            <MarkdownView content={response} />
          </div>
        </div>
      )}
    </div>
  );
};
