"use client";

import React, { useState } from "react";
import { RegistryProject } from "@/data/projects";
import {
  Copy,
  Check,
  Terminal,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Command,
} from "lucide-react";

interface ProjectCardProps {
  project: RegistryProject;
  onOpenDetail: (p: RegistryProject) => void;
  onTestInPlayground: (prompt: string, title: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetail,
  onTestInPlayground,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(project.productionPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-900/50 hover:bg-slate-900/90 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group shadow-xl backdrop-blur-xs relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded">
              {project.code}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{project.status}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
            {project.subtitle}
          </p>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 font-mono">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="bg-black/30 p-2 rounded-lg border border-white/5">
              <span className="text-[10px] text-slate-500 block truncate">
                {m.label}
              </span>
              <span className="text-xs font-bold text-slate-200 block truncate mt-0.5">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Problem & Outcome Quick Spec */}
        <div className="space-y-2 text-xs py-1">
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-mono font-bold text-rose-400/80 bg-rose-500/10 px-1.5 py-0.5 rounded shrink-0">
              ISSUE
            </span>
            <span className="text-slate-400 line-clamp-1 leading-relaxed text-[11px]">
              {project.problem}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-mono font-bold text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
              SOLVE
            </span>
            <span className="text-slate-300 line-clamp-1 leading-relaxed text-[11px] font-medium">
              {project.outcome}
            </span>
          </div>
        </div>
      </div>

      {/* Production Prompt Terminal Box (Core One-Click Action) */}
      <div className="mt-4 pt-2 space-y-2">
        <div className="rounded-xl bg-black/60 border border-white/10 overflow-hidden font-mono text-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <span className="text-slate-400 ml-1.5 text-[10px]">
                production-prompt.v1
              </span>
            </div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                copied
                  ? "bg-emerald-500 text-black font-black"
                  : "bg-white/10 hover:bg-white/20 text-slate-200"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Command className="w-3 h-3 text-slate-400" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 text-[11px] text-slate-300 max-h-20 overflow-hidden relative leading-relaxed">
            <pre className="whitespace-pre-wrap line-clamp-3 opacity-90 font-mono">
              {project.productionPrompt}
            </pre>
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Bottom Bar: Stack tags & Actions */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {project.stack.slice(0, 3).map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded truncate"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onTestInPlayground(project.productionPrompt, project.title)}
              className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Run Test
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => onOpenDetail(project)}
              className="text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Spec</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
