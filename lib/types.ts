// ==================== Todo 타입 ====================
export interface Todo {
  id: string;
  title: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  assignee: string;
  deadline: string; // YYYY-MM-DD
  category: string;
}

// ==================== Schedule 타입 ====================
export interface ScheduleEvent {
  day: string; // "Monday", "Tuesday", ...
  date: string; // YYYY-MM-DD
  events: Array<{
    time: string; // HH:MM
    title: string;
    type?: 'normal' | 'urgent' | 'special'; // 칩 스타일
  }>;
}

// ==================== Project 타입 ====================
export interface Project {
  id: string;
  name: string;
  progress: number; // 10-80
  status: 'PLANNING' | 'PREPARING' | 'IN_PROGRESS' | 'FINALIZING';
  manager: string;
  startDate: string; // YYYY-MM-DD
  dueDate: string;
  budget: number; // 만원
  spent: number; // 만원
}

// ==================== Sales 타입 ====================
export interface Sales {
  id: string;
  date: string; // YYYY-MM-DD
  product: string;
  category: '전자기기' | '생활용품';
  quantity: number;
  unitPrice: number;
  total: number;
  region: '서울' | '부산' | '대구';
}

// ==================== 계산된 통계 ====================
export interface SalesStats {
  totalSales: number;
  avgUnitPrice: number;
  janSales: number;
  febSales: number;
  topProduct: string;
  categoryBreakdown: Array<{ name: string; percentage: number }>;
  regionData: Array<{ region: string; count: number }>;
}

// ==================== Badge Props ====================
export type BadgeVariant = 'priority' | 'status';
export type BadgePriority = 'high' | 'medium' | 'low';
export type BadgeStatus = 'done' | 'in-progress' | 'waiting';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant: BadgeVariant;
  type: BadgePriority | BadgeStatus;
  children: React.ReactNode;
  size?: BadgeSize;
}
