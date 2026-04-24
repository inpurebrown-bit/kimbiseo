import React from 'react';

// ==================== Card 컴포넌트 ====================

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function Card({
  title,
  subtitle,
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
}: CardProps) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {/* 카드 헤더 */}
      <div className={`mb-4 ${headerClassName}`}>
        <h2 className="text-lg font-bold text-primary">{title}</h2>
        {subtitle && <p className="text-sm text-secondary mt-1">{subtitle}</p>}
      </div>

      {/* 카드 콘텐츠 */}
      <div className={`${contentClassName}`}>{children}</div>
    </div>
  );
}

export default Card;
