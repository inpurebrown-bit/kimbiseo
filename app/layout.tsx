import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import Header from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: '김비서 대시보드',
  description: '업무 관리 대시보드 - 할 일, 일정, 프로젝트, 매출 현황을 한 눈에',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
