import React from 'react';
import TodoCard from './TodoCard';
import ScheduleCard from './ScheduleCard';
import ProjectCard from './ProjectCard';
import SalesCard from './SalesCard';

// ==================== Dashboard 메인 컨테이너 ====================

export function Dashboard() {
  return (
    <div className="dashboard-grid">
      {/* 좌상: 할 일 목록 */}
      <TodoCard />

      {/* 우상: 주간 일정 */}
      <ScheduleCard />

      {/* 좌하: 프로젝트 진행률 */}
      <ProjectCard />

      {/* 우하: 매출 요약 */}
      <SalesCard />
    </div>
  );
}

export default Dashboard;
