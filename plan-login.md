## 테스트 & 스토리북 전략

---

### 테스트 인프라 사전 작업

테스트 코드 작성 전에 아래 작업을 먼저 완료해야 한다.

#### 1. `vitest.setup.ts` 생성 (루트 디렉토리)

현재 `vitest.config.ts`에서 `setupFiles: ['./vitest.setup.ts']`를 참조하지만 파일이 존재하지 않는다.
`@testing-library/jest-dom/vitest`를 import하여 `toBeInTheDocument()` 등 DOM 매처를 등록한다.

#### 2. `@testing-library/jest-dom` 설치

현재 `package.json`에 미포함. dev dependency로 추가 필요.

```bash
npm install -D @testing-library/jest-dom
```

#### 3. vitest include 패턴 확장

Route Handler 테스트와 middleware 테스트가 `app/` 및 루트에 위치하므로 포함 범위를 넓힌다.

```
# 현재
include: ['src/**/*.test.{ts,tsx}']

# 변경
include: ['src/**/*.test.{ts,tsx}', 'app/**/*.test.{ts,tsx}', 'middleware.test.ts']
```

---

### 모듈 테스트 (vitest + @testing-library/react)

단위/통합 테스트는 vitest와 @testing-library/react로 작성한다.

#### 테스트 파일 위치

프로젝트 컨벤션에 따라 소스 파일과 같은 디렉토리에 `*.test.ts(x)` 파일을 배치한다.
(`__tests__/` 서브폴더 방식은 사용하지 않는다 — Button 컴포넌트 기존 패턴 준수)

```
src/shared/api/
├── authStore.ts
├── authStore.test.ts
├── axiosInstance.ts
├── axiosInstance.test.ts
└── ...

src/features/auth/
├── model/
│   ├── useAuth.ts
│   ├── useAuth.test.ts
│   ├── useAuthInit.ts
│   ├── useAuthInit.test.ts
│   ├── useLoginModal.ts
│   ├── useLoginModal.test.ts
│   ├── usePopupOAuth.ts
│   ├── usePopupOAuth.test.ts
│   ├── useRequireAuth.ts
│   └── useRequireAuth.test.ts
└── ui/
    ├── LoginButton.tsx
    ├── LoginButton.test.tsx
    ├── LoginButton.stories.tsx
    ├── AuthInitializer.tsx
    ├── AuthInitializer.test.tsx
    └── social-login/
        ├── SocialLoginButton.tsx
        ├── SocialLoginButton.test.tsx
        ├── SocialLoginButton.stories.tsx
        └── type.ts

src/widgets/auth/
└── ui/
    ├── LoginModal.tsx
    ├── LoginModal.test.tsx
    └── LoginModal.stories.tsx

src/pages/login/
└── ui/
    ├── LoginPage.tsx
    └── LoginPage.test.tsx

app/auth/
├── google/
│   ├── route.ts
│   └── route.test.ts
├── callback/
│   ├── route.ts
│   └── route.test.ts
├── refresh/
│   ├── route.ts
│   └── route.test.ts
└── logout/
    ├── route.ts
    └── route.test.ts

middleware.ts
middleware.test.ts
```

#### 대상별 테스트 내용

##### Shared Layer

**`authStore.test.ts`** — Zustand store 상태 관리

Zustand store는 `getState()`/`setState()`로 React 외부에서 직접 테스트 가능. `renderHook` 불필요.

- 초기 상태: `accessToken`이 `null`, `user`가 `null`, `isInitializing`이 `true`
- `setAuth` 호출 시 AT, user 설정이 정상 동작하는지
- `reset` 호출 시 AT, user가 `null`로 초기화되는지
- `setInitializing` 호출 시 `isInitializing` 플래그 전환이 올바른지
- `getState()`로 React 외부에서 접근 가능한지

**`axiosInstance.test.ts`** — Interceptor 로직

모듈 레벨 변수(`isRefreshing`, `failedQueue`)가 테스트 간 공유되므로 `vi.resetModules()` + 동적 import로 격리하거나, describe 블록 내 순서를 관리한다.

- Request interceptor: AT가 있을 때 `Authorization: Bearer {AT}` 헤더 자동 주입
- Request interceptor: AT가 없을 때 헤더 미포함
- Response interceptor: 401 이외 에러는 그대로 reject
- Response interceptor: 401 응답 시 `/auth/refresh` 호출 후 새 토큰으로 재시도
- Response interceptor: refresh 실패 시 `authStore.reset()` 호출
- 동시 401 처리: 여러 요청이 동시에 401을 받을 때 refresh는 한 번만 호출되고, 대기열의 요청들이 새 AT로 재시도되는지

모킹: `vi.mock('axios')` 또는 `axios-mock-adapter` 사용. `useAuthStore`는 `beforeEach`에서 reset.

##### Feature Model Layer

**`useAuth.test.ts`** — 인증 인터페이스 훅

`renderHook` 사용. `authStore` 상태를 `useAuthStore.setState()`로 직접 설정.

- `isAuthenticated`가 AT 존재 시 `true`, 미존재 시 `false` 반환
- `isInitializing`이 `authStore.isInitializing` 반영
- `user`가 `authStore.user` 반영
- `logout` 호출 시 authStore 초기화 + `fetch('/auth/logout', { method: 'POST' })` 호출
- `logout` 시 fetch 실패해도 에러 전파 없음 (store는 정상 reset)

모킹: `vi.spyOn(globalThis, 'fetch')`

**`useAuthInit.test.ts`** — AT 복원 훅

- 마운트 시 `fetch('/auth/refresh', { method: 'POST' })` 호출
- 성공 시 AT + user가 authStore에 저장되는지
- 실패 시 (fetch reject) 비로그인 상태 유지
- 실패 시 (response not ok) 비로그인 상태 유지
- `isInitializing` 상태 전환: `true` → `false`

모킹: `vi.spyOn(globalThis, 'fetch')`

**`useLoginModal.test.ts`** — 모달 상태 store

Zustand store이므로 `getState()`로 직접 테스트.

- 초기 상태: `isOpen`이 `false`
- `open()` 호출 시 `isOpen`이 `true`
- `close()` 호출 시 `isOpen`이 `false`
- `open()` → `close()` 전환이 정상 동작

**`usePopupOAuth.test.ts`** — OAuth 팝업 핸들러

브라우저 API(window.open, postMessage, setInterval) 의존이 높은 훅.

- `handleClick` 호출 시 `window.open` 호출 (올바른 apiPath, popupName, 크기 파라미터)
- `handleClick` 후 `isLoading`이 `true`
- 팝업 차단 시 (`window.open` returns `null`) error 상태 설정 + `isLoading` `false`
- `postMessage` AUTH_SUCCESS 수신 시 `authStore.setAuth` + `loginModal.close` + `isLoading` `false`
- `postMessage` AUTH_ERROR 수신 시 error 상태 설정 + `isLoading` `false`
- 다른 origin의 메시지 무시
- 팝업 `closed` 감지 시 `isLoading` `false`

모킹: `vi.spyOn(window, 'open')`, `window.dispatchEvent(new MessageEvent(...))`, `vi.useFakeTimers()`

**`useRequireAuth.test.ts`** — Protected route 훅

- 인증됨 + 초기화 완료: 모달 오픈하지 않음
- 미인증 + 초기화 완료: 로그인 모달 오픈
- 초기화 중: 모달 오픈하지 않음 (대기)
- `isInitializing` `true` → `false` 전환 시 미인증이면 모달 오픈

##### Feature UI Layer

**`LoginButton.test.tsx`** — 인증 상태 버튼

- 초기화 중: disabled 상태의 "로딩중..." 버튼 렌더링
- 로그인 상태: "로그아웃" 버튼 + `UserAvatar` 렌더링, 클릭 시 `logout` 호출
- 비로그인 상태: "로그인" 버튼 렌더링, 클릭 시 로그인 모달 오픈

모킹: `vi.mock('@/features/auth/model/useAuth')`, `vi.mock('@/features/auth/model/useLoginModal')`, `vi.mock('@/features/userStatus/ui/UserAvatar')`

**`AuthInitializer.test.tsx`** — 초기화 컴포넌트

- 마운트 시 `useAuthInit` 호출
- UI를 렌더링하지 않음 (`container.innerHTML`이 비어있음)

모킹: `vi.mock('../model/useAuthInit')`

**`SocialLoginButton.test.tsx`** — 소셜 로그인 버튼

순수 프레젠테이셔널 컴포넌트. 모킹 불필요.

- `label` prop 텍스트가 버튼에 렌더링
- `icon` ReactNode가 버튼 내부에 렌더링
- 클릭 시 `onClick` 호출
- `disabled` 시 disabled 속성 + 클릭 미동작
- `disabled` 미전달 시 기본값 `false`

##### Widget Layer

**`LoginModal.test.tsx`** — 로그인 모달

- `loginModal.isOpen`이 `true`일 때 다이얼로그 렌더링 (로고, 타이틀, 두 개의 SocialLoginButton)
- `loginModal.isOpen`이 `false`일 때 미렌더링
- YouTube 로그인 버튼 존재 확인
- Google 로그인 버튼 존재 확인
- 다이얼로그 닫기 동작 시 `loginModal.close()` 호출
- `usePopupOAuth` 에러 반환 시 에러 텍스트 표시

모킹: `vi.mock('@/features/auth')`, `useLoginModal` store 상태 직접 설정

주의: shadcn Dialog는 Radix Portal을 사용. jsdom에서 `document.body`가 존재하면 정상 동작하지만, `role="dialog"` 쿼리 실패 시 `baseElement` 활용 검토.

##### Page Layer

**`LoginPage.test.tsx`** — 로그인 페이지

- 컴포넌트 출력이 비어있음 (null 반환)
- 마운트 시 `loginModal.open()` 호출
- `router.replace('/')` 호출

모킹: `vi.mock('next/navigation')`, `vi.mock('@/features/auth')`

##### Route Handler Layer

Next.js 서버 API(`NextRequest`, `NextResponse`, `cookies()`)를 사용하므로 `@testing-library/react` 불필요. 순수 async 함수로 단위 테스트.

**`app/auth/google/route.test.ts`** — OAuth 시작

- 랜덤 state 생성 후 쿠키에 저장
- Google OAuth URL로 302 리다이렉트 반환 (client_id, redirect_uri, scope, state 포함)

모킹: `vi.spyOn(crypto, 'randomUUID')`, `vi.mock('next/headers')`

**`app/auth/callback/route.test.ts`** — OAuth 콜백

- Google 에러 파라미터 존재 시 AUTH_ERROR postMessage HTML 반환
- state 불일치 시 AUTH_ERROR postMessage HTML 반환
- code 누락 시 AUTH_ERROR postMessage HTML 반환
- 백엔드 성공 시 `__Host-refresh-token` 쿠키 설정 + AUTH_SUCCESS postMessage HTML 반환
- 백엔드 실패 시 AUTH_ERROR postMessage HTML 반환

모킹: `vi.mock('next/headers')`, `vi.spyOn(globalThis, 'fetch')`

**`app/auth/refresh/route.test.ts`** — AT 갱신

- RT 쿠키 없으면 401 반환
- 백엔드 성공 시 새 쿠키 설정 + `{ accessToken, user }` 반환
- 백엔드 실패 시 쿠키 삭제 + 401 반환
- 네트워크 에러 시 500 반환

모킹: `vi.mock('next/headers')`, `vi.spyOn(globalThis, 'fetch')`

**`app/auth/logout/route.test.ts`** — 로그아웃

- RT 쿠키 존재 시 백엔드 로그아웃 호출 + 쿠키 삭제
- RT 쿠키 미존재 시에도 쿠키 삭제 (멱등)
- 백엔드 실패 시에도 쿠키 삭제 + 성공 반환

모킹: `vi.mock('next/headers')`, `vi.spyOn(globalThis, 'fetch')`

주의: Next.js 16에서 `cookies()`는 async. mock은 Promise를 반환해야 한다.

##### Root Level

**`middleware.test.ts`** — Protected route

- 비보호 경로: `NextResponse.next()` 반환
- 보호 경로 + RT 쿠키 없음: `/?login=true`로 리다이렉트
- 보호 경로 + RT 쿠키 있음: `NextResponse.next()` 반환
- 중첩 보호 경로 (`/dashboard/stats` 등)도 보호 적용
- `config.matcher` export가 예상 패턴과 일치

모킹: `NextRequest` 객체 직접 생성 (nextUrl, cookies 제어)

#### 모듈 테스트 작성 예시

```typescript
// src/shared/api/authStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './authStore'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.getState().reset()
  })

  it('AT와 user를 설정할 수 있다', () => {
    const user = { id: '1', name: 'Test', email: 'test@test.com', profileImage: '' }
    useAuthStore.getState().setAuth('token123', user)

    const state = useAuthStore.getState()
    expect(state.accessToken).toBe('token123')
    expect(state.user).toEqual(user)
  })

  it('초기화 시 상태가 리셋된다', () => {
    useAuthStore.getState().setAuth('token', { id: '1', name: '', email: '', profileImage: '' })
    useAuthStore.getState().reset()

    const state = useAuthStore.getState()
    expect(state.accessToken).toBeNull()
    expect(state.user).toBeNull()
  })
})
```

```typescript
// src/widgets/auth/ui/LoginModal.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginModal } from './LoginModal'
import { useLoginModal } from '@/features/auth'

describe('LoginModal', () => {
  it('open 상태일 때 모달이 렌더링된다', () => {
    useLoginModal.setState({ isOpen: true })
    render(<LoginModal />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('close 상태일 때 모달이 렌더링되지 않는다', () => {
    useLoginModal.setState({ isOpen: false })
    render(<LoginModal />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
```

---

### 스토리북 전략

Storybook v10 + @storybook/nextjs-vite 기반으로 작성한다.
**UI 컴포넌트만 스토리북 대상**이며, 훅/스토어/Route Handler/타입 파일은 제외한다.

#### 스토리 파일 위치

소스 파일과 같은 디렉토리에 `*.stories.tsx` 파일을 배치한다. (Button 컴포넌트 기존 패턴 준수)

#### 스토리북 타이틀 규칙 (FSD 기반)

FSD 레이어명을 첫 번째 카테고리, 도메인을 두 번째 카테고리로 사용한다.

| 컴포넌트 | title |
|---|---|
| SocialLoginButton | `'Features/Auth/SocialLoginButton'` |
| LoginButton | `'Features/Auth/LoginButton'` |
| LoginModal | `'Widgets/Auth/LoginModal'` |

기존 Button 스토리(`'Widgets/Button'`)와 동일한 계층 구조를 따르되, auth 도메인을 중간 레벨로 추가한다.

#### 스토리 제외 컴포넌트

| 컴포넌트 | 제외 이유 |
|---|---|
| `AuthInitializer.tsx` | `null` 반환, 시각적 출력 없음 |
| `LoginPage.tsx` | `null` 반환 + 리다이렉트만 수행 |

#### 대상별 스토리 구성

##### `SocialLoginButton.stories.tsx` — 소셜 로그인 버튼

순수 프레젠테이셔널 컴포넌트. Zustand 의존 없음.

```
title: 'Features/Auth/SocialLoginButton'
tags: ['autodocs']
```

| 스토리 | 설명 |
|---|---|
| Default | Google 아이콘 + "Continue with Google" |
| YouTube | YouTube 아이콘 + "Continue with YouTube" |
| Loading | "로그인 중..." 텍스트 + disabled |
| Disabled | disabled 상태 (opacity 감소) |
| Overview | Google/YouTube × 활성/비활성 그리드 |

argTypes: `label` (text), `disabled` (boolean), `onClick` (action)

SVG 아이콘은 인라인 SVG 엘리먼트로 전달한다. (Button.stories.tsx의 ZapBold 패턴 참고)

##### `LoginButton.stories.tsx` — 인증 상태 버튼

Zustand store(`useAuth`, `useLoginModal`)에 의존. decorator에서 상태 주입.

```
title: 'Features/Auth/LoginButton'
tags: ['autodocs']
```

| 스토리 | store 상태 | 설명 |
|---|---|---|
| Loading | `isInitializing: true` | disabled "로딩중..." 버튼 |
| LoggedOut | `isInitializing: false, accessToken: null` | "로그인" 버튼 |
| LoggedIn | `isInitializing: false, accessToken: 'token', user: {...}` | "로그아웃" 버튼 + UserAvatar |

Zustand 상태 주입 방식:
```typescript
decorators: [
  (Story) => {
    useAuthStore.setState({ accessToken: null, user: null, isInitializing: true })
    return <Story />
  }
]
```

주의: `LoginButton`이 `UserAvatar`(`@/features/userStatus`)를 import. 정적 PNG 파일 의존이므로 Storybook nextjs-vite 환경에서 정상 동작해야 하나, 문제 발생 시 mock 처리.

##### `LoginModal.stories.tsx` — 로그인 모달

Zustand store + `usePopupOAuth` 훅에 의존. 가장 복잡한 스토리.

```
title: 'Widgets/Auth/LoginModal'
tags: ['autodocs']
```

| 스토리 | 설명 |
|---|---|
| Open | 모달 표시 (두 로그인 버튼 + 로고 + 타이틀) |
| WithError | 에러 메시지 표시 상태 |

Zustand 상태 주입 방식:
```typescript
decorators: [
  (Story) => {
    useLoginModal.setState({ isOpen: true })
    return <Story />
  }
]
```

에러 상태 표시를 위해서는 `usePopupOAuth` 반환값을 제어해야 한다. 방법:
1. vitest 기반 Storybook 테스트에서 `vi.mock` 사용
2. 또는 store 상태 주입으로 error를 직접 설정하는 래퍼 컴포넌트 생성

#### 스토리북 작성 예시

```typescript
// src/features/auth/ui/social-login/SocialLoginButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SocialLoginButton } from './SocialLoginButton'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    {/* Google icon path */}
  </svg>
)

const meta = {
  title: 'Features/Auth/SocialLoginButton',
  component: SocialLoginButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof SocialLoginButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <GoogleIcon />,
    label: 'Continue with Google',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}
```

---

### Chromatic CI 에러 수정

#### 원인 분석

현재 Chromatic workflow (`.github/workflows/chromatic.yml`)는 `develop` 브랜치 push에서만 트리거된다:

```yaml
on:
  push:
    branches:
      - develop
```

`feature/login` 등 다른 브랜치에서 PR을 생성하면:
- Chromatic check가 워크플로우 트리거 조건에 해당하지 않아 **실행되지 않음**
- GitHub 브랜치 보호 규칙에서 Chromatic이 required check으로 설정되어 있다면, check가 영원히 "In progress" / "Pending" 상태로 남음
- 이것이 **"Chromatic / chromatic (push) In progress - This check has started..."** 가 계속 보이는 원인

#### storybook 로그 파일 삭제와의 관계

`.gitignore`에 `*storybook.log` 패턴이 있어 storybook 로그 파일은 git에 추적되지 않는다. git history에서도 storybook 로그 관련 삭제 커밋이 발견되지 않는다. **storybook 로그 삭제는 Chromatic 실패와 무관하다.**

#### 수정 방안

**방안 A (권장): workflow에 `pull_request` 트리거 추가**

```yaml
on:
  push:
    branches:
      - develop
  pull_request:
    branches:
      - develop
```

이렇게 하면 develop 대상 PR에서도 Chromatic이 실행되어 check가 정상 완료된다.

**방안 B: required check에서 Chromatic 제거**

GitHub 레포 Settings > Branches > Branch protection rules에서 Chromatic을 required check에서 해제한다. 단, 시각적 회귀 테스트를 CI에서 강제하지 않게 되므로 권장하지 않는다.

#### 추가 개선 사항

1. **`chromaui/action@latest` 버전 고정**: `@latest`는 예기치 않은 breaking change 위험. `@v11` 등 특정 메이저 버전으로 고정 권장.
2. **`package.json`의 chromatic 토큰 제거**: `"chromatic": "npx chromatic --project-token=chpt_..."` 형태로 토큰이 하드코딩되어 있음. 환경변수 방식(`CHROMATIC_PROJECT_TOKEN`)으로 변경하거나 스크립트 제거 검토.
