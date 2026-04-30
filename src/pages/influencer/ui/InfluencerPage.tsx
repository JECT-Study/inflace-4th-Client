import { InfluencerList } from '@/features/influencer'
import { InfluencerFilter } from '@/widgets/influencer'

/* 인플루언서 검색 기본화면 */
export function InfluencerPage() {
  return (
    <div className='flex h-fit w-full flex-col gap-24 pb-[9.6rem]'>
      <InfluencerFilter />
      <InfluencerList />
    </div>
  )
}
