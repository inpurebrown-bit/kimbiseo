import Dashboard from '@/components/dashboard/Dashboard';
import ChatInput from '@/components/chat/ChatInput';

// ==================== 메인 대시보드 페이지 ====================

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* 상단 채팅 입력 */}
        <ChatInput />

        {/* 대시보드 */}
        <Dashboard />
      </div>
    </main>
  );
}
