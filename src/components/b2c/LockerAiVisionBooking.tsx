"use client";

import React, { useState } from "react";
import {
  Camera,
  Sparkles,
  MapPin,
  CheckCircle2,
  Boxes,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

interface Store {
  id: string;
  name: string;
  address: string;
  availableLockers: number;
}

const STORES: Store[] = [
  { id: "yeoksam", name: "박스풀 역삼초교점", address: "서울시 강남구 역삼동 (도보 5분)", availableLockers: 14 },
  { id: "nonhyeon", name: "박스풀 논현점", address: "서울시 강남구 논현동 (학동역 인근)", availableLockers: 8 },
  { id: "gayang", name: "박스풀 가양점", address: "서울시 강서구 가양역 대형 물류센터", availableLockers: 22 },
  { id: "gwanak", name: "박스풀 관악점", address: "서울시 관악구 봉천동 (1인가구 특화)", availableLockers: 11 },
];

export const LockerAiVisionBooking: React.FC = () => {
  const [mode, setMode] = useState<"ai_fast" | "manual">("ai_fast");
  const [selectedStoreId, setSelectedStoreId] = useState<string>("yeoksam");
  const [analyzingImage, setAnalyzingImage] = useState<boolean>(false);
  const [analyzedResult, setAnalyzedResult] = useState<{
    sizeName: string;
    cbm: string;
    matchingItems: string;
    confidence: string;
    recommendedLockerNum: string;
    price: string;
  } | null>(null);
  const [selectedLockerNum, setSelectedLockerNum] = useState<string>("204");
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  // 시뮬레이션 사진 업로드 & AI 비전 분석
  const handleSimulateVision = () => {
    setAnalyzingImage(true);
    setAnalyzedResult(null);

    setTimeout(() => {
      setAnalyzingImage(false);
      setAnalyzedResult({
        sizeName: "스몰 (Small / 0.8m × 1.0m × 2.1m)",
        cbm: "약 1.35 CBM",
        matchingItems: "이삿짐 박스 6개 + 골프백 1개 + 계절 행거",
        confidence: "98% 최적 매칭 (약 18% 여유 공간 남음)",
        recommendedLockerNum: "204호 (허리 높이 골든존 ⭐)",
        price: "15일 ₩100,000 (33% 할인 구간)",
      });
      setSelectedLockerNum("204");
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-8">
      {/* Top Controls: Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 플러그인 일사천리 예약 vs 인터랙티브 수동 모드</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            지점 선택부터 3D 라커 배정 & 원클릭 결제
          </h2>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setMode("ai_fast")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === "ai_fast"
                ? "bg-slate-900 text-amber-300 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI 패스트트랙 모드</span>
          </button>
          <button
            onClick={() => setMode("manual")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === "manual"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>직접 선택 모드</span>
          </button>
        </div>
      </div>

      {/* Step 1: Select Store */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600" />
          STEP 1. 방문하실 지점 선택
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STORES.map((store) => {
            const isSelected = store.id === selectedStoreId;
            return (
              <button
                key={store.id}
                onClick={() => setSelectedStoreId(store.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">{store.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    잔여 {store.availableLockers}개
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{store.address}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: AI Vision or Manual Size */}
      {mode === "ai_fast" ? (
        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-4 h-4" />
              STEP 2. 짐 사진 1장으로 끝나는 AI 비전 크기 측정
            </span>
            <p className="text-xs text-slate-300">
              방 사진, 이삿짐 박스 더미 사진을 올리면 AI가 부피를 계산하여 딱 맞는 라커와 골든존 번호를 배정합니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleSimulateVision}
              disabled={analyzingImage}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <Camera className="w-4 h-4" />
              <span>{analyzingImage ? "AI가 짐 부피 측정 중..." : "📸 샘플 짐 사진 분석하기"}</span>
            </button>
            <span className="text-xs text-slate-400">
              * 카메라로 찍거나 갤러리 사진을 올려도 1초 만에 견적이 나옵니다.
            </span>
          </div>

          {/* AI Result Card */}
          {analyzedResult && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  AI 분석 완료: {analyzedResult.confidence}
                </span>
                <span className="text-slate-400 font-mono">부피: {analyzedResult.cbm}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">추천 라커 규격</span>
                  <strong className="text-white text-sm">{analyzedResult.sizeName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">감지된 주요 물품</span>
                  <strong className="text-slate-200">{analyzedResult.matchingItems}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">추천 배정 위치</span>
                  <strong className="text-amber-400 font-mono">{analyzedResult.recommendedLockerNum}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Manual Step: Manual Selection */
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            STEP 2. 원하시는 규격을 직접 선택하세요
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {["큐브 (1m×1m)", "스몰 (0.8m×1m)", "미디엄 (1m×1m)", "라지 (1.5m×1.5m)"].map((s, idx) => (
              <button
                key={idx}
                className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 text-left font-bold text-slate-800"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Interactive Locker Map (201~212) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            STEP 3. 라커 위치 확인 및 변경 (매장 도면 뷰어)
          </label>
          <span className="text-xs text-slate-500">
            초록색: 빈 라커 | 파란색: 선택된 라커
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span>[출입구 & 무인 도어락] 🚪</span>
            <span>── 메인 통로 (폭 1.2m) ──</span>
            <span>[비상구]</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {[
              { num: "201", status: "empty", tier: "상단" },
              { num: "202", status: "occupied", tier: "상단" },
              { num: "203", status: "empty", tier: "허리 골든존" },
              { num: "204", status: "selected", tier: "허리 골든존 ⭐" },
              { num: "205", status: "empty", tier: "허리 골든존" },
              { num: "206", status: "occupied", tier: "하단" },
              { num: "207", status: "empty", tier: "하단" },
              { num: "208", status: "empty", tier: "하단" },
              { num: "209", status: "empty", tier: "상단" },
              { num: "210", status: "occupied", tier: "허리 골든존" },
              { num: "211", status: "empty", tier: "허리 골든존" },
              { num: "212", status: "empty", tier: "하단" },
            ].map((locker) => {
              const isSelected = selectedLockerNum === locker.num;
              const isOccupied = locker.status === "occupied";
              return (
                <button
                  key={locker.num}
                  disabled={isOccupied}
                  onClick={() => setSelectedLockerNum(locker.num)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isOccupied
                      ? "bg-slate-800/50 border-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                      : isSelected
                      ? "bg-blue-600 text-white border-blue-400 shadow-lg ring-2 ring-blue-400/40"
                      : "bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <p className="text-xs font-mono font-black">{locker.num}호</p>
                  <p className="text-[9px] mt-0.5 truncate opacity-80">{locker.tier}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 4: Final One-Click Checkout */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 font-bold">최종 배정 정보</span>
          <h4 className="text-base font-black text-slate-900 mt-0.5">
            {STORES.find((s) => s.id === selectedStoreId)?.name} • {selectedLockerNum}호 (스몰 S)
          </h4>
          <p className="text-xs text-blue-600 font-semibold mt-0.5">
            15일 슬라이딩 할인 요금: ₩100,000 (일 ₩6,660원 꼴 / 33% 세이브)
          </p>
        </div>

        <button
          onClick={() => {
            setCheckoutComplete(true);
            alert(`[결제 승인] ${selectedLockerNum}호 예약이 완료되었습니다! 도어락 비밀번호가 카카오 알림톡으로 전송되었습니다.`);
          }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
        >
          <CreditCard className="w-4 h-4" />
          <span>토스페이/카카오페이 1초 결제</span>
        </button>
      </div>
    </div>
  );
};
