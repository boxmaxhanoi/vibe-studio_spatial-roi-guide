import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOXFUL Space OS | 테슬라식 AI 무인 프랜차이즈 & 공간 컨피규레이터",
  description: "영업사원 없는 100% 데이터 기반 빌딩 공간 분석, 층별 프랜차이즈 큐레이션, 실시간 정찰제 견적 플랫폼",
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
