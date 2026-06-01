/* 필터옵션: 업로드 주기 */
export const UPLOAD_PERIOD_OPTIONS: { label: string; value: string }[] = [
  { label: '1주일 미만', value: '7D' },
  { label: '1주일 ~ 1개월', value: '30D' },
  { label: '1개월 ~ 3개월', value: '31_90D' },
  { label: '3개월 ~ 6개월', value: '91_180D' },
  { label: '6개월 이상', value: '180D_PLUS' },
]

/* 필터옵션: outlier 배수 */
export const OUTLIER_RANGE_OPTIONS: { label: string; value: string }[] = [
  { label: '1.0x', value: '1.0X' },
  { label: '1.5x', value: '1.5X' },
  { label: '2.0x', value: '2.0X' },
  { label: '3.0x', value: '3.0X' },
]

/* 필터옵션: 광고이력 */
export const HAS_AD_HISTORY_OPTIONS: { label: string; value: string }[] = [
  { label: '있음', value: 'true' },
  { label: '없음', value: 'false' },
]
