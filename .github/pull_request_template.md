## 📌 작업 개요

> Button 컴포넌트 개발

## 🗂 작업 유형

> 해당하는 항목에 `v`를 채워 주세요.

- [v] 기능 추가 (feat)
- [ ] 버그 수정 (fix)
- [ ] 리팩토링 (refactor)
- [ ] 스타일 / UI 수정 (style)
- [ ] 성능 개선 (perf)
- [ ] 테스트 (test)
- [ ] 기타 (chore, docs 등)

## ✏️ 작업 내용

> [setting]

- UI component 문서화를 위한 Storybook 설치
- PR 생성 시 자동으로 storybook UI 링크 삽입로직(chromatic.yml) 추가
- CLAUDE.md파일 버그 수정: **프로젝트명**: inflace (influencer + place) 등 오탈자 및 대소문자 수정
- figma 내 asset을 shared/assetes로 이동, svg 파일의 naming convention을 일관성 있게 수정 -테스트로 작성했던 네비게이션 코드 삭제 및 수정

- build-tokens.mjs파일 삭제 => 디자인 토큰 정보를 다 받아오지 못하는 문제점이 있었고, 디자인토큰이 변경됐을 때 shadcn/ui로 불러온 값을 덮어쓸 우려가 있었음.
  -tokens.generated.css 파일 생성: globals.css에 토큰값을 직접 저장하지 않고 해당 파일에 저장 및 업데이트
- globals.css 수정

> [feature]

- widgets/Button 컴포넌트 개발
  - test코드 작성
  - storybook 작성
  - types.ts 작성

## ✅ 셀프 체크리스트

> 머지 전 직접 확인해 주세요.

- [x] 로컬에서 정상 동작 확인
- [x] 불필요한 콘솔 로그, 주석, 디버그 코드 제거
- [x] 타입 에러 없음

## 💬 리뷰어에게

> 없습니다.
