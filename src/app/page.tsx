"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { StaffPortal } from "@/components/StaffPortal";
import { CommanderWarRoom } from "@/components/CommanderWarRoom";
import { SlidingPricingCalculator } from "@/components/b2c/SlidingPricingCalculator";
import { MypageAssetManager } from "@/components/b2c/MypageAssetManager";
import { LockerAiVisionBooking } from "@/components/b2c/LockerAiVisionBooking";
import { GoogleOtpModal } from "@/components/b2c/GoogleOtpModal";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  ShoppingBag,
  Coins,
  Crown,
  Users,
  Lock,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"b2c_booking" | "pricing" | "asset_mypage" | "staff" | "commander">("b2c_booking");
  const [isCommanderUnlocked, setIsCommanderUnlocked] = useState<boolean>(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 text-slate-900">
      {/* Top Global Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  BOXFUL
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  AI NATIVE v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                공유창고 AI 검색 최적화 & 일사천리 커머스 플랫폼
              </p>
            </div>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="hidden lg:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab("b2c_booking")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "b2c_booking"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI 비전 예약</span>
            </button>

            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "pricing"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>슬라이딩 요금제</span>
            </button>

            <button
              onClick={() => setActiveTab("asset_mypage")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "asset_mypage"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              <span>마이페이지 짐 자산화</span>
            </button>

            <button
              onClick={() => setActiveTab("staff")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "staff"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>사내 업무 포털</span>
            </button>

            <button
              onClick={() => setActiveTab("commander")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "commander"
                  ? "bg-slate-900 text-amber-300 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>총사령관 워룸</span>
            </button>
          </div>

          {/* Right Action: Google OTP 2FA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOtpModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>구글 OTP (2FA)</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Scroller */}
        <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-slate-100 gap-2 bg-slate-50 text-xs font-bold whitespace-nowrap">
          <button
            onClick={() => setActiveTab("b2c_booking")}
            className={`px-3 py-1.5 rounded-lg ${activeTab === "b2c_booking" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}
          >
            AI 비전 예약
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-3 py-1.5 rounded-lg ${activeTab === "pricing" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}
          >
            슬라이딩 요금제
          </button>
          <button
            onClick={() => setActiveTab("asset_mypage")}
            className={`px-3 py-1.5 rounded-lg ${activeTab === "asset_mypage" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}
          >
            짐 자산화 (당근/금)
          </button>
          <button
            onClick={() => setActiveTab("staff")}
            className={`px-3 py-1.5 rounded-lg ${activeTab === "staff" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}
          >
            사내 포털
          </button>
          <button
            onClick={() => setActiveTab("commander")}
            className={`px-3 py-1.5 rounded-lg ${activeTab === "commander" ? "bg-slate-900 text-amber-300" : "bg-white text-slate-700"}`}
          >
            총사령관 워룸
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === "b2c_booking" && <LockerAiVisionBooking />}
        {activeTab === "pricing" && <SlidingPricingCalculator />}
        {activeTab === "asset_mypage" && <MypageAssetManager />}
        {activeTab === "staff" && <StaffPortal />}
        {activeTab === "commander" && (
          <CommanderWarRoom
            isUnlocked={isCommanderUnlocked}
            onUnlock={() => setIsCommanderUnlocked(true)}
          />
        )}
      </main>

      {/* Google OTP 2FA Modal */}
      <GoogleOtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerified={() => alert("구글 OTP 인증이 정상 완료되었습니다!")}
      />

      {/* Enterprise Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              (주)박스풀 B2C 무인 공유창고 AI 네이티브 커머스 시스템 가동 중
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>GEO (Generative Engine Optimization) Enabled</span>
            <span>•</span>
            <span>Google Authenticator 2FA Secured</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
