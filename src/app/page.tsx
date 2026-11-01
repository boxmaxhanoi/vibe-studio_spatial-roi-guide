"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { StaffPortal } from "@/components/StaffPortal";
import { CommanderWarRoom } from "@/components/CommanderWarRoom";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const [currentMode, setCurrentMode] = useState<"staff" | "commander">("staff");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70">
      {/* Top Global Header */}
      <Header
        currentMode={currentMode}
        onSwitchMode={(mode) => setCurrentMode(mode)}
        isUnlocked={isUnlocked}
      />

      {/* Main Mode View */}
      <main className="flex-1">
        {currentMode === "staff" ? (
          <StaffPortal />
        ) : (
          <CommanderWarRoom
            isUnlocked={isUnlocked}
            onUnlock={() => setIsUnlocked(true)}
          />
        )}
      </main>

      {/* Enterprise Security Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              (주)박스풀 전사 보안 규정 준수 · 외부 API 키 유출 방지 격리망 가동 중
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Serverless Infrastructure on Vercel Pro</span>
            <span>•</span>
            <span>Chief of Staff AI v2.5</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
