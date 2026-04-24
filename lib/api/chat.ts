// ==================== Google Gemini API 채팅 ====================

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Google Gemini API를 통해 AI 응답 생성
 */
export async function generateAIResponse(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_GEMINI_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error('Google API 키가 설정되지 않았습니다.');
  }

  // 대화 기록을 포맷팅
  const messages = conversationHistory.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  // 새 메시지 추가
  messages.push({
    role: 'user',
    parts: [{ text: userMessage }],
  });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      }),
      headers: {
        'x-goog-api-key': apiKey,
      } as any,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API 오류: ${response.status} - ${errorData.error?.message || '알 수 없는 오류'}`
      );
    }

    const data = await response.json();

    // Gemini API 응답 파싱
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('AI 응답을 받지 못했습니다.');
    }

    return textContent;
  } catch (error) {
    console.error('AI API 호출 오류:', error);
    throw error;
  }
}

/**
 * 시스템 프롬프트와 함께 컨텍스트 기반 응답 생성
 */
export async function generateContextualResponse(
  userMessage: string,
  systemPrompt: string,
  conversationHistory: Message[] = []
): Promise<string> {
  // 시스템 프롬프트를 첫 번째 메시지로 추가
  const enhancedHistory = [
    {
      id: 'system',
      role: 'user' as const,
      content: systemPrompt,
      timestamp: new Date(),
    },
    ...conversationHistory,
  ];

  return generateAIResponse(userMessage, enhancedHistory);
}

/**
 * 대시보드 컨텍스트 기반 채팅
 */
export async function generateDashboardContextResponse(
  userMessage: string,
  dashboardData?: {
    todoCount?: number;
    projectCount?: number;
    totalSales?: number;
    averageProgress?: number;
  },
  conversationHistory: Message[] = []
): Promise<string> {
  const systemPrompt = `당신은 김비서(KimBiseo) 업무 관리 대시보드의 AI 어시스턴트입니다.
사용자의 업무, 일정, 프로젝트, 매출에 대해 친절하고 전문적으로 도움을 드립니다.

현재 대시보드 현황:
- 할 일: ${dashboardData?.todoCount || 0}개
- 프로젝트: ${dashboardData?.projectCount || 0}개
- 총 매출: ${dashboardData?.totalSales ? dashboardData.totalSales.toLocaleString() : '0'}원
- 평균 진행률: ${dashboardData?.averageProgress || 0}%

자연스럽고 도움이 되는 조언을 제공하세요.`;

  return generateContextualResponse(userMessage, systemPrompt, conversationHistory);
}
