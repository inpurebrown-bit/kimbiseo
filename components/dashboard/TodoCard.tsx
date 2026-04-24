import React from 'react';
import Card from '@/components/common/Card';
import { PriorityBadge, StatusBadge } from '@/components/common/Badge';
import { mockTodos } from '@/lib/mockData';
import { formatDate } from '@/lib/constants';

// ==================== TodoCard 컴포넌트 ====================

export function TodoCard() {
  // 우선순위별로 정렬 (HIGH > MEDIUM > LOW)
  const sortedTodos = [...mockTodos].sort((a, b) => {
    const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // 최대 9개만 표시
  const displayedTodos = sortedTodos.slice(0, 9);

  return (
    <Card
      title="✅ 할 일 목록"
      subtitle={`${mockTodos.length}개 업무`}
      contentClassName="space-y-3"
    >
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {displayedTodos.map((todo) => (
          <div
            key={todo.id}
            className="glass-input p-3 rounded-lg flex items-start gap-3 hover:bg-opacity-80 transition-all"
          >
            {/* 체크박스 */}
            <input
              type="checkbox"
              checked={todo.status === 'DONE'}
              readOnly
              className="mt-1 w-4 h-4 rounded cursor-pointer accent-green-500"
              aria-label={`${todo.title} 완료 상태`}
            />

            {/* 제목과 메타정보 */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  todo.status === 'DONE'
                    ? 'line-through text-muted'
                    : 'text-primary'
                }`}
              >
                {todo.title}
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-secondary flex-wrap">
                <span>👤 {todo.assignee}</span>
                <span>📅 {formatDate(todo.deadline)}</span>
              </div>
            </div>

            {/* 배지 (우선순위 + 상태) */}
            <div className="flex gap-1 flex-wrap justify-end">
              <PriorityBadge priority={todo.priority} size="sm" />
              <StatusBadge status={todo.status} size="sm" />
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 안내 */}
      {mockTodos.length > 9 && (
        <p className="text-xs text-muted pt-2 border-t border-gray-200 dark:border-gray-700">
          외 {mockTodos.length - 9}개 더보기...
        </p>
      )}
    </Card>
  );
}

export default TodoCard;
