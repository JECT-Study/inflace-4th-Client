import type { MagazineCardItem } from '@/entities/landingAfterLogin/magazineCard'
import { trendMagazineMock } from '../mock/trendMagazineMock'

export async function fetchTrendMagazine(
  _channelId: string
): Promise<MagazineCardItem[]> {
  return trendMagazineMock
}
