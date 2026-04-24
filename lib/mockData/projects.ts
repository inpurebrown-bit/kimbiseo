import { Project } from '@/lib/types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: '봄맞이 프로모션',
    progress: 65,
    status: 'IN_PROGRESS',
    manager: '김대리',
    startDate: '2026-02-15',
    dueDate: '2026-03-31',
    budget: 500,
    spent: 325,
  },
  {
    id: 'proj-2',
    name: '신제품 런칭 캠페인',
    progress: 20,
    status: 'PREPARING',
    manager: '정팀장',
    startDate: '2026-03-01',
    dueDate: '2026-04-30',
    budget: 1200,
    spent: 240,
  },
  {
    id: 'proj-3',
    name: '인플루언서 협업',
    progress: 35,
    status: 'IN_PROGRESS',
    manager: '이과장',
    startDate: '2026-02-20',
    dueDate: '2026-03-28',
    budget: 300,
    spent: 105,
  },
  {
    id: 'proj-4',
    name: '유튜브 채널 리뉴얼',
    progress: 80,
    status: 'FINALIZING',
    manager: '박사원',
    startDate: '2026-01-15',
    dueDate: '2026-03-15',
    budget: 250,
    spent: 200,
  },
  {
    id: 'proj-5',
    name: '고객 리텐션 프로그램',
    progress: 10,
    status: 'PLANNING',
    manager: '정팀장',
    startDate: '2026-03-10',
    dueDate: '2026-05-31',
    budget: 150,
    spent: 15,
  },
  {
    id: 'proj-6',
    name: '홈페이지 리뉴얼',
    progress: 45,
    status: 'IN_PROGRESS',
    manager: '이과장',
    startDate: '2026-02-01',
    dueDate: '2026-04-15',
    budget: 800,
    spent: 360,
  },
];

/**
 * 프로젝트 통계 계산
 */
export const getProjectStats = () => {
  const totalProjects = mockProjects.length;
  const avgProgress = Math.round(
    mockProjects.reduce((sum, p) => sum + p.progress, 0) / totalProjects
  );
  const totalBudget = mockProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = mockProjects.reduce((sum, p) => sum + p.spent, 0);
  const spendingRate = Math.round((totalSpent / totalBudget) * 100);

  return {
    totalProjects,
    avgProgress,
    totalBudget,
    totalSpent,
    remainingBudget: totalBudget - totalSpent,
    spendingRate,
  };
};
