/* 숫자 포맷팅 */

// 쉼표 포맷팅 1000000 => 1,000,000
export function formatComma(count: number | null | undefined): string {
  if (count == null) return '0'
  return count.toLocaleString('ko-KR')
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

// 1만명 단위 포맷팅 285,000 => 28.5만
export function format10Thousands(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}만`
  }
  return String(count)
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

// 몇 개월 전인지 반환
// ex. 2025-01-14T00:00:00 => 1 개월 전
export function formatMonthAgo(iso: string): string {
  const date = new Date(iso)
  const month = String(date.getMonth() + 1)
  return `${month}개월 전`
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
