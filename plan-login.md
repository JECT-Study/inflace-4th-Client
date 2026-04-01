## 테스트 전략

### 모듈 테스트 (vitest + @testing-library/react)

단위/통합 테스트는 vitest와 @testing-library/react로 작성한다.

#### 테스트 파일 위치

각 파일과 같은 디렉토리에 `__tests__/` 폴더를 두거나 `*.test.ts(x)` 파일을 배치한다.

```
src/features/auth/
├── model/
│   ├── __tests__/
│   │   ├── useAuth.test.ts
│   │   ├── useAuthInit.test.ts
│   │   └── useRequireAuth.test.ts
│   └── ...
└── ui/
    ├── __tests__/
    │   ├── AuthStatusButton.test.tsx
    │   ├── GoogleLoginButton.test.tsx
    │   ├── LoginModal.test.tsx
    │   └── AuthInitializer.test.tsx
    └── ...

src/shared/api/
├── __tests__/
│   ├── authStore.test.ts
│   └── axiosInstance.test.ts
└── ...
```

#### 대상별 테스트 내용

**`authStore.test.ts`** — Zustand store 상태 관리

- AT, user 설정/초기화가 정상 동작하는지
- `isInitializing` 플래그 전환이 올바른지
- `getState()`로 React 외부에서 접근 가능한지

**`axiosInstance.test.ts`** — Interceptor 로직

- Request interceptor: AT가 있을 때 Authorization 헤더 자동 주입
- Request interceptor: AT가 없을 때 헤더 미포함
- Response interceptor: 401 응답 시 `/api/auth/refresh` 호출 후 재시도
- Response interceptor: refresh 실패 시 authStore 초기화
- 동시 401 처리: 여러 요청이 동시에 401을 받을 때 refresh는 한 번만 호출되고, 대기열의 요청들이 새 AT로 재시도되는지

**`useAuth.test.ts`** — 인증 인터페이스 훅

- `isAuthenticated`가 AT 존재 여부에 따라 올바르게 반환되는지
- `logout` 호출 시 authStore 초기화 + `/api/auth/logout` 호출

**`useAuthInit.test.ts`** — AT 복원 훅

- 마운트 시 `/api/auth/refresh` 호출
- 성공 시 AT + user가 authStore에 저장되는지
- 실패 시 비로그인 상태 유지
- `isInitializing` 상태 전환 (true → false)

**`useRequireAuth.test.ts`** — Protected route 훅

- 인증됨 + 초기화 완료: 아무 동작 없음
- 미인증 + 초기화 완료: 로그인 모달 오픈
- 초기화 중: 모달 오픈하지 않음 (대기)

**`GoogleLoginButton.test.tsx`** — Google 로그인 버튼

- 클릭 시 `window.open` 호출
- `postMessage`로 AUTH_SUCCESS 수신 시 authStore 업데이트 + 모달 닫기
- AUTH_ERROR 수신 시 에러 메시지 표시
- 팝업 차단 시 안내 메시지 표시

**`LoginModal.test.tsx`** — 로그인 모달

- 모달 open 상태일 때 렌더링
- 모달 close 상태일 때 미렌더링
- GoogleLoginButton 포함 여부
- 에러 메시지 표시

**`AuthStatusButton.test.tsx`** — 인증 상태 버튼

- 로그인 상태: 사용자 정보 표시 + 로그아웃 동작
- 비로그인 상태: 로그인 버튼 표시 + 클릭 시 모달 오픈
- 초기화 중: 로딩 상태 표시

**`AuthInitializer.test.tsx`** — 초기화 컴포넌트

- 마운트 시 `useAuthInit` 호출
- UI를 렌더링하지 않음 (`null` 반환)

#### 모듈 테스트 작성 예시

```typescript
// src/shared/api/__tests__/authStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../authStore'

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
// src/features/auth/ui/__tests__/LoginModal.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginModal } from '../LoginModal'

describe('LoginModal', () => {
  it('open 상태일 때 모달이 렌더링된다', () => {
    // 모달 store를 open 상태로 설정
    render(<LoginModal />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('close 상태일 때 모달이 렌더링되지 않는다', () => {
    render(<LoginModal />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
```
