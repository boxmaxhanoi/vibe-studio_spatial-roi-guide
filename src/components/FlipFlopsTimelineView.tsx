'use client';

import React, { useState } from 'react';
import { Politician } from '../types';
import { AlertCircle, ArrowRight, ExternalLink, Filter, Quote, Search, ShieldAlert } from 'lucide-react';

interface FlipFlopsTimelineViewProps {
  politicians: Record<string, Politician>;
}

export const FlipFlopsTimelineView: React.FC<FlipFlopsTimelineViewProps> = ({ politicians }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const list = Object.values(politicians);

  const categories = ['ALL', '정치개혁 / 특권폐지', '사법 / 특검', '복지 / 철학', '교육 / 공정', '정당정치 / 합당', '정치개혁 / 공천'];

  const filtered = list.filter((p) => {
    const ff = p.signatureFlipFlop;
    const matchesSearch =
      p.name.includes(searchTerm) ||
      ff.title.includes(searchTerm) ||
      ff.past.quote.includes(searchTerm) ||
      ff.current.quote.includes(searchTerm);
    const matchesCategory = selectedCategory === 'ALL' || ff.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/60 border border-red-900/40 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldAlert className="w-4 h-4" />
          공식 기록 기반 언행 불일치 박제소
        </div>
        <h2 className="text-2xl font-black text-white mb-2">
          "내가 하면 로맨스, 남이 하면 불륜?" 내로남불 타임라인
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          여·야·군소정당을 불문하고 대한민국 대표 정치인들이 과거에 했던 발언과 현재 취하고 있는 정반대의 행보를
          국회 회의록 및 언론 보도 팩트에 근거하여 1:1로 대조·기록합니다.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="정치인 이름 또는 키워드 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-red-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? '전체 분야' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Flip Flop Cards List */}
      <div className="space-y-6">
        {filtered.map((p) => {
          const ff = p.signatureFlipFlop;
          return (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all"
            >
              {/* Card Header */}
              <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-white">
                    {p.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white">{p.name}</h3>
                      <span className="text-xs text-slate-400 font-semibold">({p.party})</span>
                      <span className="text-[11px] bg-red-950/80 text-red-400 border border-red-800/80 font-bold px-2 py-0.5 rounded">
                        {ff.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{p.currentRole}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-medium">언행 일치도 스탯</span>
                  <span className="text-lg font-black text-amber-400">{p.stats.integrity}점</span>
                </div>
              </div>

              {/* Title */}
              <div className="px-6 pt-5 pb-2">
                <h4 className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  {ff.title}
                </h4>
              </div>

              {/* 1:1 Contrast Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Past Card (Green/Teal tone) */}
                <div className="bg-slate-950/90 border border-emerald-900/50 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                  <div>
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-2">
                      <span>[과거 입장] {ff.past.year}</span>
                      <span className="text-slate-400 text-[11px]">{ff.past.role}</span>
                    </div>
                    <blockquote className="text-sm font-semibold text-slate-100 italic mb-3 leading-relaxed">
                      {ff.past.quote}
                    </blockquote>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-300">상황 배경:</span> {ff.past.context}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                    <span>출처: {ff.past.source}</span>
                  </div>
                </div>

                {/* Current Card (Red tone) */}
                <div className="bg-slate-950/90 border border-red-900/50 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
                  <div>
                    <div className="flex items-center justify-between text-xs text-red-400 font-bold mb-2">
                      <span>[현재 행보] {ff.current.year}</span>
                      <span className="text-slate-400 text-[11px]">{ff.current.role}</span>
                    </div>
                    <blockquote className="text-sm font-semibold text-slate-100 italic mb-3 leading-relaxed">
                      {ff.current.quote}
                    </blockquote>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-300">상황 배경:</span> {ff.current.context}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                    <span>출처: {ff.current.source}</span>
                  </div>
                </div>
              </div>

              {/* Neutral Fact-Check Analysis */}
              <div className="px-6 pb-5 pt-2">
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                  <span className="bg-amber-500/20 text-amber-400 font-black px-2 py-0.5 rounded text-[10px] shrink-0 uppercase">
                    팩트 심층 평가
                  </span>
                  <p>{ff.analysis}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
