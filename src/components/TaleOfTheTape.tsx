'use client';

import React, { useState } from 'react';
import { Politician, Matchup } from '../types';
import { 
  AlertTriangle, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Landmark, 
  ShieldCheck, 
  Swords, 
  TrendingUp, 
  Vote, 
  XCircle,
  FileText,
  ExternalLink,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TaleOfTheTapeProps {
  matchup: Matchup;
  fighter1: Politician;
  fighter2: Politician;
}

export const TaleOfTheTape: React.FC<TaleOfTheTapeProps> = ({ matchup, fighter1, fighter2 }) => {
  const [votes1, setVotes1] = useState(matchup.initialVotes.fighter1);
  const [votes2, setVotes2] = useState(matchup.initialVotes.fighter2);
  const [hasVoted, setHasVoted] = useState<'fighter1' | 'fighter2' | null>(null);
  const [showDetailAccordions, setShowDetailAccordions] = useState(false);

  const totalVotes = votes1 + votes2;
  const p1Rate = Math.round((votes1 / totalVotes) * 100);
  const p2Rate = 100 - p1Rate;

  const handleVote = (target: 'fighter1' | 'fighter2') => {
    if (hasVoted) return;
    if (target === 'fighter1') {
      setVotes1((prev) => prev + 1);
      setHasVoted('fighter1');
    } else {
      setVotes2((prev) => prev + 1);
      setHasVoted('fighter2');
    }
  };

  // Stat comparisons
  const statsList = [
    { label: '공약 이행률', key: 'pledgeRate', suffix: '%' },
    { label: '언행 일치도 (내로남불 역산)', key: 'integrity', suffix: '점' },
    { label: '공직·입법 활동력', key: 'activity', suffix: '점' },
    { label: '도덕성 (전과/청렴도)', key: 'cleanliness', suffix: '점' },
    { label: '대중 파급력 (팬덤/화제성)', key: 'influence', suffix: '점' },
  ] as const;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-12">
      {/* Matchup Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-blue-950 px-6 py-4 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1 uppercase">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            {matchup.division}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {matchup.title}
          </h2>
        </div>
        <div className="text-xs text-amber-400 font-medium bg-amber-950/50 border border-amber-800/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>핵심 전선: {matchup.keyIssue}</span>
        </div>
      </div>

      {/* UFC Fighter Face-Off Card */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-6 items-center bg-slate-950/60">
        {/* Fighter 1 (Left Corner) */}
        <div className="md:col-span-3 bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-3 left-3 bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {fighter1.party}
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">OVR</span>
            <span className="text-lg font-black text-amber-400">{fighter1.ovr}</span>
          </div>

          {/* Profile Circle / Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-slate-800 p-1 mb-3 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-black text-3xl text-blue-400 border border-slate-700">
              {fighter1.name[0]}
            </div>
          </div>

          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-0.5">
            "{fighter1.nickname}"
          </span>
          <h3 className="text-2xl font-black text-white">{fighter1.name}</h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{fighter1.currentRole}</p>
        </div>

        {/* VS Badge (Center) */}
        <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-xl shadow-red-600/40 border-2 border-white/20 font-black text-white text-xl italic tracking-tighter">
            VS
          </div>
          <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">
            TALE OF TAPE
          </span>
        </div>

        {/* Fighter 2 (Right Corner) */}
        <div className="md:col-span-3 bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-3 left-3 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {fighter2.party}
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">OVR</span>
            <span className="text-lg font-black text-amber-400">{fighter2.ovr}</span>
          </div>

          {/* Profile Circle / Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-600 to-slate-800 p-1 mb-3 shadow-lg shadow-red-500/20">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-black text-3xl text-red-400 border border-slate-700">
              {fighter2.name[0]}
            </div>
          </div>

          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-0.5">
            "{fighter2.nickname}"
          </span>
          <h3 className="text-2xl font-black text-white">{fighter2.name}</h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{fighter2.currentRole}</p>
        </div>
      </div>

      {/* 🥊 THE TALE OF THE TAPE: 주요 스탯 및 공식 프로필 1:1 대조 */}
      <div className="p-6 border-t border-slate-800">
        <h4 className="text-center text-sm font-black text-slate-300 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
          <Swords className="w-4 h-4 text-red-500" />
          공식 스펙 & 프로필 대조표 (Tale of the Tape)
        </h4>

        <div className="space-y-4">
          {/* 1. 나이 / 생년월일 */}
          <div className="grid grid-cols-7 items-center bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
            <div className="col-span-3 text-right pr-4 font-bold text-slate-200 text-sm">
              {fighter1.details.birth}
            </div>
            <div className="col-span-1 text-center text-xs font-bold text-slate-400 uppercase">
              나이 / 생년
            </div>
            <div className="col-span-3 text-left pl-4 font-bold text-slate-200 text-sm">
              {fighter2.details.birth}
            </div>
          </div>

          {/* 2. 학력 (Education) */}
          <div className="grid grid-cols-7 items-center bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
            <div className="col-span-3 text-right pr-4 text-xs text-slate-300 space-y-0.5">
              {fighter1.details.education.slice(-2).map((edu, idx) => (
                <div key={idx} className="font-semibold">{edu}</div>
              ))}
            </div>
            <div className="col-span-1 text-center flex flex-col items-center justify-center">
              <GraduationCap className="w-4 h-4 text-amber-400 mb-0.5" />
              <span className="text-xs font-bold text-slate-400">학 력</span>
            </div>
            <div className="col-span-3 text-left pl-4 text-xs text-slate-300 space-y-0.5">
              {fighter2.details.education.slice(-2).map((edu, idx) => (
                <div key={idx} className="font-semibold">{edu}</div>
              ))}
            </div>
          </div>

          {/* 3. 부 / 재산 (Wealth) */}
          <div className="grid grid-cols-7 items-center bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
            <div className="col-span-3 text-right pr-4">
              <div className="text-sm font-black text-amber-400">{fighter1.details.wealth.total}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{fighter1.details.wealth.realEstate}</div>
            </div>
            <div className="col-span-1 text-center flex flex-col items-center justify-center">
              <Landmark className="w-4 h-4 text-emerald-400 mb-0.5" />
              <span className="text-xs font-bold text-slate-400">신고 재산</span>
            </div>
            <div className="col-span-3 text-left pl-4">
              <div className="text-sm font-black text-amber-400">{fighter2.details.wealth.total}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{fighter2.details.wealth.realEstate}</div>
            </div>
          </div>

          {/* 4. 범죄경력 (Criminal Record - 핵심 선관위 공보 기준) */}
          <div className="grid grid-cols-7 items-center bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
            <div className="col-span-3 text-right pr-4">
              {fighter1.details.criminalRecord.count === 0 ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 전과 0건 (클린)
                </span>
              ) : (
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400 bg-red-950/60 border border-red-800 px-2.5 py-1 rounded-md">
                    <AlertTriangle className="w-3.5 h-3.5" /> 공식 전과 {fighter1.details.criminalRecord.count}건
                  </span>
                  <div className="text-[11px] text-slate-400">
                    {fighter1.details.criminalRecord.items.map((c) => c.charge).join(', ')}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1 text-center flex flex-col items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-red-400 mb-0.5" />
              <span className="text-xs font-bold text-slate-400">범죄 경력</span>
            </div>
            <div className="col-span-3 text-left pl-4">
              {fighter2.details.criminalRecord.count === 0 ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 전과 0건 (클린)
                </span>
              ) : (
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400 bg-red-950/60 border border-red-800 px-2.5 py-1 rounded-md">
                    <AlertTriangle className="w-3.5 h-3.5" /> 공식 전과 {fighter2.details.criminalRecord.count}건
                  </span>
                  <div className="text-[11px] text-slate-400">
                    {fighter2.details.criminalRecord.items.map((c) => c.charge).join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. 병역 사항 */}
          <div className="grid grid-cols-7 items-center bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
            <div className="col-span-3 text-right pr-4 text-xs font-bold text-slate-300">
              {fighter1.details.military}
            </div>
            <div className="col-span-1 text-center text-xs font-bold text-slate-400">
              병 역
            </div>
            <div className="col-span-3 text-left pl-4 text-xs font-bold text-slate-300">
              {fighter2.details.military}
            </div>
          </div>
        </div>
      </div>

      {/* 📊 6대 육각형 핵심 스탯 바 배틀 */}
      <div className="p-6 bg-slate-950/80 border-t border-slate-800">
        <h4 className="text-center text-sm font-black text-slate-300 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-500" />
          공약 & 내로남불 핵심 능력치 스탯 비교
        </h4>

        <div className="space-y-4 max-w-4xl mx-auto">
          {statsList.map((stat) => {
            const val1 = fighter1.stats[stat.key as keyof typeof fighter1.stats];
            const val2 = fighter2.stats[stat.key as keyof typeof fighter2.stats];
            const p1Advantage = val1 > val2;
            const p2Advantage = val2 > val1;

            return (
              <div key={stat.key} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className={`flex items-center gap-1 ${p1Advantage ? 'text-amber-400 font-black' : 'text-slate-400'}`}>
                    {val1}{stat.suffix} {p1Advantage && '👑'}
                  </span>
                  <span className="text-slate-300 font-semibold">{stat.label}</span>
                  <span className={`flex items-center gap-1 ${p2Advantage ? 'text-amber-400 font-black' : 'text-slate-400'}`}>
                    {p2Advantage && '👑'} {val2}{stat.suffix}
                  </span>
                </div>

                {/* Split Comparative Progress Bar */}
                <div className="grid grid-cols-2 gap-2 h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  {/* Left Fighter Bar (Right Aligned) */}
                  <div className="flex justify-end">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        p1Advantage ? 'bg-gradient-to-l from-blue-500 to-amber-400' : 'bg-blue-600/70'
                      }`}
                      style={{ width: `${val1}%` }}
                    />
                  </div>
                  {/* Right Fighter Bar (Left Aligned) */}
                  <div className="flex justify-start">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        p2Advantage ? 'bg-gradient-to-r from-red-500 to-amber-400' : 'bg-red-600/70'
                      }`}
                      style={{ width: `${val2}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ⚖️ 장점 VS 단점/리스크 요약 배틀 */}
      <div className="p-6 border-t border-slate-800 bg-slate-900/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fighter 1 Pros & Cons */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <h5 className="font-black text-blue-400 text-sm mb-3 flex items-center justify-between">
              <span>{fighter1.name}의 강점과 약점</span>
              <span className="text-xs text-slate-500">유권자 심층 분석</span>
            </h5>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 핵심 강점
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                  {fighter1.details.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <span className="font-bold text-red-400 flex items-center gap-1 mb-1">
                  <XCircle className="w-3.5 h-3.5" /> 리스크 & 단점
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                  {fighter1.details.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Fighter 2 Pros & Cons */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <h5 className="font-black text-red-400 text-sm mb-3 flex items-center justify-between">
              <span>{fighter2.name}의 강점과 약점</span>
              <span className="text-xs text-slate-500">유권자 심층 분석</span>
            </h5>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 핵심 강점
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                  {fighter2.details.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <span className="font-bold text-red-400 flex items-center gap-1 mb-1">
                  <XCircle className="w-3.5 h-3.5" /> 리스크 & 단점
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                  {fighter2.details.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 💥 [시그니처] 내로남불 박제관 (1:1 말바꾸기 & 언행불일치 대조) */}
      <div className="p-6 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h4 className="text-base font-black text-white flex items-center gap-2">
              대표 내로남불 박제관 <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800">과거 VS 현재</span>
            </h4>
          </div>
          <span className="text-xs text-slate-400">공식 기사 및 국회 의사록 팩트체크 기반</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fighter 1 Flip Flop */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-400">{fighter1.name}의 말바꾸기 사례</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  {fighter1.signatureFlipFlop.category}
                </span>
              </div>
              <h5 className="font-extrabold text-slate-100 text-sm mb-3">
                {fighter1.signatureFlipFlop.title}
              </h5>

              <div className="space-y-2 text-xs">
                {/* Past */}
                <div className="bg-slate-950/70 p-3 rounded-lg border-l-2 border-emerald-500">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-emerald-400">과거 입장 ({fighter1.signatureFlipFlop.past.year})</span>
                    <span className="truncate max-w-[150px]">{fighter1.signatureFlipFlop.past.source}</span>
                  </div>
                  <p className="italic text-slate-200">
                    {fighter1.signatureFlipFlop.past.quote}
                  </p>
                </div>

                {/* Current */}
                <div className="bg-slate-950/70 p-3 rounded-lg border-l-2 border-red-500">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-red-400">현재 행보 ({fighter1.signatureFlipFlop.current.year})</span>
                    <span className="truncate max-w-[150px]">{fighter1.signatureFlipFlop.current.source}</span>
                  </div>
                  <p className="italic text-slate-200">
                    {fighter1.signatureFlipFlop.current.quote}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
              💡 <span className="font-semibold text-slate-300">팩트 분석:</span> {fighter1.signatureFlipFlop.analysis}
            </p>
          </div>

          {/* Fighter 2 Flip Flop */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-400">{fighter2.name}의 말바꾸기 사례</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  {fighter2.signatureFlipFlop.category}
                </span>
              </div>
              <h5 className="font-extrabold text-slate-100 text-sm mb-3">
                {fighter2.signatureFlipFlop.title}
              </h5>

              <div className="space-y-2 text-xs">
                {/* Past */}
                <div className="bg-slate-950/70 p-3 rounded-lg border-l-2 border-emerald-500">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-emerald-400">과거 입장 ({fighter2.signatureFlipFlop.past.year})</span>
                    <span className="truncate max-w-[150px]">{fighter2.signatureFlipFlop.past.source}</span>
                  </div>
                  <p className="italic text-slate-200">
                    {fighter2.signatureFlipFlop.past.quote}
                  </p>
                </div>

                {/* Current */}
                <div className="bg-slate-950/70 p-3 rounded-lg border-l-2 border-red-500">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-red-400">현재 행보 ({fighter2.signatureFlipFlop.current.year})</span>
                    <span className="truncate max-w-[150px]">{fighter2.signatureFlipFlop.current.source}</span>
                  </div>
                  <p className="italic text-slate-200">
                    {fighter2.signatureFlipFlop.current.quote}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
              💡 <span className="font-semibold text-slate-300">팩트 분석:</span> {fighter2.signatureFlipFlop.analysis}
            </p>
          </div>
        </div>
      </div>

      {/* 🗳️ 유권자 실시간 판정 투표소 (Voter Judgement Poll) */}
      <div className="p-6 border-t border-slate-800 bg-slate-950">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Vote className="w-3.5 h-3.5" />
            유권자 실시간 판정 투표
          </div>
          <h4 className="text-xl font-black text-white mb-1">
            "팩트와 스탯을 고려할 때, 이 매치업의 판정승은 누구입니까?"
          </h4>
          <p className="text-xs text-slate-400 mb-6">
            현재까지 총 <span className="text-white font-bold">{totalVotes.toLocaleString()}</span>명의 유권자가 투표에 참여했습니다.
          </p>

          {/* Voting Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => handleVote('fighter1')}
              disabled={hasVoted !== null}
              className={`py-3.5 px-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 border ${
                hasVoted === 'fighter1'
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 ring-2 ring-blue-400'
                  : hasVoted !== null
                  ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600/90 hover:bg-blue-600 border-blue-500 text-white shadow-md hover:scale-[1.02]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{fighter1.name} 판정승 ({p1Rate}%)</span>
            </button>

            <button
              onClick={() => handleVote('fighter2')}
              disabled={hasVoted !== null}
              className={`py-3.5 px-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 border ${
                hasVoted === 'fighter2'
                  ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-600/40 ring-2 ring-red-400'
                  : hasVoted !== null
                  ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-red-600/90 hover:bg-red-600 border-red-500 text-white shadow-md hover:scale-[1.02]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{fighter2.name} 판정승 ({p2Rate}%)</span>
            </button>
          </div>

          {/* Live Progress Bar */}
          <div className="relative h-4 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
            <div
              className="bg-blue-600 h-full transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-black text-white"
              style={{ width: `${p1Rate}%` }}
            >
              {p1Rate > 15 && `${p1Rate}%`}
            </div>
            <div
              className="bg-red-600 h-full transition-all duration-500 flex items-center justify-start pl-2 text-[10px] font-black text-white"
              style={{ width: `${p2Rate}%` }}
            >
              {p2Rate > 15 && `${p2Rate}%`}
            </div>
          </div>
          {hasVoted && (
            <p className="text-xs text-emerald-400 mt-2 font-medium flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 투표가 실시간 반영되었습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
