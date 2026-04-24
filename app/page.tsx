'use client';

import { Suspense, lazy } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';

// Gemini 2.5 Flash 기반 AI 채팅 - 플로팅 버튼으로 대시보드 어디서나 접근 가능
const ChatButton = lazy(() => import('@/components/chat/ChatButton'));

// ==================== 메인 대시보드 페이지 ====================
// 버전: 1.1.0 - Gemini AI 채팅 통합
// 업데이트: 2026-04-24

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* 대시보드: 할 일, 일정, 프로젝트, 매출 4개 카드 */}
        <Dashboard />
      </div>

      {/* 플로팅 AI 채팅 버튼 (우측 하단) */}
      <Suspense fallback={null}>
        <ChatButton />
      </Suspense>
    </main>
  );
}
