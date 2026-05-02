import { InfluencerCard } from '@/entities/influencer'

/* 인플루언서 카드 리스트 */
export function InfluencerList() {
  return (
    <div className='flex h-fit w-full flex-col gap-16 px-24'>
      {/* 검색 결과 및 정렬 기준
       * TODO: 인원수 및 정렬기준 구현
       */}
      <div className='flex h-fit w-full justify-between text-noto-label-sm-bold'>
        <span className='gap-10 px-2 text-text-and-icon-primary'>
          검색결과 {'38,973,842'}명
        </span>

        {/* 정렬기준 */}
        <div className='flex size-fit text-brand-secondary'>
          <span className='size-fit px-8 py-4'>구독자 많은 순</span>
          <span className='size-fit px-8 py-4'>구독자 많은 순</span>
          <span className='size-fit px-8 py-4'>구독자 많은 순</span>
          <span className='size-fit px-8 py-4'>구독자 많은 순</span>
        </div>
      </div>

      {/* 인플루언서 리스트 */}
      <div className='grid h-fit w-full grid-cols-3 gap-24'>
        {Array.from({ length: 12 }).map((_, index) => (
          <InfluencerCard key={index} />
        ))}
      </div>
    </div>
  )
}
