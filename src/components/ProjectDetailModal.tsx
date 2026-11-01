"use client";

import React, { useState } from "react";
import { RegistryProject } from "@/data/projects";
import {
  X,
  Copy,
  Check,
  Terminal,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Cpu,
  Command,
  Play,
} from "lucide-react";

interface ProjectDetailModalProps {
  project: RegistryProject | null;
  onClose: () => void;
  onTestInPlayground: (prompt: string, title: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onTestInPlayground,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!project) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project.productionPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-950 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-white/10 overflow-hidden font-sans">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-slate-900/60 font-mono">
          <div>
            <div className="flex items-center gap-2.5 text-xs">
              <span className="font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded">
                {project.code}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-slate-600">/</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                {project.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Metrics bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-white/5 p-3 rounded-xl"
              >
                <div className="text-[11px] text-slate-500">{m.label}</div>
                <div className="text-base font-bold text-indigo-300 mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* 4-Tier Spec Sheet */}
          <div className="space-y-4 text-xs font-mono">
            <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5 bg-slate-900/40">
              <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2">
                <span className="text-slate-500 font-bold uppercase text-[11px]">
                  Problem Definition
                </span>
                <span className="md:col-span-3 text-slate-300 leading-relaxed font-sans text-xs">
                  {project.problem}
                </span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2">
                <span className="text-slate-500 font-bold uppercase text-[11px]">
                  Architecture
                </span>
                <span className="md:col-span-3 text-slate-300 leading-relaxed font-sans text-xs">
                  {project.architecture}
                </span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2">
                <span className="text-slate-500 font-bold uppercase text-[11px]">
                  Measured Outcome
                </span>
                <span className="md:col-span-3 text-emerald-400 font-medium leading-relaxed font-sans text-xs">
                  {project.outcome}
                </span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2">
                <span className="text-slate-500 font-bold uppercase text-[11px]">
                  Tech Stack
                </span>
                <div className="md:col-span-3 flex flex-wrap gap-1.5">
                  {project.stack.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full Production Prompt Terminal */}
          <div className="space-y-2 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Production One-Shot Prompt Blueprint</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTestInPlayground(project.productionPrompt, project.title)}
                  className="px-2.5 py-1 rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute in Terminal</span>
                </button>
                <button
                  onClick={handleCopy}
                  className={`px-3 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    copied
                      ? "bg-emerald-500 text-black font-black"
                      : "bg-white text-black hover:bg-slate-200"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-black border border-white/10 p-4 overflow-x-auto text-xs text-slate-300 leading-relaxed max-h-72 shadow-inner">
              <pre className="whitespace-pre-wrap font-mono">
                {project.productionPrompt}
              </pre>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              💡 <strong>실행 방법:</strong> 위 프롬프트 전문을 복사하여 Claude 3.5 Sonnet, GPT-4o 또는 Gemini 1.5 Pro에 붙여넣으면 동일한 시스템 코드가 즉시 생성됩니다.
            </div>
          </div>

          {/* Quick Execution Command */}
          <div className="p-3 bg-slate-900 border border-white/5 rounded-xl font-mono text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 truncate pr-2 text-slate-400">
              <span className="text-slate-600">$</span>
              <span className="truncate">{project.executionCommand}</span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest shrink-0">
              CLI SPEC
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>AI Engine Blueprint v2.6 · Verified for Production</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
