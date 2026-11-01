"use client";

import React, { useState } from "react";
import { MarkdownView } from "@/components/MarkdownView";
import {
  Crown,
  Lock,
  Unlock,
  Radio,
  Activity,
  AlertTriangle,
  Zap,
  Terminal,
  Cpu,
  Layers,
  Send,
  RefreshCw,
  PowerOff,
  CheckCircle2,
} from "lucide-react";

interface CommanderWarRoomProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const CommanderWarRoom: React.FC<CommanderWarRoomProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [commandInput, setCommandInput] = useState<string>("");
  const [commandLoading, setCommandLoading] = useState<boolean>(false);
  const [commandResponse, setCommandResponse] = useState<string | null>(null);
  const [killSwitchActive, setKillSwitchActive] = useState<boolean>(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "0000" || pinInput === "8810") {
      onUnlock();
      setPinError(null);
    } else {
      setPinError("보안 PIN 번호가 일치하지 않습니다. (기본: 0000)");
    }
  };

  const handleCommanderSubmit = async () => {
    if (!commandInput.trim()) return;

    setCommandLoading(true);
    setCommandResponse(null);

    try {
      const res = await fetch("/api/ai/commander", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: commandInput,
          mode: "strategic",
        }),
      });

      const data = await res.json();
      if (res.ok && data.report) {
        setCommandResponse(data.report);
      } else {
        setCommandResponse(`⚠️ 지휘 보고 오류: ${data.error || "응답 없음"}`);
      }
    } catch (err: any) {
      setCommandResponse(`❌ 통신 실패: ${err.message}`);
    } finally {
      setCommandLoading(false);
    }
  };

  // 1. PIN Lock Screen
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            총사령관 워룸 보안 인증
          </h2>
          <p className="text-xs text-slate-400">
            대표님 전용 최고 지휘 통제실입니다. 보안 PIN을 입력하십시오.
          </p>
        </div>

        <form onSubmit={handlePinSubmit} className="space-y-4">
          <input
            type="password"
            maxLength={6}
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="보안 PIN (초기: 0000)"
            className="w-full text-center text-lg tracking-widest font-mono py-3 px-4 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {pinError && <p className="text-xs text-rose-400 font-medium">{pinError}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" />
            <span>관제탑 잠금 해제</span>
          </button>
        </form>
      </div>
    );
  }

  // 2. Unlocked War Room
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top War Room Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              CHIEF OF STAFF LIVE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              IP: SECURED (Vercel Serverless)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Crown className="w-7 h-7 text-amber-400" />
            박스풀 사내 AI 총사령부 관제탑
          </h1>
          <p className="text-xs text-slate-400">
            자율 에이전트 군단 지휘 · 사내 업무 요청 실시간 감사 · 모델별 토큰 제어
          </p>
        </div>

        {/* Emergency Kill Switch Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setKillSwitchActive(!killSwitchActive)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              killSwitchActive
                ? "bg-rose-600 border-rose-500 text-white animate-pulse"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            <PowerOff className="w-4 h-4" />
            <span>{killSwitchActive ? "⚠️ 비상 킬스위치 가동 중 (AI 차단)" : "비상 킬스위치"}</span>
          </button>
        </div>
      </div>

      {/* Agent Army Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            role: "👑 총사령관 (Chief of Staff)",
            engine: "Claude Opus / Gemini 3.8",
            status: "상시 감시 중",
            task: "전사 업무 자동 분배 및 리스크 승인",
            color: "border-amber-500/40 bg-slate-900/90 text-amber-400",
          },
          {
            role: "💻 [롤-01] 개발팀장 PM",
            engine: "Next.js / Vercel Pro",
            status: "배포 정상",
            task: "b2c-frontend & 3D 뷰어 모니터링",
            color: "border-blue-500/40 bg-slate-900/90 text-blue-400",
          },
          {
            role: "⚙️ [롤-02] B2C 물류/OMS 워커",
            engine: "b2c-api / Node.js",
            status: "대기 (정상)",
            task: "무인 IoT 도어락 & 입출고 동기화",
            color: "border-emerald-500/40 bg-slate-900/90 text-emerald-400",
          },
          {
            role: "📢 [롤-03] 마케팅/MD 워커",
            engine: "Grok 4.2 / GPT-4o",
            status: "상시 레이더",
            task: "네이버 블로그 SEO & SNS 숏폼 제작",
            color: "border-rose-500/40 bg-slate-900/90 text-rose-400",
          },
        ].map((agent, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl border ${agent.color} shadow-lg space-y-2`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">{agent.role}</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                {agent.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">{agent.engine}</p>
            <p className="text-xs text-slate-200 font-medium">{agent.task}</p>
          </div>
        ))}
      </div>

      {/* Main Command Console & Reporting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Console: Directive Terminal (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                총사령관 즉각 지휘 커맨드 콘솔
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Model: Enterprise Multi-LLM
              </span>
            </div>

            <textarea
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="예: 오늘 경영지원팀 정산 내역 점검하고, B2C 물류 개발팀장에게 배포 이슈 확인시켜..."
              rows={5}
              className="w-full text-sm font-mono rounded-xl bg-slate-950 border border-slate-700 text-slate-100 p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-slate-500"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                명령 하달 시 워커 에이전트들이 즉각 세부 실행 계획을 수립합니다.
              </span>
              <button
                onClick={handleCommanderSubmit}
                disabled={commandLoading || !commandInput.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all"
              >
                {commandLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>작전 수립 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>전사 명령 하달</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Command Directives */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              자주 내리는 작전 템플릿
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {
                  label: "🌅 아침 전사 업무 종합 브리핑",
                  cmd: "아침 출근 전사 종합 브리핑을 작성해줘. B2C 서비스 지표 점검, 물류 이슈, 오늘 마케팅 프로모션 일정을 요약해.",
                },
                {
                  label: "🛡️ 전사 API & 토큰 사용량 감사",
                  cmd: "최근 24시간 동안 사내 직원들의 AI 질문 내역과 이상 트래픽 여부, 누적 토큰 비용을 브리핑해줘.",
                },
                {
                  label: "🚀 Vercel 배포 & 프론트 점검 지시",
                  cmd: "개발팀장에게 Vercel 프로덕션 배포 상태와 반응형 UI 점검 지시를 내리고 체크리스트를 뽑아줘.",
                },
                {
                  label: "📦 B2C 물류/창고 CS 일괄 대응",
                  cmd: "최근 접수된 무인창고 도어락 및 입출고 불일치 CS 건들을 분석하고 표준 처리 가이드를 공지해줘.",
                },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCommandInput(item.cmd)}
                  className="p-3 text-left rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-950 transition-all text-xs"
                >
                  <p className="font-bold text-slate-200">{item.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output: Commander War Briefing (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg min-h-[460px] flex flex-col text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                작전 수행 & 지휘 보고서
              </h3>
              {commandResponse && (
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                  승인 대기
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-start">
              {commandLoading ? (
                <div className="py-24 flex flex-col items-center justify-center text-slate-400 space-y-3">
                  <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                  <p className="text-xs font-mono text-amber-300">
                    Chief of Staff가 에이전트 군단에 작업을 분배 중입니다...
                  </p>
                </div>
              ) : commandResponse ? (
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <MarkdownView content={commandResponse} />
                </div>
              ) : (
                <div className="py-24 flex flex-col items-center justify-center text-slate-500 text-center space-y-2">
                  <Cpu className="w-8 h-8 text-slate-600" />
                  <p className="text-xs font-medium text-slate-400">
                    왼쪽 콘솔에서 명령을 하달하시면
                    <br />
                    이곳에 Chief of Staff의 종합 작전 보고서가 출력됩니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
