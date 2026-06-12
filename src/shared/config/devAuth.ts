// TEMP: 강제 로그인 데모 설정
// 백엔드/실제 세션 없이 민준테크로 로그인된 것처럼 동작시키기 위한 임시 스위치.
// true인 동안:
//  - useAuthInit: 부팅 시 mock 유저 주입
//  - proxy(middleware): 보호 경로 가드 우회
//  - authStore.setAuth: 프로필 표시값(플랜/채널명/프로필 이미지)을 아래 고정값으로 덮어씀
//    → 인플루언서 검색 등에서 실제 프로필로 갱신돼도 표시는 민준테크로 유지
// 되돌릴 때: FORCE_LOGIN을 false로 바꾸거나, 이 플래그를 참조하는 가드들을 제거.
export const FORCE_LOGIN: boolean = true

// 고정 표시 프로필 (민준테크)
export const FORCED_PROFILE_IMAGE =
  'https://i.pinimg.com/736x/e2/bc/39/e2bc3977ccf24e3de850deba26cd58b3.jpg'
export const FORCED_CHANNEL_NAME = '민준테크'
