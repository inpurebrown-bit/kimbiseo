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
      <body className="bg-light-gradient dark:bg-dark-gradient min-h-screen">
        <ThemeProvider>
          <Header />
          <main className="min-h-[calc(100vh-80px)] p-6 md:p-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
