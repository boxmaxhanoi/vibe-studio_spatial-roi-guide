'use client';

import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Flame, 
  Megaphone, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  Scale, 
  ArrowRight,
  TrendingDown,
  Building2,
  DollarSign
} from 'lucide-react';

export const BusinessOwnersManifesto: React.FC = () => {
  const [signatureCount, setSignatureCount] = useState(148720);
  const [hasSigned, setHasSigned] = useState(false);
  const [signName, setSignName] = useState('');
  const [signRole, setSignRole] = useState('자영업자 (외식/서비스업)');

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSigned) {
      setSignatureCount((prev) => prev + 1);
      setHasSigned(true);
    }
  };

  const contradictions = [
    {
      title: '실업급여의 기형적 모순',
      tag: '성실 근무자 역차별',
      left: {
        target: '6~7개월 단기 알바 (180일 근무)',
        desc: '근무태만이나 의도적 퇴사 후 실업급여 반복 수급 (세금 파티). 쉬면서 월 180~200만원씩 꼬박꼬박 챙김.',
        badge: '혜택 집중 (도덕적 해이)',
        color: 'text-red-400 bg-red-950/60 border-red-800',
      },
      right: {
        target: '10년~20년 성실 근속자 / 폐업 사장님',
        desc: '묵묵히 세금 내며 일하다 번아웃이나 사정으로 자발적 퇴사하면 실업급여 0원. 빚내서 버티다 폐업한 사장은 빚더미 신용불량자 방치.',
        badge: '지원 0원 (보호 사각지대)',
        color: 'text-amber-400 bg-amber-950/60 border-amber-800',
      },
    },
    {
      title: '고용의 징벌화와 무한 책임 독박',
      tag: '고용주 형사처벌 천국',
      left: {
        target: '짧게 근무하고 나가는 단기 인력',
        desc: '당일 무단결근, 갑작스러운 통보 후 잠적해도 법적 페널티 전무. 노동청 신고 한마디면 사장은 즉시 조사 대상.',
        badge: '책임 0% (무제한 보호)',
        color: 'text-red-400 bg-red-950/60 border-red-800',
      },
      right: {
        target: '일자리를 만들고 유지하는 대표자',
        desc: '최저임금 인상, 주휴수당, 퇴직금, 4대보험에 중대재해처벌법까지 민형사상 책임을 전액 사장이 독박. 고용을 늘릴수록 처벌 위험만 급증.',
        badge: '책임 100% (잠재적 범죄자 취급)',
        color: 'text-amber-400 bg-amber-950/60 border-amber-800',
      },
    },
    {
      title: '표만 노리는 정치권의 노동 포퓰리즘',
      tag: '자영업자 갈라치기',
      left: {
        target: '선거철마다 노동계 눈치 보기',
        desc: '정치인들은 표 계산에만 눈이 멀어 기업인·소상공인을 "착취자" 프레임에 가두고 규제와 감시 법안만 난사.',
        badge: '포퓰리즘 입법 남발',
        color: 'text-red-400 bg-red-950/60 border-red-800',
      },
      right: {
        target: '대한민국 700만 자영업자·대표자',
        desc: '새벽부터 밤까지 피땀 흘려 일자리와 세금을 창출하지만, 정책 입안 테이블에서는 철저히 배제되고 희생양 전락.',
        badge: '생존 벼랑 끝 방치',
        color: 'text-amber-400 bg-amber-950/60 border-amber-800',
      },
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 border-2 border-red-600/40 rounded-3xl p-6 sm:p-10 my-12 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-lg shadow-red-600/30 uppercase tracking-widest mb-4">
          <Megaphone className="w-4 h-4 animate-bounce" />
          자영업자 • 법인 대표자 • 관리자 총궐기 연대 선언
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          "왜 대한민국 정치는 노동자 권리만 외치는가?" <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-orange-400">
            일자리를 만드는 대표자들이여, 이제 일어나라!
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
          짧게 일하고 책임을 안 질수록 온갖 실업급여와 혜택만 늘어나고, <br className="hidden sm:inline" />
          <strong>10년 20년 성실히 일한 근로자는 실업급여 한 푼 못 받으며, 평생 사업을 일구고 고용한 대표는 빚과 처벌 책임만 독박 쓰는 세상!</strong> <br />
          이게 공정입니까? <strong>우리가 깨어나 뭉쳐야만 표만 바라는 정치권이 정신을 차립니다!</strong>
        </p>
      </div>

      {/* 3대 역차별 모순 고발 그리드 */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {contradictions.map((c, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-red-500/60 transition-all shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                  {c.tag}
                </span>
                <span className="text-xs text-slate-500 font-bold">모순 #{idx + 1}</span>
              </div>

              <h3 className="text-lg font-black text-white mb-5">{c.title}</h3>

              {/* Contradiction 1: Left */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-red-900/40 mb-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-red-400">{c.left.target}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                    {c.left.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{c.left.desc}</p>
              </div>

              {/* VS Divider */}
              <div className="text-center my-2 text-xs font-black text-slate-600 uppercase tracking-widest">
                VS 역차별 현실
              </div>

              {/* Contradiction 2: Right */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-900/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400">{c.right.target}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    {c.right.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{c.right.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5대 긴급 정책 개혁 요구안 */}
      <div className="relative z-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-10">
        <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-red-500" />
          정치권에 요구하는 대한민국 사장님·관리자 5대 법 개정안
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <h4 className="font-bold text-white mb-1">실업급여 반복 수급 방지 및 성실 근로자 우대제 전환</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                단기 알바 180일 반복 수급의 세금 낭비를 차단하고, 5~10년 이상 장기 성실 납부자가 자발적 휴식·이직 시에도 혜택을 받도록 개혁.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <h4 className="font-bold text-white mb-1">시대착오적 주휴수당 폐지 및 실제 근무시간 연동</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                세계에서 유례를 찾기 힘든 주휴수당으로 인해 초단기 쪼개기 알바가 양산되는 기형적 고용 시장을 정상화.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <h4 className="font-bold text-white mb-1">고용주 형사처벌 남발 방지 및 중대재해법 비현실 조항 개정</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                모든 산업 현장의 안전 수칙 미준수 책임을 경영자 구속으로만 몰아가는 과잉 형벌주의 탈피, 실질적 예방 시스템 구축.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
              4
            </span>
            <div>
              <h4 className="font-bold text-white mb-1">폐업 자영업자·대표자를 위한 긴급 패자부활 사회안전망 구축</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                고용을 유지하다 부채를 떠안고 폐업한 대표자를 파산과 신용불량자로 방치하지 않고 재기와 전직을 실질적으로 지원.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✊ 사장님·관리자 100만 연대 서명 참여 섹션 */}
      <div className="relative z-10 bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-700/60 rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-2xl">
        <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full mb-3 shadow">
          <Users className="w-3.5 h-3.5" />
          실시간 연대 서명 현황
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">
          현재 <span className="text-amber-400">{signatureCount.toLocaleString()}</span>명의 사장님과 관리자가 뭉쳤습니다!
        </h3>
        <p className="text-xs text-slate-300 mb-6">
          "정치권이 표만 의식해 자영업자와 기업인을 옥죌 때, 우리의 목소리를 하나로 모아야 정치가 바뀝니다."
        </p>

        {hasSigned ? (
          <div className="bg-emerald-950/80 border border-emerald-600 p-5 rounded-xl flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-left">
              <h4 className="font-bold text-white text-sm">연대 서명이 정상 등록되었습니다!</h4>
              <p className="text-xs text-emerald-300">
                대한민국 700만 자영업자와 법인 대표자의 정당한 권리를 지키는 목소리가 되겠습니다.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSign} className="flex flex-col sm:flex-row gap-3">
            <select
              value={signRole}
              onChange={(e) => setSignRole(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-semibold"
            >
              <option value="자영업자 (외식/서비스업)">자영업자 (외식/카페/소상공인)</option>
              <option value="중소기업/스타트업 법인대표">중소기업 / 스타트업 법인 대표자</option>
              <option value="프랜차이즈 가맹점주">프랜차이즈 점주 / 매니저</option>
              <option value="총괄 중간관리자">기업 총괄 관리자 / 팀장</option>
              <option value="성실 장기근속 근로자">성실 장기근속 근로자 (상생 연대)</option>
            </select>

            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-600/40 flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
            >
              <Flame className="w-4 h-4" />
              <span>함께 뭉치기 (서명 동참)</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
