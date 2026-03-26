# Plan: 로그인 및 토큰 관리 시스템

구글 로그인을 구현할 예정이며 관련 정보는
https://developers.google.com/identity/protocols/oauth2?hl=ko#scope-response
를 참고하여 로직 설계를 계획한다.

## FSD 패턴에 맞게 어떤 파일을 생성하고 어떻게 동작하는지 플로우를 설계한다.

서비스에서는 백엔드가 인증을 담당하고 자체 발급한 토큰(엑세스 토큰/ 리프레시 토큰)으로 API를 보호한다.
프론트엔드가 구글 토큰을 저장할 이유가 없으며, 백엔드가 발급한 토큰만 관리하면 된다.

---

## 주요 설계 결정 사항

| 결정               | 선택                                        | 이유                                                                |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------- |
| OAuth 방식         | **Authorization Code Flow + Route Handler** | 외부 스크립트 의존 없이 서버 사이드에서 안전하게 처리               |
| 로그인 UI          | **모달**                                    | 페이지 전환 없이 어디서든 로그인 가능                               |
| OAuth UX           | **팝업 창**                                 | 현재 페이지를 떠나지 않아 UX가 부드러움                             |
| FSD authStore 위치 | **shared/api/**                             | interceptor와 같은 레이어에 두어 FSD 의존성 역전 방지 (실용적 접근) |
| /login 페이지      | **폴백으로 유지**                           | 외부 링크/미인증 redirect 시 홈으로 이동 + 모달 오픈                |
| 백엔드 API         | **미확정**                                  | 프론트에서 예상 스펙 먼저 정의, 추후 백엔드와 맞춤                  |

---

## 사용 기술과 이유

### Next.js Route Handler (Authorization Code Flow)

**역할:** Google OAuth 플로우 직접 처리

Next.js Route Handler에서 Google OAuth Authorization Code Flow를 직접 구현한다.

**Route Handler로 직접 구현하는 방식:**

- `app/api/auth/google/route.ts`에서 state(CSRF 방지) 생성 + Google Authorization URL로 리다이렉트
- `app/api/auth/callback/route.ts`에서 state 검증 + authorization code를 백엔드에 전달
- CSRF 방지용 state 파라미터는 httpOnly 쿠키에 임시 저장하여 검증

---

### Zustand

**역할:** 클라이언트 메모리에 AT(Access Token) + 유저 정보 + 초기화 상태 보관

AT는 수명이 짧아(1시간) 잦은 갱신이 필요하다. 빠른 접근이 중요하고, 페이지 새로고침 시 어차피 재발급받으므로 브라우저 저장소(localStorage 등)에 저장할 필요가 없다. Zustand는 자바스크립트 메모리에 상태를 보관하므로 XSS 공격으로 탈취될 위험이 낮다.

**상태 구조:** `{ accessToken, user, isInitializing }`

- `isInitializing`: 앱 마운트 시 AT 복원 진행 중 여부. 초기화 중 UI 깜빡임(flash) 방지에 사용

---

### httpOnly 쿠키 (`__Host-refresh-token`)

**역할:** RT(Refresh Token) 보관

RT는 수명이 길어(14일) 탈취되면 장기 세션을 빼앗긴다. localStorage에 저장하면 XSS 공격으로 접근 가능하지만, httpOnly 쿠키는 자바스크립트로 읽을 수 없어 안전하다. 브라우저가 해당 도메인에 요청을 보낼 때 자동으로 쿠키를 포함하므로, 프론트엔드 코드에서 RT를 직접 다룰 필요도 없다.

---

### Axios + Interceptor

**역할:** 모든 API 요청/응답의 공통 처리

fetch를 직접 사용하면 API를 호출하는 모든 곳에서 Authorization 헤더 추가, 401 처리, 토큰 갱신 코드를 반복 작성해야 한다. Axios의 interceptor는 모든 요청이 지나가는 관문 역할을 한다. 한 곳에만 설정하면 이후 모든 API 호출에 자동 적용된다.

또한 fetch는 서버가 401, 500을 반환해도 에러로 처리하지 않지만, Axios는 4xx/5xx를 자동으로 에러로 처리하므로 interceptor에서 401을 감지하기 편리하다.

---

## FSD 레이어 배치 판단

### LoginModal, GoogleLoginButton은 features에 두는 것이 맞는가?

**결론: features/auth/ui에 두는 것이 적절하다.**

FSD에서 각 레이어의 역할:

- **features**: 단일 사용자 인터랙션 기능 (예: "로그인하기", "좋아요 누르기")
- **widgets**: 여러 features/entities를 조합하여 페이지의 독립적인 블록을 구성 (예: Header, Sidebar)

LoginModal과 GoogleLoginButton은 **"로그인"이라는 단일 feature에 종속된 UI**다. 다른 feature나 entity를 조합하지 않고, auth feature 내부의 model(useAuth, authStore)과만 결합한다. 따라서 features/auth/ui에 위치하는 것이 FSD 원칙에 부합한다.

### widgets에는 어떤 파일이 들어가야 하는가?

widgets는 features/entities를 **조합**하는 레이어다. 로그인 기능과 관련하여 widget이 필요한 경우:

| 위젯 후보           | 설명                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| `HeaderAuthSection` | Header 내에서 AuthStatusButton + 사용자 프로필 드롭다운 등을 조합하는 블록 |

현재 Header 컴포넌트가 이미 widgets 또는 별도 레이어에 있다면, AuthStatusButton을 포함하는 부분이 widget의 역할이다. 다만 현 단계에서 Header 내 auth 영역이 AuthStatusButton 하나뿐이라면 별도 widget을 만들 필요 없이 Header에서 features/auth의 AuthStatusButton을 직접 import하면 된다. **복잡도가 늘어나는 시점에 widget으로 분리한다.**

### 모달 방식인데 왜 pages에 모달 관련 정의가 없는가?

**의도된 설계다.** LoginModal은 **페이지에 종속되지 않는 전역 UI**이기 때문이다.

- 모달은 Header의 로그인 버튼, Protected route 리다이렉트, `/login` 페이지 폴백 등 **여러 진입점**에서 열린다.
- 모달의 open/close 상태는 Zustand로 전역 관리한다.
- LoginModal 컴포넌트는 RootLayout 레벨에 마운트되어 어떤 페이지에서든 동작한다.

`src/pages/login/`은 외부 링크나 직접 URL 접근 시 **홈으로 리다이렉트 + 모달 오픈**하는 폴백 역할만 담당한다. 모달 자체를 정의하지 않는 것이 맞다.

---

## 전체 플로우

### 최초 로그인 (팝업 방식)

1. 사용자가 로그인 모달의 "Google로 로그인" 버튼을 클릭한다.
2. 팝업 창이 열리며 `GET /api/auth/google`로 요청한다.
3. Route Handler가 state(CSRF 방지)를 생성하고 httpOnly 쿠키에 저장한 뒤, Google OAuth Authorization URL로 302 리다이렉트한다.
4. 사용자가 Google 계정을 선택/동의한다.
5. Google이 authorization code와 함께 `/api/auth/callback`으로 리다이렉트한다.
6. Callback Route Handler가:
   a) 쿠키의 state와 콜백의 state를 대조하여 CSRF 검증한다.
   b) authorization code를 백엔드 `POST /auth/google`에 전달한다.
   c) **백엔드가 code를 검증하고 AT + RT + user 정보를 응답 body로 반환한다.**
   d) RT를 httpOnly/Secure/SameSite=Lax 쿠키로 저장한다.
   e) HTML 페이지를 반환하여 `postMessage`로 AT + user를 부모 창에 전달하고 팝업을 닫는다.
7. 부모 창의 GoogleLoginButton이 `message` 이벤트를 수신한다.
8. AT + user를 authStore(Zustand)에 저장한다.
9. 로그인 모달이 닫힌다. **로그인 완료.**

---

### API 요청 (정상)

1. 컴포넌트가 `axiosInstance.get('/endpoint')`를 호출한다.
2. Request interceptor가 authStore에서 AT를 꺼내 `Authorization: Bearer {AT}` 헤더를 자동 추가한다.
3. 백엔드가 토큰을 검증하고 데이터를 반환한다.
4. 컴포넌트가 데이터를 수신한다.

---

### API 요청 (AT 만료 시)

1. 컴포넌트가 `axiosInstance.get('/endpoint')`를 호출한다.
2. 만료된 AT가 헤더에 포함되어 전송된다.
3. 백엔드가 401을 반환한다.
4. Response interceptor가 401을 감지하고 `/api/auth/refresh`를 호출한다.
5. Next.js 서버가 httpOnly 쿠키에서 RT를 꺼내 백엔드 `/auth/refresh`를 호출한다.
6. 백엔드가 AT + RT를 동시에 새로 발급한다 (Rotation).
7. 새 RT는 쿠키로 교체되고, 새 AT는 response body로 전달된다.
8. authStore의 AT가 새 AT로 업데이트된다.
9. interceptor가 실패했던 원래 요청을 새 AT로 자동 재시도한다.
10. 컴포넌트는 실패한 사실을 모른 채 데이터를 수신한다.

---

### AT 만료 + 여러 요청 동시 발생 시

여러 요청이 동시에 401을 받으면 RT refresh가 중복 호출될 위험이 있다. 이를 방지하기 위해 첫 번째 401이 refresh를 시작하면(`isRefreshing = true`) 나머지 요청들은 `failedQueue`에 쌓인다. refresh가 완료되면 대기 중이던 요청들이 새 AT로 한꺼번에 재시도된다. refresh가 실패하면 대기열의 모든 요청이 reject된다.

---

### 페이지 새로고침

> **Q: 새로고침할 때마다 토큰 리프레시를 수행하는 것이 너무 잦지 않은가?**
> **A:** AT를 메모리에만 저장하는 아키텍처에서 이것은 **업계 표준 패턴**이다. Auth0, Okta, Firebase 등 주요 인증 서비스에서 동일한 방식을 권장한다. 일반 사용자의 새로고침 빈도는 높지 않고, refresh 요청 자체가 가볍기 때문에 서버 부하도 미미하다. 이것은 "메모리 전용 AT + httpOnly 쿠키 RT" 패턴의 본질적인 트레이드오프이며, 보안을 위해 감수하는 비용이다.

1. Zustand 메모리가 초기화되어 AT가 사라진다.
2. `AuthInitializer`가 마운트되며 `useAuthInit`이 실행된다. (`isInitializing: true`)
3. `/api/auth/refresh` 호출 → RT 쿠키가 살아있으면 새 AT 발급 → authStore 복원.
4. RT 쿠키가 없거나 만료된 경우 비로그인 상태로 유지된다.
5. `isInitializing: false` 설정. 이 값을 기반으로 UI가 로딩 → 실제 콘텐츠로 전환된다.

---

### 로그아웃

1. 컴포넌트가 `useAuth`의 `logout`을 호출한다.
2. authStore의 AT와 유저 정보가 즉시 초기화된다.
3. `/api/auth/logout`을 호출해 서버에서 RT 쿠키를 삭제한다.
4. (선택) 홈 페이지로 이동한다.

---

## 구현 순서

### Phase 1: 인프라

1. `src/shared/api/authStore.ts` - Zustand store
2. `src/shared/api/axiosInstance.ts` - Axios 인스턴스 (interceptor 포함)
3. `src/features/auth/model/types.ts` - 타입 정의

### Phase 2: OAuth 플로우

4. `app/api/auth/google/route.ts` - OAuth 시작
5. `app/api/auth/callback/route.ts` - OAuth 콜백 + postMessage

### Phase 3: 토큰 관리

6. `app/api/auth/refresh/route.ts` - AT 갱신
7. `app/api/auth/logout/route.ts` - 로그아웃

### Phase 4: 클라이언트 훅 + UI

8. `src/features/auth/model/useAuthInit.ts` - AT 복원 훅
9. `src/features/auth/model/useAuth.ts` - 인증 인터페이스 훅
10. `src/features/auth/ui/AuthInitializer.tsx` + RootLayout 통합
11. `src/features/auth/ui/GoogleLoginButton.tsx` - 팝업 오픈 + postMessage 수신
12. `src/features/auth/ui/LoginModal.tsx` - 로그인 모달
13. `src/features/auth/ui/AuthStatusButton.tsx` - 실제 로직 연결

### Phase 5: 보호 + 마무리

14. `middleware.ts` - Protected route
15. `src/features/auth/model/useRequireAuth.ts` - 클라이언트 보호 훅
16. `src/pages/login/ui/LoginPage.tsx` - 홈 리다이렉트 + 모달 오픈 폴백
17. `.env.example` 생성

---

## 전체 파일 구조

### 신규 생성

```
src/shared/api/
├── index.ts                    # axiosInstance, authStore re-export
├── axiosInstance.ts            # Axios 인스턴스 + interceptor
└── authStore.ts                # Zustand store (AT, user, isInitializing)

src/features/auth/
├── index.ts                    # 공개 API
├── model/
│   ├── types.ts                # AuthUser, AuthState 타입
│   ├── useAuth.ts              # 인증 상태 인터페이스 훅
│   ├── useAuthInit.ts          # 앱 마운트 시 AT 복원
│   └── useRequireAuth.ts       # Protected route 훅
└── ui/
    ├── AuthStatusButton.tsx    # 실제 로직 연결
    ├── AuthInitializer.tsx     # useAuthInit 실행용 클라이언트 컴포넌트
    ├── GoogleLoginButton.tsx   # Google 로그인 버튼 (팝업 오픈 + postMessage 수신)
    └── LoginModal.tsx          # 로그인 모달

app/api/auth/
├── google/route.ts             # OAuth 시작 (Google로 리다이렉트)
├── callback/route.ts           # OAuth 콜백 (토큰 처리 + postMessage)
├── refresh/route.ts            # AT 갱신
└── logout/route.ts             # 로그아웃 (RT 쿠키 삭제)

middleware.ts                   # Protected route 서버 레벨 체크
.env.example                    # 환경 변수 템플릿
```

## 파일 구성과 각 파일의 역할

### `src/shared/api/authStore.ts`

Zustand store로 AT, 유저 정보, 초기화 상태를 메모리에 보관한다. persist 없이 메모리 전용으로 동작한다.

이 파일을 `shared/api/`에 두는 이유는 **Axios interceptor(`axiosInstance.ts`)에서 직접 접근해야 하기 때문**이다. 둘 다 shared 레이어에 있으므로 FSD 의존성 규칙을 위반하지 않는다. 엄밀히 말하면 auth는 비즈니스 로직이지만, interceptor와의 강한 결합을 고려한 실용적 선택이다.

React 훅이 아닌 일반 함수에서도 `useAuthStore.getState()`로 접근할 수 있어 interceptor에서 활용 가능하다.

---

### `src/shared/api/axiosInstance.ts`

Axios 인스턴스와 interceptor를 정의한다. 모든 API 요청의 출발점이 되는 파일이다.

- **Request interceptor:** 요청이 나가기 전에 authStore에서 AT를 꺼내 Authorization 헤더에 자동 주입한다.
- **Response interceptor:** 응답이 401이면 토큰 갱신 플로우를 실행한다. 이때 여러 요청이 동시에 401을 받는 경우 RT refresh가 중복 호출되지 않도록 `isRefreshing` 플래그 + `failedQueue` 대기열을 관리한다.

---

### `app/api/auth/google/route.ts`

Google OAuth를 시작하는 Route Handler다.

- `state` (CSRF 방지) 값을 생성하여 httpOnly 쿠키에 임시 저장
- Google Authorization URL 생성 (client_id, redirect_uri, scope, state, response_type=code)
- Google 인증 페이지로 302 리다이렉트

---

### `app/api/auth/callback/route.ts`

Google OAuth 콜백을 처리하는 Route Handler다. **Google 인증과 백엔드 인증을 연결하는 유일한 접점**이다.

- 쿠키에 저장된 state와 콜백의 state를 대조하여 CSRF 검증
- authorization code를 백엔드 `POST /auth/google`에 전달
- 백엔드가 code를 검증하고 AT + RT + user 정보를 응답으로 반환
- RT를 httpOnly/Secure/SameSite=Lax 쿠키로 저장
- **팝업 전용 HTML 페이지를 반환**: `window.opener.postMessage({ type: 'AUTH_SUCCESS', accessToken, user }, origin)` 실행 후 `window.close()`
- 에러 발생 시: `postMessage({ type: 'AUTH_ERROR', error })` 전달

---

### `app/api/auth/refresh/route.ts`

Next.js 서버에서 실행되는 토큰 갱신 전용 Route Handler다.

이 파일이 별도로 필요한 이유는 **RT가 httpOnly 쿠키라 자바스크립트에서 직접 읽을 수 없기 때문**이다. 클라이언트는 RT를 모른 채로 이 Route를 호출하고, 서버가 쿠키에서 RT를 꺼내 백엔드에 전달한다.

- httpOnly 쿠키에서 RT 읽기
- 백엔드 `POST /auth/refresh`에 RT 전달
- 새 AT + RT 수신 (RT Rotation)
- 새 RT로 쿠키 교체
- 새 AT + user 정보를 response body로 반환

---

### `app/api/auth/logout/route.ts`

로그아웃 시 서버에서 RT 쿠키를 삭제하는 Route Handler다.

httpOnly 쿠키는 자바스크립트로 삭제할 수 없으므로, 서버를 통해야 한다.
(선택) 백엔드 `POST /auth/logout`에 RT를 전달하여 서버 사이드에서도 무효화한다.

---

### `src/features/auth/model/types.ts`

인증 관련 타입을 정의한다.

- `AuthUser`: 유저 정보 타입 (id, name, email, profileImage)
- `AuthState`: authStore 상태 타입

---

### `src/features/auth/model/useAuthInit.ts`

앱이 처음 마운트될 때 AT를 복원하는 훅이다.

AT는 메모리에만 있어 페이지를 새로고침하면 사라진다. RT 쿠키는 남아있으므로 이 훅이 마운트 시 `/api/auth/refresh`를 호출해 새 AT를 발급받아 authStore에 저장한다. 이 과정 덕분에 사용자가 새로고침해도 로그인 상태가 유지된다.

- 마운트 시 `isInitializing: true` 설정
- `/api/auth/refresh` 호출 → 성공 시 AT+user 저장
- 실패 시 비로그인 상태 유지
- 완료 후 `isInitializing: false` 설정

---

### `src/features/auth/ui/AuthInitializer.tsx`

`useAuthInit` 훅을 실행하기 위한 클라이언트 컴포넌트다.

Root Layout은 서버 컴포넌트라 훅을 직접 호출할 수 없다. `'use client'` 컴포넌트를 별도로 만들어 Layout에 끼워 넣는 방식으로 해결한다. 화면에는 아무것도 렌더링하지 않고 초기화만 담당한다 (`return null`).

---

### `src/features/auth/model/useAuth.ts`

컴포넌트에서 인증 상태를 사용하는 인터페이스를 제공하는 훅이다.

authStore(Zustand)를 기반으로 동작한다. 컴포넌트는 이 훅만 보면 되고, 내부 구현이 바뀌어도 컴포넌트 코드는 변경하지 않아도 된다.

- 반환: `{ isAuthenticated, isInitializing, user, logout }`
- `logout`: authStore 초기화 → `/api/auth/logout` 호출

---

### `src/features/auth/model/useRequireAuth.ts`

보호된 페이지에서 인증을 요구하는 훅이다.

`useAuth`의 `isAuthenticated`를 확인하고, 미인증 + 초기화 완료 상태이면 로그인 모달을 오픈한다 (또는 홈으로 리다이렉트).

---

### `src/features/auth/ui/LoginModal.tsx`

로그인 모달 UI 컴포넌트다. shadcn Dialog 기반으로 구현한다.

- GoogleLoginButton을 포함
- Zustand로 모달 open/close 상태 관리
- 에러 메시지 표시 기능

---

### `src/features/auth/ui/GoogleLoginButton.tsx`

"Google로 로그인" 버튼 컴포넌트다.

- 클릭 시 팝업 창 오픈 (`window.open('/api/auth/google', ...)`)
- `window.addEventListener('message', ...)` 로 팝업에서 AUTH_SUCCESS 수신
- 성공 시 authStore에 AT+user 저장 + 모달 닫기
- 팝업이 차단된 경우 안내 메시지 표시

---

### `middleware.ts` (프로젝트 루트)

보호된 경로에 대한 서버 레벨 접근 제어를 담당한다.

- 보호된 경로 목록 정의 (예: `/dashboard`, `/analytics` 등)
- 요청의 RT 쿠키 존재 여부 확인
- RT 쿠키 없으면 `/` 로 리다이렉트 (+ `?login=true` 쿼리로 모달 자동 오픈 가능)
- middleware는 1차 방어, `useRequireAuth`는 2차 방어 역할

---

## Protected Route 처리

인증이 필요한 페이지에 대한 접근 제어는 2단계로 구성한다.

### 1차 방어: `middleware.ts` (서버 레벨)

- 보호된 경로 목록을 정의하고, 요청의 RT 쿠키 존재 여부를 확인한다.
- RT 쿠키가 없으면 `/?login=true`로 리다이렉트하여 로그인 모달을 자동 오픈한다.
- 클라이언트 렌더링 전에 차단하므로 보호된 콘텐츠가 노출되지 않는다.

### 2차 방어: `useRequireAuth` 훅 (클라이언트 레벨)

- RT 쿠키는 있지만 AT가 아직 없는 엣지 케이스(초기화 중 등)를 대응한다.
- `isAuthenticated === false && isInitializing === false`이면 로그인 모달을 오픈한다.

---

## 에러 핸들링

| 시나리오                 | 처리                                                      |
| ------------------------ | --------------------------------------------------------- |
| Google OAuth 사용자 취소 | 팝업에서 AUTH_ERROR postMessage → 모달에 안내 메시지 표시 |
| 백엔드 다운 (로그인 시)  | callback에서 에러 감지 → AUTH_ERROR postMessage           |
| 백엔드 다운 (refresh 시) | interceptor 재시도 후 실패 → 비로그인 상태 전환           |
| RT 만료                  | refresh 실패 → authStore 초기화, 로그인 모달 오픈         |
| 동시 401 중 refresh 실패 | failedQueue 전체 reject                                   |
| 팝업 차단                | `window.open` 반환값 체크 → 차단 시 안내 메시지 표시      |

---

## 백엔드 API 예상 스펙 (미확정)

> 백엔드팀과 확정 후 업데이트 필요

```
POST /auth/google
  Request:  { code: string }
  Response: { accessToken: string, refreshToken: string, user: { id, name, email, profileImage } }

POST /auth/refresh
  Request:  { refreshToken: string }
  Response: { accessToken: string, refreshToken: string }

POST /auth/logout
  Request:  { refreshToken: string }
  Response: { success: boolean }
```

---

## 환경 변수

| 변수명                 | 용도                   |
| ---------------------- | ---------------------- |
| `GOOGLE_CLIENT_ID`     | Google OAuth 앱 ID     |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 앱 시크릿 |
| `NEXT_PUBLIC_API_URL`  | 백엔드 API base URL    |

---

---

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

---

### E2E 테스트 (Playwright)

E2E 테스트는 사용자 관점에서 전체 로그인 플로우를 검증한다.

#### 테스트 파일 위치

```
e2e/
├── auth/
│   ├── login.spec.ts           # 로그인 플로우
│   ├── logout.spec.ts          # 로그아웃 플로우
│   ├── token-refresh.spec.ts   # 토큰 갱신
│   └── protected-route.spec.ts # 보호된 경로 접근 제어
└── fixtures/
    └── auth.ts                 # 인증 상태 fixture (로그인된 상태 세팅 등)
```

#### 대상별 테스트 시나리오

**`login.spec.ts`** — 로그인 플로우

- 로그인 버튼 클릭 → 모달 오픈 → Google 로그인 버튼 표시
- Google 로그인 버튼 클릭 → 팝업 창 오픈 (URL이 Google OAuth인지 확인)
- OAuth 콜백 성공 시 → 모달 닫힘 + 인증 상태 UI로 전환
- OAuth 에러 시 → 모달에 에러 메시지 표시

**`logout.spec.ts`** — 로그아웃 플로우

- 로그인 상태에서 로그아웃 클릭 → 비로그인 UI로 전환
- 로그아웃 후 보호된 페이지 접근 시 리다이렉트

**`token-refresh.spec.ts`** — 토큰 갱신

- 페이지 새로고침 후 로그인 상태 유지 (RT 쿠키가 살아있는 경우)
- RT 쿠키 만료/삭제 후 새로고침 시 비로그인 상태 전환

**`protected-route.spec.ts`** — 보호된 경로

- 비로그인 상태에서 보호된 페이지 직접 접근 → 홈으로 리다이렉트 + 로그인 모달 오픈
- `/login` URL 직접 접근 → 홈으로 리다이렉트 + 모달 오픈

#### E2E 테스트 작성 예시

```typescript
// e2e/auth/login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('로그인 플로우', () => {
  test('로그인 버튼 클릭 시 로그인 모달이 열린다', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /로그인/ }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByText(/Google로 로그인/)).toBeVisible()
  })

  test('Google 로그인 버튼 클릭 시 OAuth 팝업이 열린다', async ({ page, context }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /로그인/ }).click()

    const popupPromise = context.waitForEvent('page')
    await page.getByText(/Google로 로그인/).click()
    const popup = await popupPromise

    expect(popup.url()).toContain('accounts.google.com')
  })
})
```

```typescript
// e2e/auth/protected-route.spec.ts
import { test, expect } from '@playwright/test'

test.describe('보호된 경로 접근 제어', () => {
  test('비로그인 상태에서 보호된 페이지 접근 시 홈으로 리다이렉트', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\?login=true/)
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('/login 직접 접근 시 홈으로 리다이렉트 + 모달 오픈', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('dialog')).toBeVisible()
  })
})
```

#### E2E 테스트 시 Google OAuth 처리 방법

실제 Google OAuth를 E2E 테스트에서 매번 수행하는 것은 비현실적이다. 다음 전략을 사용한다:

- **Route intercept**: Playwright의 `page.route()`로 `/api/auth/callback`을 가로채서 성공 응답을 모킹
- **Auth fixture**: 로그인된 상태를 미리 세팅하는 fixture를 만들어 RT 쿠키를 직접 주입
- **OAuth 팝업 테스트**: 팝업이 열리는 것까지만 검증하고, 실제 Google 로그인은 수행하지 않음
