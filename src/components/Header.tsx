'use client';

import React from 'react';
import { Flame, Megaphone, Scale, ShieldAlert, Swords, Trophy } from 'lucide-react';

interface HeaderProps {
  activeTab: 'matchups' | 'all-fighters' | 'flip-flops' | 'pledges' | 'manifesto';
  setActiveTab: (tab: 'matchups' | 'all-fighters' | 'flip-flops' | 'pledges' | 'manifesto') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-blue-600 px-4 py-1 text-xs font-semibold text-center text-white tracking-wider flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          UFC 스타일 대한민국 정치인 팩트 배틀 & 자영업자·대표자 권익 연대
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">공약 이행률 & 언행 불일치(내로남불) 실시간 추적 아카이브</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col xl:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-500/20 font-black text-xl italic text-white border border-red-400/30">
            내
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                내로남불 <span className="text-red-500 font-extrabold text-sm uppercase px-2 py-0.5 rounded bg-red-950/80 border border-red-800/60">FIGHT NIGHT</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              대한민국 대표 정치인 체급별 스탯 비교 & 공약·언행 불일치 판정소
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center justify-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('matchups')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'matchups'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>체급별 라이벌전</span>
          </button>

          <button
            onClick={() => setActiveTab('all-fighters')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'all-fighters'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>정치인 도감 (OVR)</span>
          </button>

          <button
            onClick={() => setActiveTab('flip-flops')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'flip-flops'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>내로남불 타임라인</span>
          </button>

          <button
            onClick={() => setActiveTab('pledges')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'pledges'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>공약 신호등</span>
          </button>

          {/* 📢 자영업자 / 대표자 연대 선언 Tab */}
          <button
            onClick={() => setActiveTab('manifesto')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-extrabold transition-all border ${
              activeTab === 'manifesto'
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-orange-400 shadow-lg shadow-orange-600/40 animate-pulse'
                : 'text-orange-400 border-orange-500/40 bg-orange-950/40 hover:bg-orange-900/60'
            }`}
          >
            <Megaphone className="w-4 h-4 text-orange-300" />
            <span>자영업자·대표자 연대</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
