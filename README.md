# 🤖 김비서 (KimBiseo) - Next.js 대시보드

**스마트 업무 브리핑 및 회의 자료 생성 시스템**

최신 Next.js 14 + TypeScript + Tailwind CSS로 구축한 **현대적인 업무 관리 대시보드**입니다.

---

## 🎯 주요 기능

### 📋 통합 대시보드
- **Glassmorphism UI** 디자인으로 현대적 외관
- **다크/라이트 모드** 자동 전환 (localStorage 저장)
- **2×2 그리드 레이아웃**으로 4개 주요 섹션 표시

### 🎨 대시보드 카드
1. **✅ 할 일 목록** - 12개 업무 항목 (우선순위/상태별 분류)
2. **📅 주간 일정** - 월~금 15개 이벤트
3. **📊 프로젝트 진행률** - 6개 프로젝트 현황
4. **💰 매출 요약** - KPI 카드 + 지역별 분포

### 🌓 테마 관리
- 시스템 색상 선호도 자동 감지
- localStorage에 사용자 선택 저장
- 동적 CSS 변수로 테마 전환

### 📱 반응형 디자인
- 📱 **모바일** (< 480px): 1×1 스택
- 📱 **태블릿** (480px ~ 1024px): 2×1 또는 1×1 스택
- 🖥️ **데스크톱** (1024px+): 2×2 그리드

---

## 🚀 빠른 시작

### 전제 조건
- **Node.js 18.17+** 필요
- npm 또는 yarn

### 설치 및 실행

```bash
# 프로젝트 디렉토리로 이동
cd kimbiseo

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에서 [`http://localhost:3000`](http://localhost:3000) 열기 🎉

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

---

## 📁 프로젝트 구조

```
kimbiseo/
├── app/                           # Next.js App Router
│   ├── globals.css                # 전역 스타일
│   ├── layout.tsx                 # 루트 레이아웃
│   └── page.tsx                   # 메인 페이지
│
├── components/
│   ├── common/                    # 재사용 컴포넌트
│   │   ├── Card.tsx               # 글래스모피즘 카드
│   │   ├── Badge.tsx              # 배지 컴포넌트
│   │   └── ThemeProvider.tsx      # 테마 관리
│   ├── layout/
│   │   └── Header.tsx             # 헤더 (로고, 테마 토글)
│   ├── dashboard/                 # 대시보드 카드들
│   │   ├── Dashboard.tsx
│   │   ├── TodoCard.tsx
│   │   ├── ScheduleCard.tsx
│   │   ├── ProjectCard.tsx
│   │   └── SalesCard.tsx
│   └── hooks/
│       └── useTheme.ts            # 테마 훅
│
├── lib/
│   ├── types.ts                   # TypeScript 인터페이스
│   ├── constants.ts               # 색상, 매핑, 함수
│   └── mockData/                  # Mock 데이터
│       ├── todos.ts               # 11개 업무
│       ├── schedule.ts            # 주간 일정
│       ├── projects.ts            # 6개 프로젝트
│       └── sales.ts               # 30개 판매 거래
│
├── public/                        # 정적 자산
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .eslintrc.json
```

---

## 🛠️ 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 14+ | React 프레임워크 (App Router) |
| **React** | 18+ | UI 라이브러리 |
| **TypeScript** | 5+ | 타입 안전성 |
| **Tailwind CSS** | 3.3+ | 유틸리티 CSS |
| **CSS Variables** | 네이티브 | 테마 관리 |

---

## 📊 Mock 데이터 명세

### 📋 업무 (11개)
- 우선순위: HIGH(3), MEDIUM(4), LOW(5)
- 상태: TODO, IN_PROGRESS, DONE
- 담당자: 김대리, 이과장, 박사원, 정팀장

### 📅 일정 (15개)
- 기간: 2026년 3월 10~14일 (월~금)
- 칩 유형: normal, urgent, special

### 📊 프로젝트 (6개)
- 진행률: 10% ~ 80%
- 상태: PLANNING, PREPARING, IN_PROGRESS, FINALIZING
- 총 예산: 2,450만원

### 💰 매출 (30개 거래)
- 기간: 2026년 1월~2월
- 총 매출: 75,187,000원
- 제품: 6종류 (무선 이어폰, 보조배터리, 텀블러 등)

---

## 🎨 색상 시스템

### 라이트 모드
```
배경: #667eea → #764ba2 → #f093fb → #f5576c
텍스트: #1a1a2e (주), #555577 (보조)
카드: rgba(255, 255, 255, 0.62) with blur(20px)
```

### 다크 모드
```
배경: #0f0f23 → #1a1040 → #0d1b3e → #160d2e
텍스트: #e0e0e0 (주), #a0a0c0 (보조)
카드: rgba(255, 255, 255, 0.055) with blur(20px)
```

---

## 📝 사용 가능한 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 프로젝트 실행
npm run start

# ESLint 검사
npm run lint
```

---

## 🔄 디렉토리 구조 생성

처음부터 새 프로젝트를 만들려면:

```bash
npx create-next-app@latest kimbiseo \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --import-alias '@/*' \
  --no-git

cd kimbiseo
npm install
npm run dev
```

---

## 🌐 배포

### Vercel 배포 (권장)

```bash
# 1. GitHub에 푸시
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo>
git push -u origin main

# 2. https://vercel.com에서 배포
```

### 기타 호스팅
- Netlify
- AWS Amplify
- Railway
- Render

---

## 🎯 향후 개선사항

- [ ] 실시간 데이터 동기화 (API 연동)
- [ ] 데이터베이스 통합 (PostgreSQL)
- [ ] 사용자 인증 (OAuth)
- [ ] 고급 필터링 및 검색
- [ ] 이메일 자동 발송
- [ ] 모바일 앱 버전 (React Native)
- [ ] 다국어 지원 (EN, JA, ZH)

---

## 📞 문의 및 피드백

- 🐛 버그 리포트: GitHub Issues
- 💡 기능 제안: GitHub Discussions
- 📧 이메일: support@example.com

---

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

**개발자:** Claude (Anthropic)  
**생성일:** 2026년 4월 24일  
**버전:** 1.0.0

---

## 🎓 학습 자료

이 프로젝트에서 배울 수 있는 것들:
- ✅ Next.js 14 App Router 사용
- ✅ TypeScript 타입 안전성
- ✅ Tailwind CSS 유틸리티 활용
- ✅ React Context API (테마 관리)
- ✅ 컴포넌트 아키텍처 설계
- ✅ Mock 데이터 관리
- ✅ 반응형 디자인
- ✅ 성능 최적화

Happy coding! 🚀
