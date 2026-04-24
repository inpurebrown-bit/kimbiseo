import React from 'react';
import { BadgeProps, BadgePriority, BadgeStatus } from '@/lib/types';
import { BADGE_COLORS } from '@/lib/constants';

// ==================== Badge 컴포넌트 ====================

export function Badge({
  variant,
  type,
  children,
  size = 'md',
}: BadgeProps) {
  // 색상 클래스 결정
  let colorClass = '';

  if (variant === 'priority') {
    colorClass = BADGE_COLORS.priority[type as BadgePriority];
  } else if (variant === 'status') {
    colorClass = BADGE_COLORS.status[type as BadgeStatus];
  }

  // 크기 클래스
  const sizeClass = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  }[size];

  return (
    <span className={`badge ${colorClass} ${sizeClass}`}>
      {children}
    </span>
  );
}

// ==================== Priority Badge ====================

interface PrioritybadgeProps {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  size?: 'sm' | 'md' | 'lg';
}

export function PriorityBadge({ priority, size = 'md' }: PrioritybadgeProps) {
  const labels = {
    HIGH: '높음',
    MEDIUM: '보통',
    LOW: '낮음',
  };

  const types = {
    HIGH: 'high' as BadgePriority,
    MEDIUM: 'medium' as BadgePriority,
    LOW: 'low' as BadgePriority,
  };

  return (
    <Badge variant="priority" type={types[priority]} size={size}>
      {labels[priority]}
    </Badge>
  );
}

// ==================== Status Badge ====================

interface StatusBadgeProps {
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const labels = {
    TODO: '대기',
    IN_PROGRESS: '진행중',
    DONE: '완료',
  };

  const types = {
    TODO: 'waiting' as BadgeStatus,
    IN_PROGRESS: 'in-progress' as BadgeStatus,
    DONE: 'done' as BadgeStatus,
  };

  return (
    <Badge variant="status" type={types[status]} size={size}>
      {labels[status]}
    </Badge>
  );
}

export default Badge;
