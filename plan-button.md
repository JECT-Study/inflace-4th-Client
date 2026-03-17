# Button 컴포넌트 설계 계획

## 배경

Inflace 디자인 시스템 기반 버튼 컴포넌트 공통화.
shadcn/ui Button + `cva`(class-variance-authority) 활용.

---

## 컴포넌트 개수: 1개

단일 `Button` 컴포넌트로 디자인 시스템의 모든 버튼 케이스 커버.

```
src/shared/ui/
└── button/
    ├── Button.tsx   # 메인 컴포넌트
    └── index.ts     # Public API re-export
```

---

## Props 설계

```ts
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'gray'
  style?: 'filled' | 'outlined'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  leftIconSrc?: string
  rightIconSrc?: string
}
```

- `color`와 `style`은 별개 props로 수용 — cva에서 각각 독립적으로 처리
- `state`(hover/pressed/disabled): CSS pseudo-class 처리 → props 불필요
- 기본값: `color='primary'`, `style='filled'`, `size='md'`
- native HTMLButtonElement props 전체 수용

---

## CSS 변수 참조 방식

컴포넌트 내부에서 색상·사이즈 값을 직접 쓰지 않고,
globals.css에 정의된 CSS 변수명만 참조한다.

**이유:** 디자인 시스템이 변경되면 globals.css만 수정하면 되고,
컴포넌트 코드는 건드리지 않아도 된다.

```
// cva 예시 — 값 아닌 변수명 참조
variants: {
  color: {
    primary:   'bg-[var(--color-brand-primary)] text-[var(--color-text-and-icon-inverse)]',
    secondary: 'bg-[var(--color-brand-secondary)] text-[var(--color-text-and-icon-inverse)]',
    gray:      'bg-[var(--color-background-gray-stronger)] text-[var(--color-text-and-icon-default)]',
  },
  style: {
    filled:   '',
    outlined: 'bg-transparent border',
  },
  size: {
    lg: 'h-[var(--spacing-48)] px-[var(--spacing-20)] text-[var(--text-label-lg)]',
    md: 'h-[var(--spacing-40)] px-[var(--spacing-16)] text-[var(--text-label-md)]',
    sm: 'h-[var(--spacing-32)] px-[var(--spacing-12)] text-[var(--text-label-sm)]',
    xs: 'h-[var(--spacing-28)] px-[var(--spacing-8)]  text-[var(--text-label-xs)]',
  },
}
```

> 실제 변수명은 globals.css의 버튼 컴포넌트 토큰(`--comp-button-*`) 및
> spacing/typography 토큰(`--spacing-*`, `--text-size-label-*`)을 확인 후 채운다.

---

## 아이콘 처리

공통 아이콘은 `src/shared/` 에 이미지 파일로 관리할 예정.
컴포넌트는 아이콘 src 경로를 받아 `<img>` 태그로 렌더링한다.

```tsx
// 사용 예
<Button leftIconSrc='/icons/arrow.svg'>레이블</Button>
```

---

## 사용 예시

```tsx
// 기본
<Button>레이블</Button>

// color + style + size
<Button color='primary' style='outlined' size='sm'>취소</Button>

// 아이콘 포함
<Button leftIconSrc='/icons/arrow.svg' rightIconSrc='/icons/arrow.svg'>
  레이블
</Button>

// disabled (native attribute)
<Button disabled>레이블</Button>

// gray
<Button color='gray' size='xs' leftIconSrc='/icons/plus.svg'>추가</Button>
```

---

## 검증 방법

- Storybook: color × style × size 전체 조합 스토리 작성
- hover / pressed 상태: Storybook interaction 테스트
- disabled: 스타일 및 클릭 이벤트 차단 확인
- leftIconSrc / rightIconSrc 유무에 따른 레이아웃 확인
