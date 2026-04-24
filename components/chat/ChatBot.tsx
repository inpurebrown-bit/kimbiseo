'use client';

import React, { useState, useRef, useEffect } from 'react';

// ==================== 간단한 ChatBot 컴포넌트 ====================

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SAMPLE_RESPONSES = {
  greeting: '안녕하세요! 👋 김비서입니다. 업무, 일정, 프로젝트, 매출에 대해 도와드릴 수 있습니다.',
  todo: '현재 11개의 할 일 항목이 있습니다. 우선순위별로 정렬되어 있으니 높음 순서부터 처리해주세요! 📋',
  schedule: '이번 주(3월 10-14일)에 15개의 일정이 있습니다. 월요일 마케팅팀 회의부터 시작하네요! 📅',
  project: '6개의 프로젝트가 진행 중이며, 평균 진행률은 42.5%입니다. 유튜브 채널 리뉴얼이 80%로 가장 진행됐어요! 📊',
  sales: '총 매출은 75,187,000원이며, 전자기기(76%)의 판매가 주를 이루고 있습니다. 무선 이어폰이 가장 인기 제품입니다! 💰',
  default: '죄송합니다. 더 자세한 답변을 위해서는 구체적인 질문을 해주세요!',
};

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: SAMPLE_RESPONSES.greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes('안녕') ||
      lowerInput.includes('hello') ||
      lowerInput.includes('안녕하')
    ) {
      return SAMPLE_RESPONSES.greeting;
    }

    if (
      lowerInput.includes('할 일') ||
      lowerInput.includes('todo') ||
      lowerInput.includes('업무') ||
      lowerInput.includes('task')
    ) {
      return SAMPLE_RESPONSES.todo;
    }

    if (
      lowerInput.includes('일정') ||
      lowerInput.includes('schedule') ||
      lowerInput.includes('회의') ||
      lowerInput.includes('meeting')
    ) {
      return SAMPLE_RESPONSES.schedule;
    }

    if (
      lowerInput.includes('프로젝트') ||
      lowerInput.includes('project') ||
      lowerInput.includes('진행')
    ) {
      return SAMPLE_RESPONSES.project;
    }

    if (
      lowerInput.includes('매출') ||
      lowerInput.includes('sales') ||
      lowerInput.includes('판매') ||
      lowerInput.includes('revenue')
    ) {
      return SAMPLE_RESPONSES.sales;
    }

    return SAMPLE_RESPONSES.default;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // 시뮬레이션: 약간의 딜레이 후 응답
    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* 모달 */}
      <div className="glass-card w-full max-w-2xl h-96 md:h-[600px] flex flex-col rounded-2xl shadow-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <h2 className="text-lg font-bold text-primary">🤖 김비서 AI 어시스턴트</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors text-xl font-bold"
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
              } animate-fade-in`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg text-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none'
                    : 'glass-input text-secondary rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
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
              <div className="glass-input px-4 py-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          {/* 제안 질문 */}
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-2">
              {[
                '할 일 확인',
                '일정 보기',
                '프로젝트 진행률',
                '매출 현황',
              ].map((question) => (
                <button
                  key={question}
                  onClick={() => {
                    setInput(question);
                  }}
                  className="text-xs glass-input p-2 rounded hover:bg-opacity-80 transition-all text-left font-medium hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* 메시지 입력 */}
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
              placeholder="메시지를 입력하세요..."
              disabled={loading}
              className="glass-input flex-1 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="glass-input px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
            >
              {loading ? '...' : '전송'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
