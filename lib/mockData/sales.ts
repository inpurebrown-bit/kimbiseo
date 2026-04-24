import { Sales, SalesStats } from '@/lib/types';

export const mockSales: Sales[] = [
  {
    id: 'sales-1',
    date: '2026-01-05',
    product: '무선 이어폰',
    category: '전자기기',
    quantity: 45,
    unitPrice: 89000,
    total: 4005000,
    region: '서울',
  },
  {
    id: 'sales-2',
    date: '2026-01-05',
    product: '보조배터리',
    category: '전자기기',
    quantity: 32,
    unitPrice: 35000,
    total: 1120000,
    region: '서울',
  },
  {
    id: 'sales-3',
    date: '2026-01-05',
    product: '텀블러',
    category: '생활용품',
    quantity: 78,
    unitPrice: 25000,
    total: 1950000,
    region: '부산',
  },
  {
    id: 'sales-4',
    date: '2026-01-06',
    product: '블루투스 스피커',
    category: '전자기기',
    quantity: 28,
    unitPrice: 120000,
    total: 3360000,
    region: '대구',
  },
  {
    id: 'sales-5',
    date: '2026-01-07',
    product: '무선 충전기',
    category: '전자기기',
    quantity: 55,
    unitPrice: 45000,
    total: 2475000,
    region: '서울',
  },
  {
    id: 'sales-6',
    date: '2026-01-08',
    product: '에코백',
    category: '생활용품',
    quantity: 120,
    unitPrice: 15000,
    total: 1800000,
    region: '부산',
  },
  {
    id: 'sales-7',
    date: '2026-01-10',
    product: '무선 이어폰',
    category: '전자기기',
    quantity: 30,
    unitPrice: 89000,
    total: 2670000,
    region: '대구',
  },
  {
    id: 'sales-8',
    date: '2026-01-12',
    product: '텀블러',
    category: '생활용품',
    quantity: 65,
    unitPrice: 25000,
    total: 1625000,
    region: '서울',
  },
  {
    id: 'sales-9',
    date: '2026-01-15',
    product: '보조배터리',
    category: '전자기기',
    quantity: 48,
    unitPrice: 35000,
    total: 1680000,
    region: '서울',
  },
  {
    id: 'sales-10',
    date: '2026-01-18',
    product: '블루투스 스피커',
    category: '전자기기',
    quantity: 22,
    unitPrice: 120000,
    total: 2640000,
    region: '부산',
  },
  {
    id: 'sales-11',
    date: '2026-01-20',
    product: '무선 이어폰',
    category: '전자기기',
    quantity: 50,
    unitPrice: 89000,
    total: 4450000,
    region: '서울',
  },
  {
    id: 'sales-12',
    date: '2026-01-22',
    product: '무선 충전기',
    category: '전자기기',
    quantity: 60,
    unitPrice: 45000,
    total: 2700000,
    region: '대구',
  },
  {
    id: 'sales-13',
    date: '2026-01-25',
    product: '에코백',
    category: '생활용품',
    quantity: 95,
    unitPrice: 15000,
    total: 1425000,
    region: '부산',
  },
  {
    id: 'sales-14',
    date: '2026-01-28',
    product: '텀블러',
    category: '생활용품',
    quantity: 72,
    unitPrice: 25000,
    total: 1800000,
    region: '대구',
  },
  {
    id: 'sales-15',
    date: '2026-02-01',
    product: '보조배터리',
    category: '전자기기',
    quantity: 40,
    unitPrice: 35000,
    total: 1400000,
    region: '서울',
  },
  {
    id: 'sales-16',
    date: '2026-02-03',
    product: '블루투스 스피커',
    category: '전자기기',
    quantity: 25,
    unitPrice: 120000,
    total: 3000000,
    region: '서울',
  },
  {
    id: 'sales-17',
    date: '2026-02-05',
    product: '무선 이어폰',
    category: '전자기기',
    quantity: 35,
    unitPrice: 89000,
    total: 3115000,
    region: '부산',
  },
  {
    id: 'sales-18',
    date: '2026-02-07',
    product: '에코백',
    category: '생활용품',
    quantity: 110,
    unitPrice: 15000,
    total: 1650000,
    region: '서울',
  },
  {
    id: 'sales-19',
    date: '2026-02-08',
    product: '무선 충전기',
    category: '전자기기',
    quantity: 45,
    unitPrice: 45000,
    total: 2025000,
    region: '대구',
  },
  {
    id: 'sales-20',
    date: '2026-02-10',
    product: '텀블러',
    category: '생활용품',
    quantity: 88,
    unitPrice: 25000,
    total: 2200000,
    region: '부산',
  },
  {
    id: 'sales-21',
    date: '2026-02-12',
    product: '블루투스 스피커',
    category: '전자기기',
    quantity: 20,
    unitPrice: 120000,
    total: 2400000,
    region: '대구',
  },
  {
    id: 'sales-22',
    date: '2026-02-14',
    product: '보조배터리',
    category: '전자기기',
    quantity: 50,
    unitPrice: 35000,
    total: 1750000,
    region: '서울',
  },
  {
    id: 'sales-23',
    date: '2026-02-15',
    product: '무선 이어폰',
    category: '전자기기',
    quantity: 42,
    unitPrice: 89000,
    total: 3738000,
    region: '서울',
  },
  {
    id: 'sales-24',
    date: '2026-02-17',
    product: '에코백',
    category: '생활용품',
    quantity: 105,
    unitPrice: 15000,
    total: 1575000,
    region: '대구',
  },
  {
    id: 'sales-25',
    date: '2026-02-19',
    product: '무선 충전기',
    category: '전자기기',
    quantity: 50,
    unitPrice: 45000,
    total: 2250000,
    region: '부산',
  },
  {
    id: 'sales-26',
    date: '2026-02-20',
    product: '블루투스 스피커',
    category: '전자기기',
    quantity: 24,
    unitPrice: 120000,
    total: 2880000,
    region: '서울',
  },
  {
    id: 'sales-27',
    date: '2026-02-22',
    product: '텀블러',
    category: '생활용품',
    quantity: 75,
    unitPrice: 25000,
    total: 1875000,
    region: '서울',
  },
  {
    id: 'sales-28',
    date: '2026-02-24',
    product: '보조배터리',
    category: '전자기기',
    quantity: 55,
    unitPrice: 35000,
    total: 1925000,
    region: '대구',
  },
  {
    id: 'sales-29',
    date: '2026-02-26',
    product: '무선 이어폰',
    category: '전자기기',
    quantity: 38,
    unitPrice: 89000,
    total: 3382000,
    region: '부산',
  },
  {
    id: 'sales-30',
    date: '2026-02-28',
    product: '에코백',
    category: '생활용품',
    quantity: 100,
    unitPrice: 15000,
    total: 1500000,
    region: '서울',
  },
];

/**
 * 매출 통계 계산
 */
export const getSalesStats = (): SalesStats => {
  // 총 매출
  const totalSales = mockSales.reduce((sum, sale) => sum + sale.total, 0);

  // 평균 단가
  const totalItems = mockSales.length;
  const avgUnitPrice = Math.round(
    mockSales.reduce((sum, sale) => sum + sale.unitPrice, 0) / totalItems
  );

  // 월별 매출
  const janSales = mockSales
    .filter((s) => s.date.includes('2026-01'))
    .reduce((sum, s) => sum + s.total, 0);

  const febSales = mockSales
    .filter((s) => s.date.includes('2026-02'))
    .reduce((sum, s) => sum + s.total, 0);

  // 최고 매출 제품
  const productTotals: { [key: string]: number } = {};
  mockSales.forEach((sale) => {
    productTotals[sale.product] = (productTotals[sale.product] || 0) + sale.total;
  });
  const topProduct = Object.entries(productTotals).sort(([, a], [, b]) => b - a)[0][0];

  // 카테고리별 비중
  const categoryTotals: { [key: string]: number } = {};
  mockSales.forEach((sale) => {
    categoryTotals[sale.category] = (categoryTotals[sale.category] || 0) + sale.total;
  });

  const categoryBreakdown = Object.entries(categoryTotals).map(([name, total]) => ({
    name,
    percentage: Math.round((total / totalSales) * 100),
  }));

  // 지역별 판매건수
  const regionCounts: { [key: string]: number } = {};
  mockSales.forEach((sale) => {
    regionCounts[sale.region] = (regionCounts[sale.region] || 0) + 1;
  });

  const regionData = Object.entries(regionCounts).map(([region, count]) => ({
    region,
    count,
  }));

  return {
    totalSales,
    avgUnitPrice,
    janSales,
    febSales,
    topProduct,
    categoryBreakdown,
    regionData,
  };
};
