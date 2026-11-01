import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOXFUL Master AI | 사내 업무 포털 & 총사령관 워룸",
  description: "(주)박스풀 회사 전용 24/7 AI 총사령관 및 사내 업무 자동화 포털",
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
