/* 숫자 포맷팅 */

// 쉼표 포맷팅 1000000 => 1,000,000
export function formatComma(count: number | null | undefined): string {
  if (count == null) return '0'
  return count.toLocaleString('ko-KR')
}

// 퍼센트 포맷팅 (null/undefined/NaN 방어) 82.345 => '82'
export function formatPercent(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '0'
  return value.toFixed(0)
}

// 만 단위 포맷팅 37,687,938 => 3768만 7938 / 83,904 => 8만 3904 / 187 => 187
export function formatKoreanUnit(value: number): string {
  const floor = Math.floor(value)
  if (floor >= 10000) {
    const man = Math.floor(floor / 10000)
    const remainder = floor % 10000
    return remainder > 0 ? `${man}만 ${remainder}` : `${man}만`
  }
  return String(floor)
}

// 1000명 단위 포맷팅 3,700 => 3천
export function formatThousands(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}천`
  }
  return String(count)
}

// 1만명 단위 포맷팅 285,000 => 28.5만 / 300,000 => 30만
export function format10Thousands(count: number): string {
  if (count >= 10000) {
    const value = count / 10000
    const formatted = value % 1 === 0 ? String(value) : value.toFixed(1) //소숫점 아래가 0이면 표시 x
    return `${formatted}만`
  }
  return String(count)
}

// Y축 퍼센트 포맷팅 (0, 25%, 50%, 75%, 100%)
export function formatYAxisPercent(value: number, ticks: number[]): string {
  if (value === 0) return '0'
  if (value === ticks[1]) return '25%'
  if (value === ticks[2]) return '50%'
  if (value === ticks[3]) return '75%'
  if (value === ticks[4]) return '100%'
  return String(value)
}

// 조회수 변동계수(CV) 안정성 라벨
export function getViewCvLabel(cv: number): string {
  if (cv < 0.4) return '매우 안정'
  if (cv <= 1.8) return '안정'
  return '불안정'
}

/* 날짜 포맷팅 */

// 년, 월, 일, 시, 분을 반환
// ex. 2025-01-14T09:30:00 => {2025, 01, 14, 09, 30}
export function formatDate(iso: string): {
  year: string
  month: string
  day: string
  hour: string
  minute: string
} {
  const date = new Date(iso)
  const year = date.getFullYear().toString()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return { year, month, day, hour, minute }
}

// 현재 시점 기준 몇 개월/년 전인지 반환 (연도 경과 고려)
// ex. 오늘이 2026-06-01일 때 2025-01-14T00:00:00 => "1년 전"
export function formatMonthAgo(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '-'
  const now = new Date()

  let months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth())
  if (now.getDate() < date.getDate()) months -= 1
  months = Math.max(0, months)

  if (months >= 12) {
    const years = Math.floor(months / 12)
    return `${years}년 전`
  }
  return `${months}개월 전`
}

// 초를 MM:SS 형식으로 변환 (null/undefined/NaN 방어)
// ex. 769 => "12:49"
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || Number.isNaN(seconds)) return '-'
  const total = Math.round(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

//현재가 몇 월이고, 몇 주차인지 반환 일요일 시작을 기준으로 반환
// ex. 2025-01-14T00:00:00 => {1, 2}
export function formatMonthAndWeek(iso: string): {
  month: number
  weekNumber: number
} {
  const date = new Date(iso)

  const month = date.getMonth() + 1

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const firstDayWeekday = firstDayOfMonth.getDay() // 0=일요일

  const dayOfMonth = date.getDate()

  const weekNumber = Math.ceil((dayOfMonth + firstDayWeekday) / 7)

  return { month, weekNumber }
}
