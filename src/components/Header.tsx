"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, Sparkles, Crown, Users } from "lucide-react";

interface HeaderProps {
  currentMode: "staff" | "commander";
  onSwitchMode: (mode: "staff" | "commander") => void;
  isUnlocked: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSwitchMode,
  isUnlocked,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & System Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-brand-500/20 tracking-wider">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                BOXFUL
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                MASTER AI v2.5
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              사내 업무 자동화 & AI 총사령관 전용 포털
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => onSwitchMode("staff")}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              currentMode === "staff"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>직원 업무 포털</span>
          </button>

          <button
            onClick={() => onSwitchMode("commander")}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              currentMode === "commander"
                ? "bg-slate-900 text-amber-300 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>총사령관 워룸</span>
            {isUnlocked ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ) : (
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-500 rounded font-mono">
                PIN
              </span>
            )}
          </button>
        </div>

        {/* System Status Indicators */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Vercel Cloud Ready</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Zero-Leak API Vault</span>
          </div>
        </div>
      </div>
    </header>
  );
};
