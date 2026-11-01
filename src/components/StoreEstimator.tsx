"use client";

import React, { useState } from "react";
import {
  Upload,
  Layers,
  Calculator,
  TrendingUp,
  ShieldCheck,
  Check,
  Copy,
  ChevronRight,
  Sparkles,
  FileText,
  DollarSign,
  Maximize2,
  Calendar,
  AlertCircle,
  Building,
} from "lucide-react";

interface PresetPlan {
  size: 30 | 50 | 70;
  name: string;
  sqm: number;
  unitCount: number;
  capex: {
    total: number; // 만원 단위
    perPyeong: number; // 만원 단위
    lockers: number;
    iotLocks: number;
    hvacAndCctv: number;
    interiorAndSign: number;
  };
  unitsBreakdown: {
    type: string;
    dims: string;
    qty: number;
    pricePerMonth: number; // 만원
  }[];
  monthlyRampUp: {
    month: number;
    occupancy: number; // %
    revenue: number; // 만원
    opex: number; // 만원 (관리비, 통신, 플랫폼수수료 등)
    netProfit: number; // 만원
  }[];
}

const PRESET_PLANS: Record<30 | 50 | 70, PresetPlan> = {
  30: {
    size: 30,
    name: "30평형 (실속 소형 매장)",
    sqm: 99.2,
    unitCount: 36,
    capex: {
      total: 3600, // 3,600만원
      perPyeong: 120,
      lockers: 2200,
      iotLocks: 450,
      hvacAndCctv: 450,
      interiorAndSign: 500,
    },
    unitsBreakdown: [
      { type: "SafeBox (서류/신발)", dims: "0.8m x 0.8m", qty: 8, pricePerMonth: 4.5 },
      { type: "XS (소형 이사짐)", dims: "1.0m x 1.0m", qty: 10, pricePerMonth: 7.5 },
      { type: "S (원룸/캠핑장비)", dims: "1.0m x 1.2m", qty: 12, pricePerMonth: 10.5 },
      { type: "M (가구/취미용품)", dims: "1.2m x 1.5m", qty: 6, pricePerMonth: 15.0 },
    ],
    monthlyRampUp: [
      { month: 1, occupancy: 25, revenue: 87, opex: 35, netProfit: 52 },
      { month: 2, occupancy: 35, revenue: 122, opex: 36, netProfit: 86 },
      { month: 3, occupancy: 50, revenue: 175, opex: 38, netProfit: 137 },
      { month: 4, occupancy: 65, revenue: 227, opex: 40, netProfit: 187 },
      { month: 6, occupancy: 78, revenue: 273, opex: 42, netProfit: 231 },
      { month: 8, occupancy: 88, revenue: 308, opex: 43, netProfit: 265 },
      { month: 12, occupancy: 94.8, revenue: 332, opex: 45, netProfit: 287 },
    ],
  },
  50: {
    size: 50,
    name: "50평형 (표준 플래그십 - 대전점 실측 기준)",
    sqm: 165.3,
    unitCount: 58,
    capex: {
      total: 5700, // 5,700만원
      perPyeong: 114,
      lockers: 3600,
      iotLocks: 750,
      hvacAndCctv: 650,
      interiorAndSign: 700,
    },
    unitsBreakdown: [
      { type: "SafeBox (서류/신발)", dims: "0.8m x 0.8m", qty: 10, pricePerMonth: 4.5 },
      { type: "XS (소형 이사짐)", dims: "1.0m x 1.0m", qty: 14, pricePerMonth: 7.5 },
      { type: "S (원룸/캠핑장비)", dims: "1.0m x 1.2m", qty: 18, pricePerMonth: 10.5 },
      { type: "M (가구/취미용품)", dims: "1.2m x 1.5m", qty: 12, pricePerMonth: 15.0 },
      { type: "L (대형 이사보관)", dims: "1.5m x 2.0m", qty: 4, pricePerMonth: 22.0 },
    ],
    monthlyRampUp: [
      { month: 1, occupancy: 25, revenue: 158, opex: 55, netProfit: 103 },
      { month: 2, occupancy: 38, revenue: 241, opex: 58, netProfit: 183 },
      { month: 3, occupancy: 52, revenue: 330, opex: 60, netProfit: 270 },
      { month: 4, occupancy: 68, revenue: 431, opex: 65, netProfit: 366 },
      { month: 6, occupancy: 80, revenue: 508, opex: 68, netProfit: 440 },
      { month: 8, occupancy: 90, revenue: 571, opex: 70, netProfit: 501 },
      { month: 12, occupancy: 94.8, revenue: 602, opex: 72, netProfit: 530 },
    ],
  },
  70: {
    size: 70,
    name: "70평형 (대형 하이퍼 스토리지)",
    sqm: 231.4,
    unitCount: 86,
    capex: {
      total: 7900, // 7,900만원
      perPyeong: 112,
      lockers: 5100,
      iotLocks: 1100,
      hvacAndCctv: 850,
      interiorAndSign: 850,
    },
    unitsBreakdown: [
      { type: "SafeBox (서류/신발)", dims: "0.8m x 0.8m", qty: 16, pricePerMonth: 4.5 },
      { type: "XS (소형 이사짐)", dims: "1.0m x 1.0m", qty: 22, pricePerMonth: 7.5 },
      { type: "S (원룸/캠핑장비)", dims: "1.0m x 1.2m", qty: 26, pricePerMonth: 10.5 },
      { type: "M (가구/취미용품)", dims: "1.2m x 1.5m", qty: 16, pricePerMonth: 15.0 },
      { type: "L (대형 이사보관)", dims: "1.5m x 2.0m", qty: 6, pricePerMonth: 22.0 },
    ],
    monthlyRampUp: [
      { month: 1, occupancy: 22, revenue: 206, opex: 75, netProfit: 131 },
      { month: 2, occupancy: 35, revenue: 328, opex: 80, netProfit: 248 },
      { month: 3, occupancy: 50, revenue: 469, opex: 85, netProfit: 384 },
      { month: 4, occupancy: 65, revenue: 610, opex: 90, netProfit: 520 },
      { month: 6, occupancy: 78, revenue: 732, opex: 95, netProfit: 637 },
      { month: 8, occupancy: 88, revenue: 826, opex: 98, netProfit: 728 },
      { month: 12, occupancy: 94.8, revenue: 890, opex: 102, netProfit: 788 },
    ],
  },
};

export const StoreEstimator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");
  const [selectedSize, setSelectedSize] = useState<30 | 50 | 70>(50);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [analyzingFile, setAnalyzingFile] = useState<boolean>(false);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  const currentPlan = PRESET_PLANS[selectedSize];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setAnalyzingFile(true);
      // Simulate AI spatial analysis
      setTimeout(() => {
        setAnalyzingFile(false);
      }, 1500);
    }
  };

  const handleCopyReport = async () => {
    const text = `[BOXFUL 무인공유창고 ${currentPlan.size}평형 견적 & 매출 시뮬레이션 보고서]
- 실평수: ${currentPlan.size}평 (${currentPlan.sqm}㎡)
- 배치 락커 유닛: 총 ${currentPlan.unitCount}개
- 초기 개설비(CAPEX): 총 ${currentPlan.capex.total.toLocaleString()}만 원 (평당 ${currentPlan.capex.perPyeong}만 원)
  • 1.5T 아연도금 락커: ${currentPlan.capex.lockers.toLocaleString()}만 원
  • IoT 도어락/출입기: ${currentPlan.capex.iotLocks.toLocaleString()}만 원
  • 항온항습/CCTV: ${currentPlan.capex.hvacAndCctv.toLocaleString()}만 원
  • 인테리어/간판: ${currentPlan.capex.interiorAndSign.toLocaleString()}만 원

[12개월 램프업 매출 추이]
- 1개월차 (가동률 25%): 월 매출 ${currentPlan.monthlyRampUp[0].revenue}만 원 / 순익 ${currentPlan.monthlyRampUp[0].netProfit}만 원
- 4개월차 (손익분기점 BEP): 월 매출 ${currentPlan.monthlyRampUp[3].revenue}만 원 / 순익 ${currentPlan.monthlyRampUp[3].netProfit}만 원
- 12개월차 (만실 94.8%): 월 매출 ${currentPlan.monthlyRampUp[6].revenue}만 원 / 순익 ${currentPlan.monthlyRampUp[6].netProfit}만 원
- 연간 예상 순이익: 약 ${(currentPlan.monthlyRampUp[6].netProfit * 12).toLocaleString()}만 원 (연 수익률 38~45% 달성)`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                ENGINE: SPATIAL FINANCIAL SIMULATOR
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              도면 분석 기반 견적 & 12개월 매출 추이 시뮬레이터
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              본인 소유 상가의 도면을 업로드하거나, 도면이 없으신 경우 <strong>30평, 50평, 70평 표준 사례</strong>를 선택하여 정확한 시공 견적(CAPEX)과 1~12개월 가동률 램프업 매출 곡선을 즉시 확인하십시오.
            </p>
          </div>

          <button
            onClick={handleCopyReport}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-sm shrink-0 ${
              copiedReport
                ? "bg-emerald-500 text-black font-black"
                : "bg-white text-black hover:bg-slate-200"
            }`}
          >
            {copiedReport ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>REPORT COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Input Mode Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mode A: Preset Selector */}
        <div
          onClick={() => setActiveTab("preset")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === "preset"
              ? "bg-slate-900/90 border-indigo-500 shadow-lg shadow-indigo-500/10"
              : "bg-slate-900/40 border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  옵션 1: 기존 표준 사례 선택 (도면이 없을 때)
                </h3>
                <p className="text-xs text-slate-400">
                  전국 70개 지점 실측 데이터 기반 (30평 / 50평 / 70평)
                </p>
              </div>
            </div>
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                activeTab === "preset"
                  ? "border-indigo-400 bg-indigo-500"
                  : "border-slate-600"
              }`}
            >
              {activeTab === "preset" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
          </div>

          {/* Size Pills */}
          <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-xs">
            {([30, 50, 70] as const).map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("preset");
                  setSelectedSize(sz);
                }}
                className={`py-2 px-3 rounded-xl font-bold transition-all flex flex-col items-center gap-0.5 ${
                  selectedSize === sz && activeTab === "preset"
                    ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                    : "bg-black/40 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                <span>{sz}평형</span>
                <span className="text-[10px] font-normal opacity-70">
                  {sz === 30 ? "소형" : sz === 50 ? "표준 (대전점)" : "대형"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode B: Custom Blueprint Upload */}
        <div
          onClick={() => setActiveTab("custom")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activeTab === "custom"
              ? "bg-slate-900/90 border-indigo-500 shadow-lg shadow-indigo-500/10"
              : "bg-slate-900/40 border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  옵션 2: 내 도면 직접 업로드 (도면 보유 시)
                </h3>
                <p className="text-xs text-slate-400">
                  평면도 이미지(PNG, JPG) 첨부 시 비전 AI 자동 락커 구획
                </p>
              </div>
            </div>
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                activeTab === "custom"
                  ? "border-emerald-400 bg-emerald-500"
                  : "border-slate-600"
              }`}
            >
              {activeTab === "custom" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
          </div>

          <div className="mt-4">
            <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-white/20 hover:border-indigo-400 transition-colors bg-black/30 cursor-pointer">
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
              <span className="text-xs text-slate-300 font-mono">
                {uploadedFileName ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>{uploadedFileName} (도면 로드 완료)</span>
                  </span>
                ) : (
                  <span>클릭하여 도면 파일 첨부 (또는 드래그 앤 드롭)</span>
                )}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* RESULT DASHBOARD */}
      <div className="space-y-6">
        {/* Selected Plan Summary Banner */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold text-sm">
              {currentPlan.name}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">전용 면적: {currentPlan.sqm}㎡</span>
            <span className="text-slate-500">|</span>
            <span className="text-indigo-400 font-bold">배치 락커: {currentPlan.unitCount}개 유닛</span>
          </div>

          <div className="text-slate-400">
            글로벌 스마트팩토리 1.5T 아연도금 직소싱 단가 적용
          </div>
        </div>

        {/* 1. CAPEX Breakdown (견적서) */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">
                1. 초기 시공 개설 견적서 (CAPEX Breakdown)
              </h3>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-slate-400 mr-2">총 개설 비용:</span>
              <span className="text-base sm:text-lg font-black text-emerald-400">
                ₩{currentPlan.capex.total.toLocaleString()}만 원
              </span>
              <span className="text-[11px] text-slate-500 ml-1">
                (평당 {currentPlan.capex.perPyeong}만 원)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <span className="text-slate-500 text-[11px] block">1.5T 아연도금 락커</span>
              <span className="text-white font-bold text-sm block">
                ₩{currentPlan.capex.lockers.toLocaleString()}만 원
              </span>
              <span className="text-[10px] text-slate-500">비중 62%</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <span className="text-slate-500 text-[11px] block">IoT 스마트락 & 안면인식</span>
              <span className="text-white font-bold text-sm block">
                ₩{currentPlan.capex.iotLocks.toLocaleString()}만 원
              </span>
              <span className="text-[10px] text-slate-500">자체 OS 연동</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <span className="text-slate-500 text-[11px] block">항온항습기 & CCTV</span>
              <span className="text-white font-bold text-sm block">
                ₩{currentPlan.capex.hvacAndCctv.toLocaleString()}만 원
              </span>
              <span className="text-[10px] text-slate-500">24시 원격 관제</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <span className="text-slate-500 text-[11px] block">LED 간판 & 내외부 마감</span>
              <span className="text-white font-bold text-sm block">
                ₩{currentPlan.capex.interiorAndSign.toLocaleString()}만 원
              </span>
              <span className="text-[10px] text-slate-500">인테리어 표준화</span>
            </div>
          </div>

          {/* Unit Specs Table */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <span className="text-xs font-mono text-slate-400 block mb-2">
              📐 사이즈별 유닛 배치 구성표 ({currentPlan.unitCount}개)
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left text-slate-300">
                <thead className="bg-white/5 text-slate-400 text-[11px]">
                  <tr>
                    <th className="p-2.5">타입 (Type)</th>
                    <th className="p-2.5">치수 (W x D)</th>
                    <th className="p-2.5">배치 수량</th>
                    <th className="p-2.5">월 권장 임대료</th>
                    <th className="p-2.5 text-right">월 최대 매출 기여</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentPlan.unitsBreakdown.map((u, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="p-2.5 font-bold text-white">{u.type}</td>
                      <td className="p-2.5 text-slate-400">{u.dims}</td>
                      <td className="p-2.5 text-indigo-400 font-bold">{u.qty}실</td>
                      <td className="p-2.5">{u.pricePerMonth}만 원</td>
                      <td className="p-2.5 text-right text-emerald-400 font-bold">
                        {(u.qty * u.pricePerMonth).toFixed(1)}만 원/월
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 2. Monthly Ramp-Up & Revenue Curve (매출 추이) */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                2. 오픈 1~12개월 램프업 가동률 & 매출 추이 곡선
              </h3>
            </div>
            <div className="font-mono text-xs text-slate-400">
              안정기 기준 예상 순익: <strong className="text-emerald-400 font-bold">월 {currentPlan.monthlyRampUp[6].netProfit}만 원</strong> (연 {currentPlan.monthlyRampUp[6].netProfit * 12}만 원)
            </div>
          </div>

          {/* Visual Progression Bars */}
          <div className="space-y-3 font-mono text-xs pt-2">
            {currentPlan.monthlyRampUp.map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-bold">
                    {step.month}개월차 ({step.month <= 3 ? "초기 유입기" : step.month <= 6 ? "손익분기 돌파" : "안정 만실"})
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-400">가동률 {step.occupancy}%</span>
                    <span className="text-slate-400">월 매출 {step.revenue}만</span>
                    <span className="text-emerald-400 font-bold">순익 ₩{step.netProfit}만</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${step.occupancy}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      step.month <= 3
                        ? "bg-indigo-500"
                        : step.month <= 6
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key Financial Insights */}
          <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">손익분기점 (BEP)</span>
              <span className="text-white font-bold text-sm">오픈 4개월 차 돌파</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">가동률 60% 이상 시 흑자 전환</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">원금 회수 기간 (Payback)</span>
              <span className="text-indigo-400 font-bold text-sm">약 14~18개월 내외</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">자가 건물 시 12개월 단축</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">연간 예상 투자 수익률 (ROI)</span>
              <span className="text-emerald-400 font-bold text-sm">연 35% ~ 45%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">일반 상가 임대 대비 180% 우위</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
