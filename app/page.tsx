'use client';

import { Suspense, lazy } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';

const ChatButton = lazy(() => import('@/components/chat/ChatButton'));

// ==================== 메인 대시보드 페이지 ====================

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* 대시보드 */}
        <Dashboard />
      </div>

      {/* 플로팅 채팅 버튼 */}
      <Suspense fallback={null}>
        <ChatButton />
      </Suspense>
    </main>
  );
}
