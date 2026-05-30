import type { VideoFormat, SortCriteria } from './types'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}

/* 영상 형태 - ToggleGroup 옵션 */
export const VIDEO_FORMAT_OPTIONS: SelectOption<VideoFormat>[] = [
  { value: 'ALL', label: '전체' },
  { value: 'LONG_FORM', label: '롱폼' },
  { value: 'SHORT_FORM', label: '숏폼' },
]

/* ISO 3166-1 alpha-2 지역 코드 */
export const REGION_OPTIONS: SelectOption[] = [
  { value: 'KR', label: '한국' },
  { value: 'US', label: '미국' },
  { value: 'JP', label: '일본' },
  { value: 'GB', label: '영국' },
  { value: 'DE', label: '독일' },
  { value: 'FR', label: '프랑스' },
]

/* ISO 639-1 언어 코드 */
export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: '영어' },
  { value: 'ja', label: '일본어' },
  { value: 'zh', label: '중국어' },
  { value: 'es', label: '스페인어' },
]

/* 정렬 기준 */
export const SORT_CRITERIA_OPTIONS: SelectOption<SortCriteria>[] = [
  { value: 'LATEST', label: '최신순' },
  { value: 'VIEW_COUNT', label: '조회수순' },
  { value: 'ENGAGEMENT', label: '좋아요순' },
]
