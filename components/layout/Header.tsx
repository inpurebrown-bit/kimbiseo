'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/components/hooks/useTheme';

// ==================== Header 컴포넌트 ====================

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    // 현재 날짜 포맷팅 (예: Mon, Mar 10, 2026)
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setCurrentDate(formatter.format(date));
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-card mx-6 mt-6 mb-0 rounded-b-none py-4 px-6">
      <div className="flex items-center justify-between">
        {/* 좌측: 로고 및 제목 */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
            K
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">김비서</h1>
            <p className="text-xs text-secondary">업무 관리 대시보드</p>
          </div>
        </div>

        {/* 중앙: 현재 날짜 */}
        <div className="hidden md:block">
          <p className="text-sm font-medium text-secondary">
            {currentDate || 'Loading...'}
          </p>
        </div>

        {/* 우측: 테마 토글 버튼 */}
        <button
          onClick={toggleTheme}
          className="glass-input px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-80 focus:ring-2 focus:ring-primary focus:outline-none"
          aria-label="테마 전환"
          title={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default Header;
