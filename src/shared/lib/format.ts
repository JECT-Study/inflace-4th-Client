/* 숫자 포맷팅 */

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

// 년, 월, 일을 반환
// ex. 2025-01-14T00:00:00 => {2025, 01, 14}
export function formatDate(iso: string): {
  year: string
  month: string
  day: string
} {
  const date = new Date(iso)
  const year = date.getFullYear().toString()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return { year, month, day }
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
