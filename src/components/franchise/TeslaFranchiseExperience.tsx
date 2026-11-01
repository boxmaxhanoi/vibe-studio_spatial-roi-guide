"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Briefcase,
  Search,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  FileText,
  DollarSign,
  Clock,
  Sparkles,
  MapPin,
  Flame,
  Check,
  ChevronRight,
  X,
  CreditCard,
} from "lucide-react";

export type UserType = "OWNER" | "INVESTOR";
export type BrandMode = "FRANCHISE" | "TECH_ONLY";
export type InteriorMode = "TURNKEY" | "SELF";

export interface FloorConfig {
  id: string;
  floorName: string;
  enabled: boolean;
  area: number;
  category: "BOXFUL" | "CAFE" | "SALON" | "STUDY";
}

const PRESET_ADDRESSES = [
  { label: "서울 강남구 테헤란로 152 (역삼역 역세권)", address: "서울특별시 강남구 테헤란로 152" },
  { label: "대전 서구 둔산로 123 (대전 301호 중심상권)", address: "대전광역시 서구 둔산로 123" },
  { label: "경기 성남시 분당구 판교역로 235 (오피스 복합)", address: "경기도 성남시 분당구 판교역로 235" },
];

export function TeslaFranchiseExperience() {
  const [userType, setUserType] = useState<UserType>("OWNER");

  // 주소 및 상권 진단
  const [selectedAddress, setSelectedAddress] = useState<string>(PRESET_ADDRESSES[0].address);
  const [isCustomAddress, setIsCustomAddress] = useState<boolean>(false);
  const [customAddressInput, setCustomAddressInput] = useState<string>("");
  const [scanState, setScanState] = useState<"IDLE" | "SCANNING" | "SCANNED">("SCANNED");

  // 4대 모듈형 선택제
  const [brandMode, setBrandMode] = useState<BrandMode>("FRANCHISE");
  const [interiorMode, setInteriorMode] = useState<InteriorMode>("TURNKEY");

  // IoT 옵션
  const [iotFace, setIotFace] = useState<boolean>(true);
  const [iotHvac, setIotHvac] = useState<boolean>(true);
  const [iotSensor, setIotSensor] = useState<boolean>(true);
  const [iotCloud, setIotCloud] = useState<boolean>(true);

  // 층별 믹스
  const [floors, setFloors] = useState<FloorConfig[]>([
    { id: "b1", floorName: "지하 1층", enabled: true, area: 45, category: "BOXFUL" },
    { id: "1f", floorName: "지상 1층", enabled: false, area: 30, category: "CAFE" },
    { id: "2f", floorName: "지상 2층", enabled: true, area: 40, category: "SALON" },
    { id: "3f", floorName: "지상 3층", enabled: false, area: 40, category: "STUDY" },
  ]);

  // 가동률 시뮬레이션
  const [occupancyRate, setOccupancyRate] = useState<number>(85);

  // 모달
  const [contractModalOpen, setContractModalOpen] = useState<boolean>(false);
  const [tenancyKitModalOpen, setTenancyKitModalOpen] = useState<boolean>(false);

  // 실시간 계산
  const calculation = useMemo(() => {
    let totalSetupCost = 0;
    let monthlyRevenue = 0;
    let monthlyOperatingCost = 0;

    const franchiseFee = brandMode === "FRANCHISE" ? 5000000 : 0;
    totalSetupCost += franchiseFee;

    floors.forEach((f) => {
      if (!f.enabled) return;

      if (f.category === "BOXFUL") {
        const costPerPyeong = interiorMode === "TURNKEY" ? 850000 : 250000;
        totalSetupCost += f.area * costPerPyeong;

        const fullCapacityRevenue = f.area * 110000;
        const actualRevenue = fullCapacityRevenue * (occupancyRate / 100);
        monthlyRevenue += actualRevenue;

        const utilityCost = f.area * 8000;
        const royaltyCost = brandMode === "FRANCHISE" ? actualRevenue * 0.12 : f.area * 1.1 * 4000;
        monthlyOperatingCost += utilityCost + royaltyCost;
      } else if (f.category === "SALON") {
        const infraCost = interiorMode === "TURNKEY" ? f.area * 450000 : f.area * 150000;
        totalSetupCost += infraCost;
        monthlyRevenue += f.area * 85000;
        monthlyOperatingCost += f.area * 5000;
      } else if (f.category === "CAFE") {
        totalSetupCost += 15000000;
        monthlyRevenue += 3200000 * (occupancyRate / 100);
        monthlyOperatingCost += 900000;
      } else if (f.category === "STUDY") {
        totalSetupCost += f.area * 550000;
        monthlyRevenue += f.area * 75000 * (occupancyRate / 100);
        monthlyOperatingCost += f.area * 9000;
      }
    });

    let iotTotal = 0;
    if (iotFace) iotTotal += 3500000;
    if (iotHvac) iotTotal += 2200000;
    if (iotSensor) iotTotal += 1200000;
    totalSetupCost += iotTotal;

    if (iotCloud) {
      monthlyOperatingCost += 80000;
    }

    const monthlyNetProfit = Math.max(0, monthlyRevenue - monthlyOperatingCost);
    const paybackMonths = monthlyNetProfit > 0 ? (totalSetupCost / monthlyNetProfit).toFixed(1) : "계산 불가";
    const annualRoi = totalSetupCost > 0 ? (((monthlyNetProfit * 12) / totalSetupCost) * 100).toFixed(1) : "0";

    return {
      totalSetupCost,
      franchiseFee,
      iotTotal,
      monthlyRevenue,
      monthlyOperatingCost,
      monthlyNetProfit,
      paybackMonths,
      annualRoi,
    };
  }, [brandMode, interiorMode, iotFace, iotHvac, iotSensor, iotCloud, floors, occupancyRate]);

  const toggleFloor = (id: string) => {
    setFloors((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  const updateFloorArea = (id: string, delta: number) => {
    setFloors((prev) =>
      prev.map((f) => (f.id === id ? { ...f, area: Math.max(15, Math.min(200, f.area + delta)) } : f))
    );
  };

  const updateFloorCategory = (id: string, category: "BOXFUL" | "CAFE" | "SALON" | "STUDY") => {
    setFloors((prev) => prev.map((f) => (f.id === id ? { ...f, category } : f)));
  };

  const handleStartScan = () => {
    setScanState("SCANNING");
    setTimeout(() => {
      setScanState("SCANNED");
    }, 1000);
  };

  const currentAddressText = isCustomAddress ? customAddressInput || selectedAddress : selectedAddress;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* ── 1. 테슬라 스타일 헤더 ─────────────────────────────────── */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-teal-400 text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
          <Zap className="w-3.5 h-3.5" />
          <span>Tesla-Style Space Configurator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          영업사원 없는 100% 데이터 기반 <br />
          <span className="text-teal-600">원스톱 무인 프랜차이즈 & 공간 컨피규레이터</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          주소만 입력하면 3초 만에 공공데이터·상권 분석 완료. 원하는 모듈만 골라 실시간 정찰제 견적과 수익률을 직접 확인하세요.
        </p>

        {/* 페르소나 선택 세그먼트 */}
        <div className="mt-8 inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/60 max-w-lg w-full">
          <button
            onClick={() => setUserType("OWNER")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              userType === "OWNER"
                ? "bg-white text-slate-900 shadow-md shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4 text-teal-600" />
            <span>건물 소유주 (공실 해결)</span>
          </button>
          <button
            onClick={() => setUserType("INVESTOR")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              userType === "INVESTOR"
                ? "bg-white text-slate-900 shadow-md shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>임차/매수 창업자 (타당성 검증)</span>
          </button>
        </div>
      </div>

      {/* ── 2. 주소 입력 & 마이프차형 상권/공공데이터 진단 ──────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-100 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-teal-500 text-white font-black text-sm flex items-center justify-center">
            01
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            주소 입력 & AI 공공데이터 상권 스캔
          </h2>
        </div>

        {/* 주소 칩 선택 */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {PRESET_ADDRESSES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsCustomAddress(false);
                setSelectedAddress(preset.address);
                handleStartScan();
              }}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                !isCustomAddress && selectedAddress === preset.address
                  ? "bg-teal-50 text-teal-700 border-2 border-teal-500 shadow-sm"
                  : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-150"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {preset.label}
              </span>
            </button>
          ))}
          <button
            onClick={() => setIsCustomAddress(true)}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              isCustomAddress
                ? "bg-teal-50 text-teal-700 border-2 border-teal-500 shadow-sm"
                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-150"
            }`}
          >
            + 직접 주소 입력
          </button>
        </div>

        {/* 직접 주소 입력 창 */}
        {isCustomAddress && (
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="도로명 또는 지번 주소 입력 (예: 서울 강남구 테헤란로 152)"
              value={customAddressInput}
              onChange={(e) => setCustomAddressInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
            <button
              onClick={handleStartScan}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              AI 진단 실행
            </button>
          </div>
        )}

        {/* AI 진단 리포트 */}
        {scanState === "SCANNING" ? (
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center gap-4 text-slate-600">
            <div className="w-6 h-6 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold">
              국토교통부 건축물대장, 법원 등기부, 마이프차 상권 빅데이터를 실시간 동기화 중입니다...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>건축물대장 인허가</span>
              </div>
              <div className="text-base font-black text-slate-900">제2종 근생 (적합)</div>
              <div className="text-xs text-slate-500 mt-1">위반건축물 없음 / 정화조·주차 통과 [Green Pass]</div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>대법원 등기 안전도</span>
              </div>
              <div className="text-base font-black text-slate-900">근저당 18.5% (안전)</div>
              <div className="text-xs text-slate-500 mt-1">소유권 제한/가압류 없음 / 담보 대출 여력 충분</div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                <span>마이프차형 배후 상권</span>
              </div>
              <div className="text-base font-black text-slate-900">1인 가구 64.2% (밀집)</div>
              <div className="text-xs text-slate-500 mt-1">2040 청년 18,200명 거주 / 경쟁사 가동률 93% 포화</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>공실 방치 손실 시계</span>
              </div>
              <div className="text-base font-black text-amber-900">- 185만 원 / 월 증발</div>
              <div className="text-xs text-slate-500 mt-1">관리비·이자 일 6.2만 원 손실 ➔ 전환 시 즉시 흑자</div>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. 층별 공간 믹스 & 추천 프랜차이즈 선택 ──────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-100 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-teal-500 text-white font-black text-sm flex items-center justify-center">
            02
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            층별 공간 믹스 & 최적 프랜차이즈 매칭
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {floors.map((floor) => (
            <div
              key={floor.id}
              className={`p-5 rounded-2xl border-2 transition-all ${
                floor.enabled ? "bg-white border-teal-500 shadow-md" : "bg-slate-50 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={floor.enabled}
                    onChange={() => toggleFloor(floor.id)}
                    className="w-5 h-5 rounded accent-teal-600 cursor-pointer"
                  />
                  <span className="font-black text-slate-900 text-base">{floor.floorName}</span>
                </label>

                {floor.enabled && (
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => updateFloorArea(floor.id, -5)}
                      className="px-2.5 py-1 bg-white rounded-lg text-xs font-black shadow-sm"
                    >
                      -5
                    </button>
                    <span className="px-3 text-xs font-black text-slate-900">{floor.area}평</span>
                    <button
                      onClick={() => updateFloorArea(floor.id, 5)}
                      className="px-2.5 py-1 bg-white rounded-lg text-xs font-black shadow-sm"
                    >
                      +5
                    </button>
                  </div>
                )}
              </div>

              {floor.enabled && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateFloorCategory(floor.id, "BOXFUL")}
                    className={`relative p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      floor.category === "BOXFUL"
                        ? "bg-teal-50 border-teal-500 text-teal-800 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded-md">
                      추천 1위
                    </span>
                    <span>📦 박스풀 무인창고</span>
                  </button>

                  <button
                    onClick={() => updateFloorCategory(floor.id, "SALON")}
                    className={`relative p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      floor.category === "SALON"
                        ? "bg-teal-50 border-teal-500 text-teal-800 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded-md">
                      임대 프리셋
                    </span>
                    <span>✂️ 공유 미용실/살롱</span>
                  </button>

                  <button
                    onClick={() => updateFloorCategory(floor.id, "CAFE")}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      floor.category === "CAFE"
                        ? "bg-teal-50 border-teal-500 text-teal-800 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>☕ 무인 로봇카페</span>
                  </button>

                  <button
                    onClick={() => updateFloorCategory(floor.id, "STUDY")}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      floor.category === "STUDY"
                        ? "bg-teal-50 border-teal-500 text-teal-800 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>📖 스터디/방음룸</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. 4대 모듈형 선택제 (À la Carte) ────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-100 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-teal-500 text-white font-black text-sm flex items-center justify-center">
            03
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            레고형 모듈 선택 (가맹비·브랜드·시공 자유 선택)
          </h2>
        </div>

        <div className="space-y-6">
          {/* 모듈 A: 운영 브랜드 */}
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
              모듈 A. 운영 브랜드 & 지원 모델
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setBrandMode("FRANCHISE")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  brandMode === "FRANCHISE"
                    ? "bg-teal-50/50 border-teal-500 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-black text-slate-900 text-base mb-1">
                  🥇 풀 프랜차이즈 (BOXFUL Partner)
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  • 박스풀 간판 및 전국 70호점 통합 앱 공식 입점<br />
                  • 24시간 본사 CS 상담 및 마케팅 전액 대행<br />
                  • 초기 가맹비: 500만 원 (가맹예치금 프로모션)
                </div>
              </div>

              <div
                onClick={() => setBrandMode("TECH_ONLY")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  brandMode === "TECH_ONLY"
                    ? "bg-teal-50/50 border-teal-500 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-black text-slate-900 text-base mb-1">
                  🥈 화이트라벨 기술 솔루션 (Tech Only)
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  • <strong className="text-teal-700">가맹비 0원 전액 면제!</strong> 자체 브랜드 사용<br />
                  • 0.2초 3D 안면인식 + 무인 IoT 관제 기술만 납품<br />
                  • 호실당 월 저렴한 정액 클라우드 구독료
                </div>
              </div>
            </div>
          </div>

          {/* 모듈 B: 시공 방식 */}
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
              모듈 B. 인테리어 & 하드웨어 시공
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setInteriorMode("TURNKEY")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  interiorMode === "TURNKEY"
                    ? "bg-teal-50/50 border-teal-500 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-black text-slate-900 text-base mb-1">
                  🔨 본사 직소싱 턴키 시공 (-40% 절감)
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  • 1.5T 고장력 아연도금강판 공장 직소싱 제작<br />
                  • 설계부터 소방·전기·오픈까지 <strong>49일 턴키 보증</strong>
                </div>
              </div>

              <div
                onClick={() => setInteriorMode("SELF")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  interiorMode === "SELF"
                    ? "bg-teal-50/50 border-teal-500 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-black text-slate-900 text-base mb-1">
                  📐 건물주 자체 시공 (하드웨어만 구매)
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  • 기존 신뢰하는 자체 인테리어 업체를 쓰고 싶은 경우<br />
                  • 박스풀 IoT 메인보드 및 도어락 키트만 현장 납품
                </div>
              </div>
            </div>
          </div>

          {/* 모듈 C: IoT 하드웨어 옵션 */}
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
              모듈 C. 스마트 빌딩 관리 기술 (IoT 패키지)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setIotFace(!iotFace)}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  iotFace ? "bg-teal-50/60 border-teal-500" : "bg-slate-50 border-slate-200"
                }`}
              >
                <input type="checkbox" checked={iotFace} readOnly className="w-4 h-4 accent-teal-600" />
                <div>
                  <div className="text-xs font-black text-slate-900">0.2초 3D AI 안면인식기</div>
                  <div className="text-[11px] text-slate-500">실물 카드 없는 모바일 프리패스 (+350만)</div>
                </div>
              </label>

              <label
                onClick={() => setIotHvac(!iotHvac)}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  iotHvac ? "bg-teal-50/60 border-teal-500" : "bg-slate-50 border-slate-200"
                }`}
              >
                <input type="checkbox" checked={iotHvac} readOnly className="w-4 h-4 accent-teal-600" />
                <div>
                  <div className="text-xs font-black text-slate-900">원격 항온항습 / 공조 스마트 제어</div>
                  <div className="text-[11px] text-slate-500">곰팡이·결로 원천 차단 센서 (+220만)</div>
                </div>
              </label>

              <label
                onClick={() => setIotSensor(!iotSensor)}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  iotSensor ? "bg-teal-50/60 border-teal-500" : "bg-slate-50 border-slate-200"
                }`}
              >
                <input type="checkbox" checked={iotSensor} readOnly className="w-4 h-4 accent-teal-600" />
                <div>
                  <div className="text-xs font-black text-slate-900">24/7 화재/침수/정전 센서</div>
                  <div className="text-[11px] text-slate-500">이상 징후 발생 시 관제실 알람 (+120만)</div>
                </div>
              </label>

              <label
                onClick={() => setIotCloud(!iotCloud)}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  iotCloud ? "bg-teal-50/60 border-teal-500" : "bg-slate-50 border-slate-200"
                }`}
              >
                <input type="checkbox" checked={iotCloud} readOnly className="w-4 h-4 accent-teal-600" />
                <div>
                  <div className="text-xs font-black text-slate-900">무인 과금 / 출입 클라우드 어드민</div>
                  <div className="text-[11px] text-slate-500">앱 예약, 연장, 자동 정산 파이프라인</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. 실시간 정찰제 견적서 & ROI 계산기 ─────────────────────── */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-black tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Real-Time Fixed Quote</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              테슬라식 실시간 정찰제 견적서
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              옵션을 변경하는 즉시 0.1초 만에 투명하게 재계산됩니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 px-2">가동률:</span>
            {[70, 85, 95].map((rate) => (
              <button
                key={rate}
                onClick={() => setOccupancyRate(rate)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  occupancyRate === rate
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {rate}% {rate === 70 ? "(초기)" : rate === 85 ? "(안정)" : "(만실)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 견적 내역 */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex justify-between text-sm text-slate-300">
                <span>초기 하드웨어 & 시공 공급가:</span>
                <span className="font-bold text-white">
                  {((calculation.totalSetupCost - calculation.franchiseFee - calculation.iotTotal) / 10000).toLocaleString()}만 원
                </span>
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>스마트 IoT 빌딩 관리 패키지:</span>
                <span className="font-bold text-white">
                  {(calculation.iotTotal / 10000).toLocaleString()}만 원
                </span>
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>초기 가맹비:</span>
                <span className={`font-bold ${brandMode === "TECH_ONLY" ? "text-teal-400" : "text-white"}`}>
                  {brandMode === "TECH_ONLY"
                    ? "0원 (가맹비 전액 면제)"
                    : `${(calculation.franchiseFee / 10000).toLocaleString()}만 원`}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-baseline justify-between">
              <span className="text-base font-bold text-slate-200">총 셋업 투자금 (VAT 별도):</span>
              <span className="text-3xl font-black text-teal-400">
                {(calculation.totalSetupCost / 10000).toLocaleString()}만 원
              </span>
            </div>
          </div>

          {/* ROI 수익 분석 */}
          <div className="space-y-3">
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">월 예상 총 매출 ({occupancyRate}% 가동):</span>
              <span className="text-lg font-black text-blue-400">
                + {(calculation.monthlyRevenue / 10000).toLocaleString()}만 원
              </span>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">월 총 운영비 (전기·공조·로열티/구독료):</span>
              <span className="text-lg font-black text-rose-400">
                - {(calculation.monthlyOperatingCost / 10000).toLocaleString()}만 원
              </span>
            </div>

            <div className="bg-teal-950/40 border border-teal-500/40 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  월 세전 순현금흐름 (순수익)
                </span>
                <span className="text-2xl sm:text-3xl font-black text-teal-400">
                  {(calculation.monthlyNetProfit / 10000).toLocaleString()}만 원 / 월
                </span>
              </div>
              <div className="text-xs text-slate-300 pt-2 border-t border-teal-500/20 flex justify-between">
                <span>
                  연 환산 수익률: <strong className="text-white">{calculation.annualRoi}%</strong>
                </span>
                <span>
                  원금 전액 회수: <strong className="text-white">{calculation.paybackMonths}개월</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 버튼 바 */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-base font-black text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" />
              <span>영업사원 전화 압박 없는 100% 무인 계약</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              확정된 데이터 그대로 48시간 내 본사 전문 실측팀 슬롯을 선점하세요. (미진행 시 <strong>100% 전액 환불</strong> 보증)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setTenancyKitModalOpen(true)}
              className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 whitespace-nowrap"
            >
              📄 임대 유치 스펙 키트 출력
            </button>
            <button
              onClick={() => setContractModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-black transition-all shadow-lg shadow-teal-500/30 whitespace-nowrap flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>₩1,000,000 결제하고 실측 슬롯 선점하기</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 모달: 테슬라식 가계약 ──────────────────────────────────── */}
      {contractModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-900 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setContractModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              🚗 테슬라식 온라인 가계약 및 실측 슬롯 선점
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              영업사원 미팅 없이 대표님께서 직접 설정하신 견적서가 본사 관제 시스템에 즉시 등록됩니다.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 border border-slate-200 mb-4">
              <div>
                <span className="text-slate-500">지정 주소:</span>{" "}
                <strong className="text-slate-900">{currentAddressText}</strong>
              </div>
              <div>
                <span className="text-slate-500">운영 모드:</span>{" "}
                <strong className="text-slate-900">
                  {brandMode === "FRANCHISE" ? "풀 프랜차이즈 (BOXFUL 간판)" : "화이트라벨 빌딩 관리 기술 (가맹비 0원)"}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">시공 방식:</span>{" "}
                <strong className="text-slate-900">
                  {interiorMode === "TURNKEY" ? "본사 1.5T 직소싱 턴키" : "건물주 자체 시공"}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">예상 총 셋업비:</span>{" "}
                <strong className="text-teal-700">
                  {(calculation.totalSetupCost / 10000).toLocaleString()}만 원
                </strong>
              </div>
              <div>
                <span className="text-slate-500">월 예상 순익:</span>{" "}
                <strong className="text-slate-900">
                  {(calculation.monthlyNetProfit / 10000).toLocaleString()}만 원 ({calculation.paybackMonths}개월 회수)
                </strong>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed mb-6 bg-amber-50 p-3 rounded-xl border border-amber-200">
              • 가계약 예치금: <strong className="text-amber-800">1,000,000원</strong> (최종 공사비에서 100% 공제)<br />
              • 현장 실측 후 마음에 들지 않으실 경우, <strong>즉시 100% 위약금 없이 전액 환불</strong>됩니다.
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setContractModalOpen(false)}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert("온라인 가계약 슬롯 예약이 접수되었습니다! 본사 기술팀이 48시간 내 현장 레이저 실측을 위해 연락드립니다.");
                  setContractModalOpen(false);
                }}
                className="flex-2 py-3.5 bg-teal-500 hover:bg-teal-400 rounded-xl text-sm font-black text-slate-950 transition-colors shadow-md shadow-teal-500/20"
              >
                100만 원 간편 결제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 모달: 임대 유치 스펙 키트 ────────────────────────────── */}
      {tenancyKitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-900 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setTenancyKitModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              📄 공인중개사용 [임대 유치 특화 스펙 키트]
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              인근 부동산 중개업소에 바로 전달하여 세입자를 빠르게 맞이할 수 있는 사전 인테리어 브로슈어입니다.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 border border-slate-200 mb-6">
              <div>
                <span className="text-slate-500">매물 주소:</span>{" "}
                <strong className="text-slate-900">{currentAddressText}</strong>
              </div>
              <div>
                <span className="text-slate-500">사전 시공 인프라:</span>{" "}
                <strong className="text-slate-900">바닥 배수 배관 타공 완료, 전기 승압(20kW), 온수 배관 완료</strong>
              </div>
              <div>
                <span className="text-slate-500">추천 업종:</span>{" "}
                <strong className="text-slate-900">헤어살롱, 뷰티/에스테틱, 무인 필라테스, 1인 스튜디오</strong>
              </div>
              <div>
                <span className="text-slate-500">임차인 혜택:</span>{" "}
                <strong className="text-teal-700">초기 인테리어 공사비 4,000만 원 ➔ 1,500만 원으로 60% 이상 절감</strong>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setTenancyKitModalOpen(false)}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  alert("부동산 전달용 임대 유치 PDF 브로슈어가 생성되었습니다.");
                  setTenancyKitModalOpen(false);
                }}
                className="flex-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-black text-white transition-colors shadow-md shadow-indigo-600/20"
              >
                PDF 브로슈어 다운로드
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
