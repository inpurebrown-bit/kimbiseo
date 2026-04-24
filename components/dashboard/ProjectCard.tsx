import React from 'react';
import Card from '@/components/common/Card';
import { mockProjects, getProjectStats } from '@/lib/mockData';
import { PROJECT_STATUS_LABELS, formatDate, formatCurrency } from '@/lib/constants';

// ==================== ProjectCard 컴포넌트 ====================

export function ProjectCard() {
  const stats = getProjectStats();

  // 진행률별 그라디언트 색상
  const getProgressColor = (progress: number): string => {
    if (progress >= 75) return 'from-green-400 to-green-600';
    if (progress >= 50) return 'from-blue-400 to-blue-600';
    if (progress >= 25) return 'from-yellow-400 to-yellow-600';
    return 'from-gray-400 to-gray-600';
  };

  return (
    <Card
      title="📊 프로젝트 진행률"
      subtitle={`평균 진행률: ${stats.avgProgress}%`}
      contentClassName="space-y-3"
    >
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {mockProjects.map((project) => (
          <div key={project.id} className="space-y-1.5">
            {/* 프로젝트명 + 상태 */}
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-primary truncate">
                {project.name}
              </h4>
              <span className="chip chip-normal text-xs">
                {PROJECT_STATUS_LABELS[project.status]}
              </span>
            </div>

            {/* 진행률 텍스트 + 바 */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="progress-bar">
                  <div
                    className={`progress-fill bg-gradient-to-r ${getProgressColor(
                      project.progress
                    )}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-bold text-secondary w-10 text-right">
                {project.progress}%
              </span>
            </div>

            {/* 메타정보 (담당자, 예산, 마감) */}
            <div className="grid grid-cols-3 gap-2 text-xs text-muted">
              <div>
                <p className="font-medium text-secondary">담당자</p>
                <p>{project.manager}</p>
              </div>
              <div>
                <p className="font-medium text-secondary">집행률</p>
                <p>
                  {Math.round((project.spent / project.budget) * 100)}%
                </p>
              </div>
              <div>
                <p className="font-medium text-secondary">마감</p>
                <p>{formatDate(project.dueDate).split(' ')[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 예산 통계 */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted">총 예산</p>
            <p className="font-bold text-primary">
              {formatCurrency(stats.totalBudget)}
            </p>
          </div>
          <div>
            <p className="text-muted">집행액</p>
            <p className="font-bold text-primary">
              {formatCurrency(stats.totalSpent)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
