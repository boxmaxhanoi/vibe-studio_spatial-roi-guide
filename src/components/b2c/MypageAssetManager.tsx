"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Camera,
  Coins,
  Smartphone,
  Tag,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

interface AssetItem {
  id: string;
  name: string;
  category: "electronics" | "gold" | "outdoor" | "appliances";
  estimatedValue: number;
  marketType: "instant_buyout" | "carrot_sale";
  suggestedAction: string;
  badge: string;
  status: "stored" | "selling" | "sold";
}

const INITIAL_ITEMS: AssetItem[] = [
  {
    id: "item-1",
    name: "순금 골드바 (10g / 99.99%)",
    category: "gold",
    estimatedValue: 1250000,
    marketType: "instant_buyout",
    suggestedAction: "박스풀 당일 즉시 매입 (30분 내 계좌 입금)",
    badge: "💰 즉시 매입 가능",
    status: "stored",
  },
  {
    id: "item-2",
    name: "애플 아이폰 15 Pro (256GB 내추럴 티타늄)",
    category: "electronics",
    estimatedValue: 880000,
    marketType: "instant_buyout",
    suggestedAction: "기기 검수 후 박스풀 즉시 현금 매입",
    badge: "📱 스마트폰 즉시 매입",
    status: "stored",
  },
  {
    id: "item-3",
    name: "콜맨 터프 스크린 2룸 텐트 (캠핑용품)",
    category: "outdoor",
    estimatedValue: 240000,
    marketType: "carrot_sale",
    suggestedAction: "당근마켓 실시간 추천 시세 (평균 24만원)",
    badge: "🥕 당근 시세 추천",
    status: "stored",
  },
  {
    id: "item-4",
    name: "다이슨 에어랩 멀티 스타일러 컴플리트",
    category: "appliances",
    estimatedValue: 380000,
    marketType: "carrot_sale",
    suggestedAction: "인기 매물! 당근마켓 원클릭 판매 등록",
    badge: "🥕 당근 시세 추천",
    status: "stored",
  },
];

export const MypageAssetManager: React.FC = () => {
  const [items, setItems] = useState<AssetItem[]>(INITIAL_ITEMS);
  const [activeModal, setActiveModal] = useState<AssetItem | null>(null);

  const totalAssetValue = items.reduce((sum, item) => sum + item.estimatedValue, 0);

  const handleAction = (item: AssetItem) => {
    setActiveModal(item);
  };

  const handleConfirmAction = (item: AssetItem) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "selling" } : i))
    );
    setActiveModal(null);
    alert(
      item.marketType === "instant_buyout"
        ? `[즉시 매입 접수] ${item.name}의 매입 신청이 완료되었습니다. 구글 OTP 2차 인증 후 등록된 계좌로 30분 내 ₩${item.estimatedValue.toLocaleString()}원이 입금됩니다.`
        : `[당근마켓 연동] ${item.name}의 판매 게시글이 당근마켓에 등록되었습니다!`
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-8">
      {/* Top Banner: Total Stored Asset Value */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI 비전 물품 자동 분석 & 자산화 핀테크</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            내 보관함 짐 예상 자산 가치
          </h2>
          <p className="text-xs text-slate-300">
            보관 중인 사진 속 물품을 AI가 분석하여 중고 판매 시세와 즉시 현금 매입가를 실시간으로 계산해 드립니다.
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            총 추정 자산 가치
          </p>
          <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight mt-1">
            ₩{totalAssetValue.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            보관료를 상쇄하고도 남는 환금성
          </span>
        </div>
      </div>

      {/* Upload Zone Prompt */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              보관함에 새로 넣은 짐 사진이 있으신가요?
            </h4>
            <p className="text-[11px] text-slate-500">
              사진 1장만 등록하면 AI가 물품을 자동 태깅하고 실시간 시세를 알려드립니다.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("새 짐 사진을 업로드하면 AI가 물품을 자동 분류합니다.")}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all whitespace-nowrap"
        >
          + 짐 사진 추가 등록
        </button>
      </div>

      {/* Recognized Asset Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            보관함 내 인식된 물품 목록 ({items.length}개)
          </h3>
          <span className="text-xs text-slate-400">
            실시간 시세 업데이트: 2026.11 기준
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => {
            const isInstant = item.marketType === "instant_buyout";
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white shadow-sm space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                        isInstant
                          ? "bg-amber-100 text-amber-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {item.category === "gold" ? (
                        <Coins className="w-4 h-4" />
                      ) : item.category === "electronics" ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Tag className="w-4 h-4" />
                      )}
                    </span>
                    <div>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isInstant
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}
                      >
                        {item.badge}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {item.name}
                      </h4>
                    </div>
                  </div>

                  <span className="text-sm font-black text-slate-900 font-mono">
                    ₩{item.estimatedValue.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                  <span className="truncate max-w-[240px] font-medium">
                    {item.suggestedAction}
                  </span>
                  {item.status === "selling" ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      진행 중
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">
                      대기 중
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {isInstant ? (
                    <button
                      onClick={() => handleAction(item)}
                      disabled={item.status === "selling"}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                      <span>박스풀 즉시 현금 매입 신청</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction(item)}
                      disabled={item.status === "selling"}
                      className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>🥕 당근마켓 원클릭 판매 등록</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="space-y-2 text-center">
              <span className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-2">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {activeModal.marketType === "instant_buyout"
                  ? "💰 박스풀 즉시 매입 신청"
                  : "🥕 당근마켓 위탁 판매 등록"}
              </h3>
              <p className="text-xs text-slate-500">
                {activeModal.name} (예상 금액: ₩{activeModal.estimatedValue.toLocaleString()})
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">
                {activeModal.marketType === "instant_buyout"
                  ? "• 무인 보관함 물품 상태 확인 후 30분 이내 등록 계좌로 현금 입금됩니다."
                  : "• 최적 추천가로 판매글이 자동 등록되며, 구매자 연락 시 알림톡이 전송됩니다."}
              </p>
              <p className="text-[11px] text-slate-500">
                보안을 위해 다음 단계에서 구글 OTP(2FA) 인증이 요구될 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="w-1/2 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                취소
              </button>
              <button
                onClick={() => handleConfirmAction(activeModal)}
                className="w-1/2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                확인 및 진행
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
