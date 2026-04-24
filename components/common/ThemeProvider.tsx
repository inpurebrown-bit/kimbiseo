'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// ==================== 테마 컨텍스트 타입 ====================

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ==================== 테마 프로바이더 ====================

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 초기 로드: localStorage에서 저장된 테마를 확인하거나 시스템 선호도 사용
    const savedTheme = localStorage.getItem('kimbiseo-theme') as 'light' | 'dark' | null;

    if (savedTheme) {
      // localStorage에서 저장된 테마 사용
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // 시스템 선호도 확인
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = systemDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('kimbiseo-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);

    // 시스템 색상 스키마 변경 감지 (선택사항)
    document.documentElement.style.colorScheme = newTheme;
  };

  // 초기 로드 중에는 렌더링하지 않아 hydration mismatch 방지
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ==================== useTheme 커스텀 훅 ====================

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
