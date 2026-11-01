'use client';

import React, { useState } from 'react';
import { Politician } from '../types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  GraduationCap, 
  Landmark, 
  ShieldCheck, 
  SlidersHorizontal, 
  Sparkles, 
  TrendingUp 
} from 'lucide-react';

interface AllFightersViewProps {
  politicians: Record<string, Politician>;
}

export const AllFightersView: React.FC<AllFightersViewProps> = ({ politicians }) => {
  const [filterParty, setFilterParty] = useState<string>('ALL');
  const [filterWeight, setFilterWeight] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'ovr' | 'pledge' | 'integrity' | 'cleanliness'>('ovr');

  const list = Object.values(politicians);

  const filtered = list.filter((p) => {
    if (filterParty !== 'ALL' && p.party !== filterParty) return false;
    if (filterWeight !== 'ALL' && p.weightClass !== filterWeight) return false;
    return true;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'ovr') return b.ovr - a.ovr;
    if (sortBy === 'pledge') return b.stats.pledgeRate - a.stats.pledgeRate;
    if (sortBy === 'integrity') return b.stats.integrity - a.stats.integrity;
    if (sortBy === 'cleanliness') return b.stats.cleanliness - a.stats.cleanliness;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Filter and Sort Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Weight Class Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">체급:</span>
          <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {['ALL', 'HEAVY', 'WELTER'].map((w) => (
              <button
                key={w}
                onClick={() => setFilterWeight(w)}
                className={`px-3 py-1 rounded font-bold transition-all ${
                  filterWeight === w ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {w === 'ALL' ? '전체 체급' : w === 'HEAVY' ? '헤비급 (거물)' : '웰터급 (청년)'}
              </button>
            ))}
          </div>
        </div>

        {/* Party Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">정당:</span>
          <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {['ALL', '더불어민주당', '국민의힘', '조국혁신당', '개혁신당'].map((party) => (
              <button
                key={party}
                onClick={() => setFilterParty(party)}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  filterParty === party ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {party === 'ALL' ? '전체 정당' : party}
              </button>
            ))}
          </div>
        </div>

        {/* Sort by */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-400">정렬 기준:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1 font-semibold focus:outline-none focus:border-amber-500"
          >
            <option value="ovr">종합 전투력 (OVR) 높은순</option>
            <option value="pledge">공약 이행률 높은순</option>
            <option value="integrity">언행 일치도 높은순</option>
            <option value="cleanliness">도덕/준법 스탯 높은순</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-xl hover:shadow-2xl relative flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {p.party} • {p.weightClass === 'HEAVY' ? '헤비급' : '웰터급'}
                </span>
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 px-2.5 py-0.5 rounded-md font-black text-sm shadow-md">
                  <span>OVR</span>
                  <span className="text-base">{p.ovr}</span>
                </div>
              </div>

              {/* Politician Identity */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-black text-xl text-slate-200 shadow-inner">
                  {p.name[0]}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-400">"{p.nickname}"</span>
                  <h3 className="text-xl font-black text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{p.currentRole}</p>
                </div>
              </div>

              {/* Quick Spec Tags */}
              <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5 text-emerald-400" /> 재산
                  </span>
                  <span className="font-bold text-amber-400">{p.details.wealth.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-400" /> 범죄경력
                  </span>
                  {p.details.criminalRecord.count === 0 ? (
                    <span className="text-emerald-400 font-bold">전과 0건 (클린)</span>
                  ) : (
                    <span className="text-red-400 font-bold">전과 {p.details.criminalRecord.count}건</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" /> 최종학력
                  </span>
                  <span className="text-slate-200 truncate max-w-[170px]">
                    {p.details.education[p.details.education.length - 1]}
                  </span>
                </div>
              </div>

              {/* Stats Bar Breakdown */}
              <div className="space-y-2 text-xs mb-4">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-0.5">
                    <span>공약 이행률</span>
                    <span className="text-amber-400 font-bold">{p.stats.pledgeRate}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${p.stats.pledgeRate}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-0.5">
                    <span>언행 일치도 (내로남불 역산)</span>
                    <span className="text-sky-400 font-bold">{p.stats.integrity}점</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${p.stats.integrity}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-0.5">
                    <span>도덕성 / 준법 스탯</span>
                    <span className="text-emerald-400 font-bold">{p.stats.cleanliness}점</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.stats.cleanliness}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Strengths Highlights */}
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
              <span className="text-amber-400 font-bold block mb-1">대표 내로남불 사례:</span>
              <p className="line-clamp-2 italic text-slate-300">
                "{p.signatureFlipFlop.title}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
