"use client";

import React, { useState } from "react";
import { Clock, Calendar, Check, Zap, Sparkles, Shield, ArrowRight } from "lucide-react";

interface SizeOption {
  id: string;
  name: string;
  badge: string;
  dimension: string;
  capacity: string;
  baseDailyPrice: number;
  monthlyBasePrice: number;
  isHourlyOnly?: boolean;
}

const SIZES: SizeOption[] = [
  {
    id: "hourly",
    name: "⚡ 퀵-타임 (시간제 전용)",
    badge: "101~110호 출입구 전용",
    dimension: "0.5m × 0.5m × 0.5m",
    capacity: "쇼핑백, 여행용 캐리어, 당일 짐 맡김",
    baseDailyPrice: 15000,
    monthlyBasePrice: 0,
    isHourlyOnly: true,
  },
  {
    id: "cube",
    name: "큐브 (Cube)",
    badge: "인기 소형",
    dimension: "1.0m × 1.0m × 1.0m",
    capacity: "의류 박스 8~10개, 서류, 소형 취미용품",
    baseDailyPrice: 7000,
    monthlyBasePrice: 140000,
  },
  {
    id: "small",
    name: "스몰 (Small)",
    badge: "대표 추천 ⭐",
    dimension: "0.8m × 1.0m × 2.1m",
    capacity: "골프백 2개, 스노보드, 계절 옷, 원룸 소형 짐",
    baseDailyPrice: 10000,
    monthlyBasePrice: 200000,
  },
  {
    id: "medium",
    name: "미디엄 (Medium)",
    badge: "1인 가구 최적",
    dimension: "1.0m × 1.0m × 2.1m",
    capacity: "원룸 이삿짐, 매트리스, 소형 가전 및 박스 20개",
    baseDailyPrice: 14000,
    monthlyBasePrice: 280000,
  },
  {
    id: "large",
    name: "라지 (Large)",
    badge: "대용량",
    dimension: "1.5m × 1.5m × 2.1m",
    capacity: "투룸 이삿짐, 대형 가구, 기업 재고 보관",
    baseDailyPrice: 22000,
    monthlyBasePrice: 450000,
  },
];

const PERIOD_TIERS = [
  { id: "1d", label: "1일 (단기)", days: 1, note: "하루 단기 체험" },
  { id: "7d", label: "7일 (1주일)", days: 7, note: "출장/단기 보관" },
  { id: "15d", label: "15일 (보름)", days: 15, note: "🔥 33% 특별 할인" },
  { id: "30d", label: "1개월 (30일)", days: 30, note: "표준 월 정기 이용" },
  { id: "90d", label: "3개월 (장기)", days: 90, note: "⭐ 장기 베스트 (월 15% 추가 할인)" },
  { id: "180d", label: "6개월 (VIP)", days: 180, note: "👑 최대 30% 추가 할인" },
];

export const SlidingPricingCalculator: React.FC = () => {
  const [selectedSizeId, setSelectedSizeId] = useState<string>("small");
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>("15d");
  const [hourlyTime, setHourlyTime] = useState<number>(3);

  const selectedSize = SIZES.find((s) => s.id === selectedSizeId) || SIZES[2];
  const isHourly = !!selectedSize.isHourlyOnly;

  let totalPrice = 0;
  let dailyEquivalent = 0;
  let originalPrice = 0;
  let discountPercent = 0;

  if (isHourly) {
    const hourlyRates: Record<number, number> = {
      1: 1500,
      3: 4000,
      6: 7500,
      12: 12000,
    };
    totalPrice = hourlyRates[hourlyTime] || hourlyTime * 1500;
  } else {
    const tier = PERIOD_TIERS.find((p) => p.id === selectedPeriodId) || PERIOD_TIERS[2];
    originalPrice = selectedSize.baseDailyPrice * tier.days;

    if (tier.id === "1d") {
      totalPrice = selectedSize.baseDailyPrice;
    } else if (tier.id === "7d") {
      totalPrice = selectedSize.baseDailyPrice * 7;
    } else if (tier.id === "15d") {
      totalPrice = Math.round((selectedSize.baseDailyPrice * 15 * 0.67) / 1000) * 1000;
    } else if (tier.id === "30d") {
      totalPrice = selectedSize.monthlyBasePrice;
    } else if (tier.id === "90d") {
      totalPrice = Math.round(selectedSize.monthlyBasePrice * 3 * 0.85);
    } else if (tier.id === "180d") {
      totalPrice = Math.round(selectedSize.monthlyBasePrice * 6 * 0.7);
    }

    dailyEquivalent = Math.round(totalPrice / tier.days);
    const discountAmount = Math.max(0, originalPrice - totalPrice);
    discountPercent = Math.round((discountAmount / originalPrice) * 100);
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>장기 이용 시 하루 ₩4,660원 꼴 슬라이딩 요금제</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            스마트 락커 요금 실시간 계산기
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            출입구 시간제 락커부터 15일·월 단위 장기 할인까지 원하는 기간을 자유롭게 설정하세요.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>보증금 0원 · 중도 위약금 없는 안심 보관</span>
        </div>
      </div>

      {/* Step 1: Select Locker Size */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
          STEP 1. 보관함 사이즈 선택
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SIZES.map((size) => {
            const isSelected = size.id === selectedSizeId;
            return (
              <button
                key={size.id}
                onClick={() => setSelectedSizeId(size.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 inline-block mb-2">
                  {size.badge}
                </span>
                <h4 className="text-sm font-black text-slate-900">{size.name}</h4>
                <p className="text-[11px] text-blue-700 font-mono font-medium mt-1">
                  {size.dimension}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {size.capacity}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Duration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            STEP 2. 이용 기간 설정
          </label>
          <span className="text-xs text-blue-600 font-bold">
            {isHourly ? "⚡ 101~110호 시간제 전용 락커" : "🗓️ 장기 이용할수록 하루 비용 급감"}
          </span>
        </div>

        {isHourly ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 3, 6, 12].map((hours) => (
              <button
                key={hours}
                onClick={() => setHourlyTime(hours)}
                className={`p-4 rounded-2xl border text-center font-bold text-sm transition-all ${
                  hourlyTime === hours
                    ? "bg-slate-900 text-amber-300 border-slate-900 shadow-md"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                <Clock className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                <span>{hours}시간 이용</span>
                <p className="text-xs font-mono font-normal mt-0.5 opacity-80">
                  {hours === 1 ? "₩1,500" : hours === 3 ? "₩4,000" : hours === 6 ? "₩7,500" : "₩12,000"}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PERIOD_TIERS.map((tier) => {
              const isSelected = tier.id === selectedPeriodId;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedPeriodId(tier.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-blue-500/30"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                  }`}
                >
                  <p className="text-xs font-black">{tier.label}</p>
                  <p
                    className={`text-[10px] font-medium mt-1 truncate ${
                      isSelected ? "text-amber-300" : "text-blue-600"
                    }`}
                  >
                    {tier.note}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Pricing Summary Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold">
              {selectedSize.name}
            </span>
            <span className="text-xs text-slate-300">
              {isHourly ? `${hourlyTime}시간 즉시 대여` : PERIOD_TIERS.find((p) => p.id === selectedPeriodId)?.label}
            </span>
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 text-xs font-black animate-pulse">
                {discountPercent}% 절약!
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
              ₩{totalPrice.toLocaleString()}
            </span>
            {!isHourly && dailyEquivalent > 0 && (
              <span className="text-xs text-slate-300 font-medium">
                (하루 약 <strong className="text-white">₩{dailyEquivalent.toLocaleString()}원</strong> 꼴)
              </span>
            )}
            {originalPrice > totalPrice && (
              <span className="text-sm text-slate-400 line-through font-mono">
                ₩{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            24시간 IoT 무인 출입 비밀번호 즉시 발급 · 온도·습도 안심 케어 포함
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => alert(`[박스풀 예약] ${selectedSize.name} (${isHourly ? hourlyTime + "시간" : selectedPeriodId}) 결제창으로 이동합니다.`)}
          className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all group"
        >
          <span>이 조건으로 1초 예약하기</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
