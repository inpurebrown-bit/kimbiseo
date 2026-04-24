'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/components/hooks/useTheme';
import ChatBot from '@/components/chat/ChatBot';

// ==================== Header 컴포넌트 ====================

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // 현재 날짜 포맷팅 (예: 2026년 3월 10일 (월))
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
    const formatted = formatter.format(date);
    setCurrentDate(formatted);
  }, []);

  const navItems = [
    { icon: '💬', label: '채팅', action: 'chat' },
    { icon: '📊', label: '대시보드', href: '/' },
    { icon: '📖', label: '회의록', href: '#' },
    { icon: '💰', label: '매출 현황', href: '#' },
    { icon: '🎯', label: '업무 현황', href: '#' },
    { icon: '📈', label: '분석', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 px-6 shadow-lg">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-4">
        {/* 좌측: 로고 및 제목 */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-bold text-white">김비서 대시보드</h1>
        </div>

        {/* 중앙: 현재 날짜 */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
          <span className="text-white font-medium text-sm">
            {currentDate || 'Loading...'}
          </span>
        </div>

        {/* 우측: 테마 토글 */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium transition-all hover:bg-white/30"
          aria-label="테마 전환"
          title={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
        >
          {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
        </button>
      </div>

      {/* 네비게이션 버튼 행 */}
      <div className="flex items-center gap-3 flex-wrap">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              if (item.action === 'chat') {
                setIsChatOpen(true);
              } else if (item.href) {
                window.location.href = item.href;
              }
            }}
            className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium transition-all hover:bg-white/30 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm"
            title={item.label}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>

      {/* ChatBot 모달 */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </header>
  );
}

export default Header;
