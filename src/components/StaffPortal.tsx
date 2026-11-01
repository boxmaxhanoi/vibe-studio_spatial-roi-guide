"use client";

import React, { useState } from "react";
import { DEPARTMENTS, Department, Preset } from "@/data/departments";
import { MarkdownView } from "@/components/MarkdownView";
import {
  FileSpreadsheet,
  Boxes,
  Megaphone,
  Code2,
  Send,
  UploadCloud,
  FileText,
  Trash2,
  RefreshCw,
  Sparkles,
  HelpCircle,
  Clock,
} from "lucide-react";

export const StaffPortal: React.FC = () => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>("finance");
  const [promptInput, setPromptInput] = useState<string>("");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [attachedFileContent, setAttachedFileContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ title: string; time: string; response: string }>>([]);

  const currentDept: Department =
    DEPARTMENTS.find((d) => d.id === selectedDeptId) || DEPARTMENTS[0];

  const getDeptIcon = (iconName: string) => {
    switch (iconName) {
      case "FileSpreadsheet":
        return <FileSpreadsheet className="w-5 h-5" />;
      case "Boxes":
        return <Boxes className="w-5 h-5" />;
      case "Megaphone":
        return <Megaphone className="w-5 h-5" />;
      case "Code2":
        return <Code2 className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const handleApplyPreset = (preset: Preset) => {
    setPromptInput(preset.prompt);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setAttachedFileContent(content || "");
    };
    reader.readAsText(file);
  };

  const handleClearFile = () => {
    setAttachedFileName(null);
    setAttachedFileContent("");
  };

  const handleSubmit = async () => {
    if (!promptInput.trim() && !attachedFileContent) return;

    setLoading(true);
    setResponseMarkdown(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deptId: currentDept.id,
          deptName: currentDept.name,
          systemPrompt: currentDept.systemPrompt,
          prompt: promptInput,
          fileContent: attachedFileContent,
          fileName: attachedFileName,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setResponseMarkdown(data.reply);
        setHistory((prev) => [
          {
            title: promptInput.slice(0, 30) || attachedFileName || "업무 요청",
            time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
            response: data.reply,
          },
          ...prev.slice(0, 5),
        ]);
      } else {
        setResponseMarkdown(`⚠️ 오류가 발생했습니다: ${data.error || "응답 없음"}`);
      }
    } catch (err: any) {
      setResponseMarkdown(`❌ 통신 실패: ${err.message || "서버에 연결할 수 없습니다."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>박스풀 사내 AI 비서 포털</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            어떤 부서의 업무를 도와드릴까요?
          </h1>
          <p className="text-sm text-slate-300">
            프롬프트 고민 없이 부서를 고르고 원클릭 프리셋을 누르세요. 사내 규격과 문서 스타일에 맞춰 즉시 완성본을 제작합니다.
          </p>
        </div>
      </div>

      {/* Department Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DEPARTMENTS.map((dept) => {
          const isSelected = dept.id === selectedDeptId;
          return (
            <button
              key={dept.id}
              onClick={() => {
                setSelectedDeptId(dept.id);
                setPromptInput("");
                setResponseMarkdown(null);
              }}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 relative ${
                isSelected
                  ? "bg-white border-brand-500 shadow-md ring-2 ring-brand-500/20"
                  : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-white bg-gradient-to-tr ${dept.color} shadow-sm`}
              >
                {getDeptIcon(dept.iconName)}
              </div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                {dept.badge}
              </span>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                {dept.name}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Presets + Input + Upload (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Presets */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {currentDept.name} 원클릭 추천 템플릿
              </h3>
              <span className="text-[11px] text-slate-400">클릭 시 자동 입력</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentDept.presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className="p-3 text-left rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-brand-50/70 hover:border-brand-300 transition-all text-xs group"
                >
                  <p className="font-bold text-slate-800 group-hover:text-brand-700">
                    {preset.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {preset.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt & File Input Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                업무 지시 및 세부 내용 입력
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="지시하실 업무를 자유롭게 작성하세요 (예: 11월 15일 기준 미납 회원 알림톡 초안 작성해줘)..."
                rows={6}
                className="w-full text-sm rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder:text-slate-400"
              />
            </div>

            {/* File Upload Zone */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="w-full sm:w-auto">
                {attachedFileName ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[200px]">{attachedFileName}</span>
                    <button
                      onClick={handleClearFile}
                      className="ml-1 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-all">
                    <UploadCloud className="w-4 h-4 text-slate-500" />
                    <span>문서/데이터 파일 첨부 (TXT, CSV)</span>
                    <input
                      type="file"
                      accept=".txt,.csv,.json,.md,.log"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || (!promptInput.trim() && !attachedFileContent)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>마스터 AI 작성 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>작성 요청하기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Output: Result View + History (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm min-h-[420px] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                마스터 AI 결과물
              </h3>
              {responseMarkdown && (
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  완료
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-start">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
                  <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-600 rounded-full animate-spin" />
                  <p className="text-xs font-medium">부서 표준 규정에 맞춰 문서를 생성하고 있습니다...</p>
                </div>
              ) : responseMarkdown ? (
                <MarkdownView content={responseMarkdown} />
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 text-center space-y-2">
                  <HelpCircle className="w-8 h-8 text-slate-300" />
                  <p className="text-xs font-medium text-slate-500">
                    왼쪽에서 원하는 작업을 요청하면
                    <br />
                    이곳에 사내 표준 양식으로 결과가 출력됩니다.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick History */}
          {history.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
              <h4 className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                최근 요청 내역
              </h4>
              <div className="space-y-1.5">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => setResponseMarkdown(h.response)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-xs flex items-center justify-between text-slate-700 transition-all border border-transparent hover:border-slate-100"
                  >
                    <span className="truncate max-w-[200px] font-medium">{h.title}</span>
                    <span className="text-[10px] text-slate-400">{h.time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
