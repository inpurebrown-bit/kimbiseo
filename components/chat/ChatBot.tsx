'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message, generateDashboardContextResponse } from '@/lib/api/chat';
import { getProjectStats } from '@/lib/mockData';
import { getSalesStats } from '@/lib/mockData';
import { mockTodos } from '@/lib/mockData';

// ==================== ChatBot 컴포넌트 ====================

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '안녕하세요! 👋 김비서입니다. 업무, 일정, 프로젝트, 매출에 대해 도와드릴 수 있습니다. 무엇을 도와드릴까요?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // 대시보드 데이터 수집
      const projectStats = getProjectStats();
      const salesStats = getSalesStats();

      // AI 응답 생성
      const response = await generateDashboardContextResponse(
        input,
        {
          todoCount: mockTodos.length,
          projectCount: projectStats.totalProjects,
          totalSales: salesStats.totalSales,
          averageProgress: projectStats.avgProgress,
        },
        messages.filter((m) => m.role !== 'assistant' || m.id !== '0')
      );

      // 어시스턴트 메시지 추가
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('채팅 오류:', error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '죄송합니다. 응답을 생성할 수 없었습니다. 다시 시도해주세요.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* 모달 */}
      <div className="glass-card w-full max-w-2xl h-96 md:h-[600px] flex flex-col rounded-2xl shadow-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-primary">🤖 김비서 AI 채팅</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors text-xl"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'glass-input text-secondary rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="glass-input px-4 py-2 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="메시지를 입력하세요... (Shift+Enter: 줄바꿈)"
              disabled={loading}
              className="glass-input flex-1 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="glass-input px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 hover:bg-opacity-80"
            >
              {loading ? '...' : '전송'}
            </button>
          </div>

          {/* 제안 질문들 */}
          {messages.length === 1 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-muted">제안된 질문:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '오늘 할 일을 정리해줘',
                  '프로젝트 진행 상황은?',
                  '이번 주 일정 요약',
                  '매출 분석 결과',
                ].map((question) => (
                  <button
                    key={question}
                    onClick={() => {
                      setInput(question);
                    }}
                    className="text-xs glass-input p-2 rounded hover:bg-opacity-80 transition-all text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
