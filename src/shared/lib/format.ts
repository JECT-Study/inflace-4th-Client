export function formatThousands(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}천`
  }
  return String(count)
}

export function format10Thousands(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}만`
  }
  return String(count)
}

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

export function formatMonthAgo(iso: string): string {
  const date = new Date(iso)
  const month = String(date.getMonth() + 1)
  return `${month}개월 전`
}

export function formatCount(count: number): string {
  return String(count)
}
