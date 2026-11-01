"use client";

import React, { useState } from "react";
import { SlidingPricingCalculator } from "@/components/b2c/SlidingPricingCalculator";
import { MypageAssetManager } from "@/components/b2c/MypageAssetManager";
import { LockerAiVisionBooking } from "@/components/b2c/LockerAiVisionBooking";
import { GoogleOtpModal } from "@/components/b2c/GoogleOtpModal";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Coins,
  Lock,
  Phone,
  HelpCircle,
  MapPin,
  Clock,
} from "lucide-react";

export default function B2CHome() {
  const [activeTab, setActiveTab] = useState<"booking" | "pricing" | "asset">("booking");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top B2C Customer Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 tracking-tight text-lg">
                  BOXFUL
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  셀프스토리지 AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                24시간 무인 스마트 공유창고 & 짐 자산화 서비스
              </p>
            </div>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="hidden md:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab("booking")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === "booking"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI 비전 예약</span>
            </button>

            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === "pricing"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>슬라이딩 요금제</span>
            </button>

            <button
              onClick={() => setActiveTab("asset")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === "asset"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>짐 자산화 (당근/금/폰)</span>
            </button>
          </div>

          {/* Right Action: Google OTP 2FA & Customer Service */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsOtpModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>구글 OTP 2차 인증</span>
            </button>

            <a
              href="tel:02-515-9988"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>02-515-9988</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto px-4 py-2.5 border-t border-slate-100 gap-2 bg-slate-50 text-xs font-bold whitespace-nowrap">
          <button
            onClick={() => setActiveTab("booking")}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === "booking"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-700"
            }`}
          >
            📸 AI 비전 예약
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === "pricing"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-700"
            }`}
          >
            ⚡ 슬라이딩 요금제
          </button>
          <button
            onClick={() => setActiveTab("asset")}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === "asset"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-700"
            }`}
          >
            💰 짐 자산화 (당근/금)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === "booking" && <LockerAiVisionBooking />}
        {activeTab === "pricing" && <SlidingPricingCalculator />}
        {activeTab === "asset" && <MypageAssetManager />}
      </main>

      {/* Google OTP Modal */}
      <GoogleOtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerified={() => alert("구글 OTP 2차 인증이 정상 완료되었습니다.")}
      />

      {/* Customer Trust Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-slate-800">
                (주)박스풀 셀프스토리지 · 한화손해보험 1억원 보관물 배상책임보험 가입
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                24시간 365일 무인 출입
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                전국 30여 개 역세권 지점
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              (주)박스풀 | 사업자등록번호: 220-88-88102 | 대표자: 성정학 | 서울시 강남구 테헤란로 82길 15
            </p>
            <div className="flex items-center gap-3">
              <span>이용약관</span>
              <span>•</span>
              <span>개인정보처리방침</span>
              <span>•</span>
              <span className="text-blue-600 font-bold">AI Native Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
