import React from 'react';
import Card from '@/components/common/Card';
import { getSalesStats } from '@/lib/mockData';
import { formatCurrency } from '@/lib/constants';

// ==================== SalesCard 컴포넌트 ====================

export function SalesCard() {
  const stats = getSalesStats();

  return (
    <Card
      title="💰 매출 요약"
      subtitle="2026년 1월-2월"
      contentClassName="space-y-4"
    >
      {/* KPI 카드 (2×2 그리드) */}
      <div className="grid grid-cols-2 gap-2">
        {/* 총 매출 */}
        <div className="glass-input p-3 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/10">
          <p className="text-xs text-secondary font-medium">총 누적 매출</p>
          <p className="text-lg font-bold text-primary mt-1">
            {formatCurrency(stats.totalSales)}
          </p>
        </div>

        {/* 1월 매출 */}
        <div className="glass-input p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10">
          <p className="text-xs text-secondary font-medium">1월 매출</p>
          <p className="text-lg font-bold text-primary mt-1">
            {formatCurrency(stats.janSales)}
          </p>
        </div>

        {/* 2월 매출 */}
        <div className="glass-input p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10">
          <p className="text-xs text-secondary font-medium">2월 매출</p>
          <p className="text-lg font-bold text-primary mt-1">
            {formatCurrency(stats.febSales)}
          </p>
        </div>

        {/* 최고 제품 */}
        <div className="glass-input p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10">
          <p className="text-xs text-secondary font-medium">최고 제품</p>
          <p className="text-sm font-bold text-primary mt-1 truncate">
            {stats.topProduct}
          </p>
        </div>
      </div>

      {/* 카테고리별 매출 비중 */}
      <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs font-semibold text-secondary">카테고리별 비중</p>
        {stats.categoryBreakdown.map((cat) => (
          <div key={cat.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-secondary">{cat.name}</span>
              <span className="font-bold text-primary">{cat.percentage}%</span>
            </div>
            {/* 진행률 바 */}
            <div className="progress-bar h-1.5">
              <div
                className={`progress-fill ${
                  cat.name === '전자기기'
                    ? 'bg-gradient-to-r from-indigo-400 to-indigo-600'
                    : 'bg-gradient-to-r from-green-400 to-green-600'
                }`}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 지역별 판매처 */}
      <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs font-semibold text-secondary">지역별 판매</p>
        <div className="grid grid-cols-3 gap-2">
          {stats.regionData.map((region) => (
            <div
              key={region.region}
              className="glass-input p-2 rounded-lg text-center text-xs"
            >
              <p className="text-secondary font-medium">{region.region}</p>
              <p className="font-bold text-primary text-lg">{region.count}</p>
              <p className="text-muted text-xs">건</p>
            </div>
          ))}
        </div>
      </div>

      {/* 평균 단가 */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary font-medium">평균 단가</span>
          <span className="text-lg font-bold text-primary">
            {formatCurrency(stats.avgUnitPrice)}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default SalesCard;
