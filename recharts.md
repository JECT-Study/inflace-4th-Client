# Recharts 그래프 구현 계획

## 사전 준비

- `recharts` 패키지 설치 필요 (현재 미설치 상태)
- recharts는 React 19와 호환되는 최신 버전 사용

---

## 1. 구독자 추이 그래프

### 사용 컴포넌트

| recharts 컴포넌트     | 역할                                  |
| --------------------- | ------------------------------------- |
| `ResponsiveContainer` | 부모 너비에 맞춰 반응형 리사이징      |
| `AreaChart`           | 메인 차트 컨테이너                    |
| `Area`                | 채워진 영역 (곡선형, `type="monotone"`) |
| `XAxis`               | 날짜 축                               |
| `YAxis`               | 구독자 수 축                          |
| `Tooltip`             | 호버 시 데이터 표시                   |
| `Brush`               | 하단 좌우 스크롤 슬라이더             |

### 데이터 정렬 전략

API 응답의 `points` 배열은 `date` 문자열(ISO 형식 `"2026-01-01"`)을 포함한다.

**프론트엔드에서 정렬 처리 (권장)**

- `points.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())`
- ISO 날짜 문자열은 사전순 정렬과 시간순 정렬이 동일하므로 `a.date.localeCompare(b.date)`도 가능
- recharts는 데이터 배열의 **순서 그대로** 렌더링하므로, 정렬만 보장되면 별도의 rank 필드는 불필요
- 백엔드에서 이미 정렬된 상태로 내려올 가능성이 높지만, 프론트에서 한 번 더 정렬하는 것이 안전

**결론: 백엔드에 rank 필드 요청 불필요.** 프론트 정렬로 충분.

### 좌우 스크롤 구현

recharts의 **`Brush`** 컴포넌트를 사용한다.

- `Brush`는 차트 하단에 미니맵 형태의 범위 선택기를 렌더링
- 사용자가 드래그하여 표시 범위를 조절 → 메인 차트가 해당 범위만 표시
- 스크린샷의 하단 슬라이더 UI와 일치

**Brush 주요 props:**

- `dataKey="date"` — 기준 데이터 키
- `height={30}` — 슬라이더 높이
- `startIndex` / `endIndex` — 초기 표시 범위 (최근 N개 데이터를 기본 노출하려면 설정)
- `stroke` — 슬라이더 색상

**대안: 직접 구현**

만약 Brush의 기본 UI가 디자인과 맞지 않을 경우:
- 상태로 `startIndex`, `endIndex`를 관리하고 `AreaChart`의 `data`를 `.slice()`로 잘라서 전달
- 커스텀 스크롤바 UI를 별도로 구현
- 이 방식은 Brush로 먼저 시도한 뒤, 커스터마이징 한계가 있을 때 전환

### 필터 (7일 / 30일 / 90일 / 180일 / 1년)

- 프론트에서 데이터를 필터링하지 않음
- 선택된 필터값을 **쿼리 파라미터**로 백엔드에 전달
- 예: `GET /api/channels/{id}/subscribers?period=180d`
- 필터 버튼 UI는 차트 외부에 위치하며, 클릭 시 API를 재호출하여 새 데이터로 차트를 갱신

### 스타일링 포인트

- `Area`의 `fill` 색상: 스크린샷 기준 `#6B7280` 계열 (slate/gray 톤)
- `Area`의 `stroke` 색상: fill보다 약간 밝은 톤
- `CartesianGrid`는 `strokeDasharray="3 3"`으로 점선 그리드 적용 (스크린샷 참조)
- `YAxis` 라벨은 축약 포맷 적용 (예: 27,260 → 2.7만)
- `XAxis` 라벨은 날짜 포맷 변환 필요 (예: `"2026-01-01"` → `"1월"` 또는 `"Jan"`)

---

## 2. 시청 지속률 그래프

### 사용 컴포넌트

| recharts 컴포넌트     | 역할                                     |
| --------------------- | ---------------------------------------- |
| `ResponsiveContainer` | 반응형 리사이징                          |
| `AreaChart`           | 메인 차트 컨테이너                       |
| `Area`                | 채워진 영역 (그라데이션 fill + 곡선 stroke) |
| `XAxis`               | 시간 비율 축 (0% ~ 100% 또는 00:00 형식) |
| `YAxis`               | 시청 지속률 축 (0% ~ 100%)               |
| `Tooltip`             | 커스텀 잔존율 툴팁                       |
| `ReferenceLine`       | 점선 수직선 (특정 구간 표시)             |
| `defs` + `linearGradient` | 영역 그라데이션 + 선 그라데이션      |

### 데이터 매핑

- `timeRatio` → XAxis (`0.00` ~ `1.00`, 퍼센트 또는 시간으로 포맷)
- `watchRatio` → YAxis / Area (`0.0` ~ `1.0+`, 퍼센트로 포맷)
- 배열 크기 100개 고정 → 별도 정렬/필터 불필요, 그대로 사용

### 그라데이션 구현 (핵심)

**영역(fill) 그라데이션:**

- `<defs>` 안에 `<linearGradient>` 정의 (위→아래 방향)
- 위쪽: 반투명 보라/빨강 (`opacity: 0.3~0.5`)
- 아래쪽: 완전 투명 (`opacity: 0`)
- `Area`의 `fill` 속성에 `url(#gradientId)` 연결

**선(stroke) 색상 그라데이션:**

- 스크린샷에서 선이 빨강 → 보라로 변화
- `<linearGradient>` 를 **가로 방향**(x1=0, x2=1, y1=0, y2=0)으로 정의
- 시작: 빨강 계열 (`#EF4444` 등)
- 끝: 보라 계열 (`#8B5CF6` 등)
- `Area`의 `stroke` 속성에 `url(#strokeGradientId)` 연결

### 커스텀 Tooltip (호버 인터랙션)

recharts의 `<Tooltip content={<CustomTooltip />} />` 패턴을 사용한다.

**CustomTooltip 컴포넌트 요구사항:**

- `watchRatio` 값을 퍼센트로 변환하여 표시 (예: `0.75` → `"75% 잔존"`)
- 스크린샷처럼 말풍선(bubble) 형태의 디자인
- 호버 위치에 따라 표시 위치 자동 조절 (recharts 기본 제공)
- 배경색, 테두리, 그림자 등 TailwindCSS 클래스로 스타일링

**Tooltip props 활용:**

- `active` — 호버 활성 여부
- `payload` — 현재 포인트 데이터 (`watchRatio`, `timeRatio`)
- `coordinate` — 마우스 좌표

### 점선 수직선

- `<ReferenceLine x={특정값} stroke="#3B82F6" strokeDasharray="5 5" />`
- 스크린샷에서 특정 시점에 파란 점선 수직선 표시
- 이 값이 동적이라면 (예: 평균 시청 시간 지점) 백엔드에서 받거나 프론트에서 계산

### 스타일링 포인트

- `XAxis`: `timeRatio`를 `"00:00"` 형식으로 포맷 (영상 길이 대비 시간)
- `YAxis`: `watchRatio`를 `"0%"` ~ `"100%"` 형식으로 포맷
- `CartesianGrid` 없음 (스크린샷에서 그리드 라인 미표시)
- 차트 배경은 흰색

---

## FSD 파일 배치 계획

```
src/
├── shared/ui/chart/          # recharts 래퍼 (공통 그라데이션, 툴팁 등)
│   ├── index.ts
│   └── CustomTooltip.tsx     # 공통 커스텀 툴팁
│
├── features/channel-analytics/   # 채널 분석 feature
│   ├── index.ts
│   ├── model/
│   │   └── types.ts          # API 응답 타입 정의
│   └── ui/
│       ├── SubscriberTrendChart.tsx   # 구독자 추이 그래프
│       └── RetentionChart.tsx         # 시청 지속률 그래프
```

## 데이터 페칭 전략

- `axiosInstance`를 사용하여 API 호출 (이미 토큰 자동 주입 + 갱신 로직 구축됨)
- 향후 TanStack Query 도입 시 `useQuery` 훅으로 전환 가능하지만, 현재는 `useEffect` + `useState` 패턴으로 구현
- 구독자 추이: 필터 변경 시 API 재호출
- 시청 지속률: 영상 단위로 1회 호출 (100개 고정 데이터)
