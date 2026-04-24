// ==================== 색상 팔레트 ====================
export const COLORS = {
  LIGHT: {
    // 라이트 모드 색상
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    danger: '#f5576c',
    textPrimary: '#1a1a2e',
    textSecondary: '#555577',
    textMuted: '#8888aa',
    glassBg: 'rgba(255, 255, 255, 0.62)',
    glassBorder: 'rgba(255, 255, 255, 0.75)',
    glassShadow: '0 8px 32px rgba(102, 126, 234, 0.18)',
  },
  DARK: {
    // 다크 모드 색상
    primary: '#0f0f23',
    secondary: '#1a1040',
    accent: '#0d1b3e',
    danger: '#160d2e',
    textPrimary: '#e0e0e0',
    textSecondary: '#a0a0c0',
    textMuted: '#666688',
    glassBg: 'rgba(255, 255, 255, 0.055)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassShadow: '0 8px 32px rgba(10, 10, 30, 0.2)',
  },
};

// ==================== 배지 색상 매핑 ====================
export const BADGE_COLORS = {
  priority: {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
  },
  status: {
    done: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    'in-progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    waiting: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200',
  },
};

// ==================== 우선순위 한글 매핑 ====================
export const PRIORITY_LABELS = {
  HIGH: '높음',
  MEDIUM: '보통',
  LOW: '낮음',
};

// ==================== 상태 한글 매핑 ====================
export const STATUS_LABELS = {
  TODO: '대기',
  IN_PROGRESS: '진행중',
  DONE: '완료',
};

// ==================== 프로젝트 상태 한글 매핑 ====================
export const PROJECT_STATUS_LABELS = {
  PLANNING: '기획중',
  PREPARING: '준비중',
  IN_PROGRESS: '진행중',
  FINALIZING: '마무리',
};

// ==================== 프로그레스 바 그라디언트 ====================
export const PROGRESS_COLORS = {
  80: 'from-green-400 to-green-600',
  65: 'from-indigo-400 to-indigo-600',
  45: 'from-amber-400 to-amber-600',
  35: 'from-pink-400 to-pink-600',
  20: 'from-blue-400 to-blue-600',
  10: 'from-gray-400 to-gray-600',
};

// ==================== 카테고리 색상 ====================
export const CATEGORY_COLORS = {
  '전자기기': 'from-indigo-500 to-indigo-700',
  '생활용품': 'from-green-500 to-green-700',
};

// ==================== 지역 색상 ====================
export const REGION_COLORS = {
  서울: 'from-indigo-500 to-indigo-700',
  부산: 'from-green-500 to-green-700',
  대구: 'from-amber-500 to-amber-700',
};

// ==================== 숫자 포맷팅 ====================
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatPercent = (value: number): string => {
  return `${value}%`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};
