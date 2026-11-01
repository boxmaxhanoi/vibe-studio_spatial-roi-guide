import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Engine Registry | Production Blueprints & One-Shot Prompts",
  description: "실전 비즈니스 AI 시스템 스펙과 원클릭 복사 즉시 실행(One-Shot) 프롬프트 저장소",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
