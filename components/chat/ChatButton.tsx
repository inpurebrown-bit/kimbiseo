'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GREETING = '안녕하세요! 👋 김비서입니다. 업무, 일정, 프로젝트, 매출에 대해 무엇이든 물어보세요!';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: GREETING,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const callGeminiAPI = async (userInput: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return '⚠️ API 키가 설정되지 않았습니다. Vercel에서 NEXT_PUBLIC_GEMINI_API_KEY를 설정해주세요.';
    }

    const systemContext = `당신은 김비서(KimBiseo) 업무 관리 대시보드의 AI 어시스턴트입니다.
현재 대시보드 현황:
- 할 일: 11개 (우선순위 높음 3개, 보통 4개, 낮음 4개)
- 프로젝트: 6개 (평균 진행률 42.5%)
- 이번 주 일정: 15개 이벤트 (3/10~3/14)
- 총 매출: 75,187,000원 (1월 4,275만원, 2월 3,243만원)
- 주요 제품: 무선 이어폰 (매출 1위)

사용자의 질문에 친절하고 전문적으로 답변하세요. 간결하게 핵심만 답변하고, 이모지를 적절히 사용하세요.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemContext}\n\n사용자: ${userInput}` },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API 에러:', errorData);
        return `⚠️ API 오류: ${errorData.error?.message || '알 수 없는 오류'}`;
      }

      const data = await response.json();
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

      return textContent || '답변을 받지 못했습니다. 다시 시도해주세요.';
    } catch (error) {
      console.error('Gemini API 호출 오류:', error);
      return `⚠️ 네트워크 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

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

    try {
      const response = await callGeminiAPI(userInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 플로팅 채팅 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 9998,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="채팅 열기"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* 채팅 모달 */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '110px',
            right: '30px',
            zIndex: 9999,
            width: '380px',
            height: '560px',
            maxWidth: 'calc(100vw - 60px)',
            maxHeight: 'calc(100vh - 140px)',
            background: 'rgba(30, 30, 60, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                🤖 김비서 AI
              </h3>
              <p style={{ fontSize: '11px', opacity: 0.9, margin: '2px 0 0 0' }}>
                Powered by Gemini 2.5 Flash
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>

          {/* 메시지 영역 */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    background:
                      message.role === 'user'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'rgba(255, 255, 255, 0.1)',
                    color: message.role === 'user' ? 'white' : '#e0e0e0',
                    borderBottomRightRadius: message.role === 'user' ? '2px' : '12px',
                    borderBottomLeftRadius: message.role === 'user' ? '12px' : '2px',
                  }}
                >
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message.content}</p>
                  <p
                    style={{
                      fontSize: '10px',
                      opacity: 0.6,
                      marginTop: '4px',
                      margin: '4px 0 0 0',
                    }}
                  >
                    {message.timestamp.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#a78bfa',
                      animation: 'bounce 1.4s infinite',
                    }}
                  />
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#a78bfa',
                      animation: 'bounce 1.4s infinite 0.2s',
                    }}
                  />
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#a78bfa',
                      animation: 'bounce 1.4s infinite 0.4s',
                    }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 질문 */}
          {messages.length === 1 && (
            <div
              style={{
                padding: '0 16px 8px',
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
              }}
            >
              {['할 일 알려줘', '오늘 일정은?', '매출 현황', '프로젝트 진행률'].map(
                (q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#e0e0e0',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '16px',
                      cursor: 'pointer',
                    }}
                  >
                    {q}
                  </button>
                )
              )}
            </div>
          )}

          {/* 입력 영역 */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="무엇이든 물어보세요..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: '14px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#e0e0e0',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 500,
                background: loading || !input.trim()
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              {loading ? '...' : '전송'}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
