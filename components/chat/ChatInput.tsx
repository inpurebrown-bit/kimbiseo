'use client';

import React, { useState } from 'react';

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

export default function ChatInput() {
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

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = getResponse(userInput);
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

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.62)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.75)',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
      width: '100%'
    }} className="dark:bg-opacity-5">
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
        🤖 김비서 AI 어시스턴트
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '16px',
        maxHeight: '256px',
        overflowY: 'auto'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{
              maxWidth: '400px',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              background: message.role === 'user'
                ? 'linear-gradient(to right, #4f46e5, #9333ea)'
                : 'rgba(255, 255, 255, 0.62)',
              color: message.role === 'user' ? 'white' : 'inherit',
              borderBottomRightRadius: message.role === 'user' ? '0' : '8px',
              borderBottomLeftRadius: message.role === 'user' ? '8px' : '0',
            }}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
              <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
                {message.timestamp.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#667eea',
              animation: 'bounce 1.4s infinite'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#667eea',
              animation: 'bounce 1.4s infinite',
              animationDelay: '0.2s'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#667eea',
              animation: 'bounce 1.4s infinite',
              animationDelay: '0.4s'
            }} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
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
          style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.75)',
            background: 'rgba(255, 255, 255, 0.62)',
            fontSize: '14px',
            opacity: loading ? 0.5 : 1,
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.75)',
            background: 'rgba(255, 255, 255, 0.62)',
            fontWeight: 500,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          {loading ? '...' : '전송'}
        </button>
      </div>
    </div>
  );
}
