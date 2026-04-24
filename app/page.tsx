import Dashboard from '@/components/dashboard/Dashboard';

// ==================== 메인 대시보드 페이지 ====================

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <Dashboard />
      </div>
    </main>
  );
}
