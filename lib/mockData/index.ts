// 모든 Mock 데이터를 통합하여 내보내기

export { mockTodos } from './todos';
export { mockSchedule } from './schedule';
export { mockProjects, getProjectStats } from './projects';
export { mockSales, getSalesStats } from './sales';

// 모든 타입도 함께 내보내기
export type { Todo, ScheduleEvent, Project, Sales, SalesStats } from '@/lib/types';
