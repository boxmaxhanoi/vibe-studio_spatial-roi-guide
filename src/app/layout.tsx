import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "엄마도 조카도 따라하는 AI 길잡이 | 복붙으로 완성하는 실전 AI 프로젝트",
  description: "어려운 코딩 몰라도 OK! 프롬프트 복붙 한 번으로 나만의 웹사이트·비서·자동화 도구가 뚝딱 완성되는 실전 AI 가이드 허브",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
