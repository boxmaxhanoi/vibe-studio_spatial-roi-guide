'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { TaleOfTheTape } from '../components/TaleOfTheTape';
import { AllFightersView } from '../components/AllFightersView';
import { FlipFlopsTimelineView } from '../components/FlipFlopsTimelineView';
import { PledgeTrafficLightView } from '../components/PledgeTrafficLightView';
import { BusinessOwnersManifesto } from '../components/BusinessOwnersManifesto';
import { POLITICIANS } from '../data/politicians';
import { MATCHUPS } from '../data/matchups';
import { 
  Flame, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Swords, 
  Trophy, 
  CheckCircle2, 
  AlertCircle,
  Megaphone
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'matchups' | 'all-fighters' | 'flip-flops' | 'pledges' | 'manifesto'>('matchups');
  const [selectedMatchupId, setSelectedMatchupId] = useState<string>('heavyweight-main');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Form State
  const [reportTarget, setReportTarget] = useState('');
  const [reportPast, setReportPast] = useState('');
  const [reportCurrent, setReportCurrent] = useState('');
  const [reportSource, setReportSource] = useState('');

  const currentMatchup = MATCHUPS.find((m) => m.id === selectedMatchupId) || MATCHUPS[0];
  const fighter1 = POLITICIANS[currentMatchup.fighter1Id];
  const fighter2 = POLITICIANS[currentMatchup.fighter2Id];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSubmitted(false);
      setReportTarget('');
      setReportPast('');
      setReportCurrent('');
      setReportSource('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        {/* Global Navigation Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800 text-red-400 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              시민 참여형 정치인 팩트 배틀 & 내로남불 검증 아카이브
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              말 따로, 행동 따로? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-blue-500">
                체급별 적수 맞짱 & 팩트 스탯
              </span>
              으로 판정한다!
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              학력, 재산, 공식 전과 기록부터 공약 이행률과 언행 불일치(내로남불) 지수까지!
              진영 논리를 벗어나 오직 <strong>공식 선관위 공보와 국회 의사록 팩트</strong>로 유권자의 눈을 밝힙니다.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab('matchups')}
                className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Swords className="w-4 h-4" />
                <span>체급별 라이벌전 직관</span>
              </button>

              <button
                onClick={() => setActiveTab('manifesto')}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Megaphone className="w-4 h-4" />
                <span>자영업자·대표자 총궐기 선언</span>
              </button>

              <button
                onClick={() => setReportModalOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>새로운 내로남불 제보</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {activeTab === 'matchups' && (
            <div>
              {/* Matchup Selection Cards */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    LIVE 파이트 나이트 매치업 선택
                  </h3>
                  <span className="text-xs text-slate-500">총 3개 체급 빅매치 편성</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MATCHUPS.map((m) => {
                    const isSelected = m.id === selectedMatchupId;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMatchupId(m.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                          {m.division}
                        </span>
                        <div className="text-base font-black text-white mb-1 flex items-center justify-between">
                          <span>{m.title}</span>
                          {isSelected && <span className="text-xs text-amber-400">🔥 선택됨</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {m.keyIssue}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* The Tale of the Tape Showcase */}
              <TaleOfTheTape
                matchup={currentMatchup}
                fighter1={fighter1}
                fighter2={fighter2}
              />

              {/* 📢 메인 디스플레이 아래쪽: 자영업자 / 법인 대표자 / 관리자 총궐기 연대 선언문 */}
              <BusinessOwnersManifesto />
            </div>
          )}

          {activeTab === 'all-fighters' && (
            <AllFightersView politicians={POLITICIANS} />
          )}

          {activeTab === 'flip-flops' && (
            <FlipFlopsTimelineView politicians={POLITICIANS} />
          )}

          {activeTab === 'pledges' && (
            <PledgeTrafficLightView politicians={POLITICIANS} />
          )}

          {activeTab === 'manifesto' && (
            <BusinessOwnersManifesto />
          )}
        </main>
      </div>

      {/* Citizen Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              시민 크라우드소싱 팩트체크
            </div>
            <h3 className="text-xl font-black text-white mb-2">
              정치인 내로남불 사례 제보하기
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              정치인의 과거 발언과 현재 정반대의 행보, 또는 파기된 공약을 제보해 주시면
              팩트 검증팀이 공식 회의록 및 기사를 확인 후 업데이트합니다.
            </p>

            {reportSubmitted ? (
              <div className="bg-emerald-950/60 border border-emerald-800 p-6 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">제보가 정상 접수되었습니다!</h4>
                <p className="text-xs text-slate-300">
                  투명하고 깨끗한 정치를 위한 시민 여러분의 참여에 감사드립니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    정치인 이름 및 소속 정당 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 홍길동 (국민의힘 또는 더불어민주당)"
                    value={reportTarget}
                    onChange={(e) => setReportTarget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    과거 발언 및 입장 (언제, 무슨 말을 했는가?) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="예: 2021년 당시 '국회의원 불체포특권은 즉각 폐지해야 마땅하다'고 공언함"
                    value={reportPast}
                    onChange={(e) => setReportPast(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    현재 행보 및 말바꾸기 (현재 어떻게 입장을 뒤집었는가?) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="예: 2023년 본인 체포동의안 표결에서는 부결을 당론으로 호소함"
                    value={reportCurrent}
                    onChange={(e) => setReportCurrent(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    증거 출처 링크 (언론 보도 URL, 국회 회의록, 유튜브 영상 타임스탬프) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={reportSource}
                    onChange={(e) => setReportSource(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black py-2.5 rounded-xl shadow-lg transition-all"
                  >
                    제보 제출하기 (팩트체크 검토 요청)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Global Transparency Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 font-black text-sm">
              <span>내로남불 (NAERONAMBUL) 아카이브</span>
              <span className="text-red-500 font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-red-950/80 border border-red-800/60">
                Non-Partisan
              </span>
            </div>
            <p className="text-slate-500">
              본 플랫폼은 특정 정당이나 정치인을 지지하거나 비방하지 않으며,
              헌법 제1조 2항의 유권자 주권 실현과 대한민국 자영업자·기업인의 정당한 권익을 위해 운영됩니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>데이터 출처: 중앙선거관리위원회 • 대한민국 국회 • 한국매니페스토실천본부</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
