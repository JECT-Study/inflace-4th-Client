# CLAUDE.md — Inflace 프로젝트 개발 가이드

## 기본 지시사항

- **소통 언어**: 모든 설명, 질문, 답변은 한국어로 진행
- **코드 작성 금지**: 별도의 명시적 지시가 있을 때까지 코드를 작성하지 않음
- **CLAUDE.md 우선 참조**: 세션 내 작업 시 전체 파일을 탐색하지 않고, 이 파일을 기반으로 맥락을 파악하여 작업 진행

---

## 프로젝트 개요

- **프로젝트명**: Inflace (Impact + Influence)
- **미션**: "임팩트 있는 인플루언서를 찾기 + 되기" 두 가지 문제를 동시에 해결
- **도메인**: 유튜브 중심 데이터 기반 인플루언서 인텔리전스 플랫폼
- **스코프**: 프론트엔드 전용 프로젝트 (백엔드 로직은 다루지 않음)
- **배포**: Vercel

### 타겟 사용자
- **인플루언서**: 채널 성장 인사이트 확보 및 수익화 기회 발굴
- **브랜드/마케터**: 신뢰 가능한 인플루언서 빠르게 탐색

---

## 핵심 기능

| 기능 | 설명 |
|------|------|
| 인플루언서 탐색 | 카테고리/구독자/참여율 기반 데이터 검색 |
| 채널 성장 인사이트 | 조회수/참여율 시계열 분석 |
| Fraud Detection | 신뢰도 분석 (가짜 데이터 탐지) |
| Impact Score | 채널 영향력 지표 산출 |
| 경쟁사 협업 분석 | 경쟁 브랜드가 협업한 인플루언서 분석 |
| AI 캠페인 & 콘텐츠 지원 | 브랜드/인플루언서 맞춤 캠페인 기획 및 콘텐츠 제작 (Post-MVP) |
| 매거진 | 인플루언서 수익 다각화·팬덤 구축 꿀팁 발행 |

---

## 제품 로드맵

- **Phase 1**: 채널 분석 & 인플루언서 검색
- **Phase 2**: 영향력 점수 & Fraud Detection
- **Phase 3**: 결제 시스템
- **Phase 4**: AI 콘텐츠 지원
- **Phase 5**: 매거진 & 인사이트 허브

---

## 기술 스택

### 코어
- **프레임워크**: Next.js (App Router)
- **UI**: React 19
- **타입**: TypeScript 5

### 스타일
- **CSS**: TailwindCSS v4
- **컴포넌트**: shadcn/ui
- **문서**: StoryBook
- **애니메이션**: motion (framer-motion)

### 상태 & 데이터
- **서버 상태**: TanStack Query
- **클라이언트 상태**: Zustand
- **HTTP**: Axios

### 폼 & 유효성 검사
- react-hook-form
- zod

### 차트
- recharts

### 테스트
- **모듈 테스트**: vitest, @testing-library/react
- **E2E 테스트**: playwright

---

## FSD 파일 구조

본 프로젝트는 **Feature-Sliced Design(FSD)** 아키텍처를 사용합니다.

```
Inflace-4th-Client/
├── app/                    # Next.js App Router (라우팅 re-export 전용)
│   ├── layout.ts           # src/app/layouts/RootLayout re-export
│   ├── page.ts             # src/pages/home/HomePage re-export
│   └── [route]/
│       └── page.ts         # 각 FSD 페이지 컴포넌트 re-export
│
└── src/                    # FSD 소스 코드
    ├── app/                # App Layer: 공유 레이아웃 & 전역 설정
    │   ├── layouts/        # RootLayout 등
    │   └── styles/         # globals.css 등
    ├── pages/              # Page Layer: 페이지 단위 컴포넌트
    │   └── [page-name]/
    │       ├── index.ts    # 공개 API (re-export)
    │       └── ui/         # 페이지 컴포넌트
    ├── widgets/            # Widget Layer: 독립적인 복합 블록
    ├── features/           # Feature Layer: 사용자 인터랙션 기능
    │   └── [feature-name]/
    │       ├── index.ts
    │       └── ui/
    ├── entities/           # Entity Layer: 비즈니스 엔티티
    └── shared/             # Shared Layer: 공통 유틸/상수/타입
```

### FSD + Next.js App Router 충돌 해결 방식
> FSD 공식 문서 기준

Next.js App Router는 파일 시스템 기반 라우팅을 위해 `app/` 폴더를 사용하지만, 이는 FSD의 평탄한 slice 구조와 충돌할 수 있습니다.

**해결 방식:**
- `app/` 폴더는 라우팅 전용 — FSD 컴포넌트를 직접 작성하지 않음
- `app/[route]/page.ts`에서 `src/pages/[page]/index.ts`를 re-export
- FSD의 Page Layer 폴더명이 `pages`이며, Next.js `app/` 라우팅과 분리되어 관리됨

---

## 제약 사항

- YouTube Data API v3 일일 할당량 제한 고려 필요
- Fraud Detection AI 모델 정확도는 지속적 개선 필요
- 디자인 시안: **26.03.07 이후 제공 예정** 
- 초기 인플루언서 DB 구축 필요

---

## 코드 컨벤션

- **Path Alias**: `@/*` → `./src/*`
- **포매팅**: Prettier (semi: false, singleQuote: true, tabWidth: 2)
- **린팅**: ESLint (Next.js Core Web Vitals + TypeScript)
- **컴포넌트 파일**: PascalCase (예: `LoginPage.tsx`)
- **인덱스 파일**: 각 슬라이스의 공개 API는 `index.ts`로 re-export

---

## 절대 하지 말아야 할 것

- 말한 것 이상으로 개발하지 않기
- 기능 추가 시 기존 기능 깨뜨리지 않기
- .env 파일에 실제 값 넣지 않기


---

## 주요 파일 경로

| 역할 | 경로 |
|------|------|
| 루트 레이아웃 | `src/app/layouts/index.tsx` |
| 전역 스타일 | `src/app/styles/globals.css` |
| 홈 페이지 | `src/pages/home/ui/HomePage.tsx` |
| 로그인 페이지 | `src/pages/login/ui/LoginPage.tsx` |
| Next.js 설정 | `next.config.ts` |
| TypeScript 설정 | `tsconfig.json` |
| Prettier 설정 | `.prettierrc` |
