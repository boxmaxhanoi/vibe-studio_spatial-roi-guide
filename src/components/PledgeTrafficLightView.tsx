'use client';

import React, { useState } from 'react';
import { Politician } from '../types';
import { CheckCircle2, Clock, Scale, XCircle, Search, Filter } from 'lucide-react';

interface PledgeTrafficLightViewProps {
  politicians: Record<string, Politician>;
}

export const PledgeTrafficLightView: React.FC<PledgeTrafficLightViewProps> = ({ politicians }) => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'completed' | 'ongoing' | 'broken'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const list = Object.values(politicians);

  // Flatten all pledges with politician name
  const allPledges = list.flatMap((p) =>
    p.pledges.items.map((item) => ({
      ...item,
      politicianName: p.name,
      party: p.party,
      role: p.currentRole,
    }))
  );

  const filteredPledges = allPledges.filter((item) => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (
      searchQuery &&
      !item.title.includes(searchQuery) &&
      !item.politicianName.includes(searchQuery) &&
      !item.category.includes(searchQuery)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-blue-950/60 border border-emerald-900/40 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Scale className="w-4 h-4" />
          공약 신호등 (Pledge Traffic Light)
        </div>
        <h2 className="text-2xl font-black text-white mb-2">
          정치인 공약 이행률 실시간 신호등 추적소
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          선거 때마다 쏟아지는 수많은 공약 중 과연 얼마나 실제로 지켜졌을까요?
          한국매니페스토실천본부 및 국회 의정보고 팩트체크를 기반으로 이행 완료(🟢), 정상 추진(🟡), 파기/지연(🔴)을
          투명하게 공개합니다.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="공약명 또는 정치인 이름 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Traffic Light Filter Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'ALL' ? 'bg-slate-700 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            전체 ({allPledges.length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              statusFilter === 'completed'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            이행 완료
          </button>
          <button
            onClick={() => setStatusFilter('ongoing')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              statusFilter === 'ongoing'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            정상 추진중
          </button>
          <button
            onClick={() => setStatusFilter('broken')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              statusFilter === 'broken'
                ? 'bg-red-600 text-white'
                : 'bg-red-950/60 text-red-400 border border-red-800/60'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            공약 파기 / 표류
          </button>
        </div>
      </div>

      {/* Pledges List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPledges.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Meta */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="text-amber-400">{item.politicianName}</span>
                  <span className="text-[10px] text-slate-500">({item.party})</span>
                </span>
                <span
                  className={`text-[11px] font-black px-2 py-0.5 rounded flex items-center gap-1 ${
                    item.status === 'completed'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : item.status === 'ongoing'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-red-950 text-red-400 border border-red-800'
                  }`}
                >
                  {item.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                  {item.status === 'ongoing' && <Clock className="w-3 h-3" />}
                  {item.status === 'broken' && <XCircle className="w-3 h-3" />}
                  {item.status === 'completed' ? '이행 완료' : item.status === 'ongoing' ? '추진 중' : '공약 파기/지연'}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-extrabold text-white mb-2 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mb-4">{item.description}</p>
            </div>

            <div>
              {/* Progress Bar */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>진척도</span>
                  <span className="text-slate-200 font-bold">{item.achievementRate}%</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.status === 'completed'
                        ? 'bg-emerald-500'
                        : item.status === 'ongoing'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${item.achievementRate}%` }}
                  />
                </div>
              </div>

              {/* Source */}
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span>분야: {item.category}</span>
                <span>출처: {item.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
