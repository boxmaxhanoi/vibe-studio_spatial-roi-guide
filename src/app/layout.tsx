import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '내로남불 (NAERONAMBUL) - 대한민국 정치인 체급별 스탯 비교 & 공약 검증소',
  description: 'UFC 스타일 체급별 라이벌 매치업, 공약 이행률 신호등, 과거 vs 현재 말바꾸기 내로남불 박제 타임라인',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
