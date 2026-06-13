import Link from 'next/link'
import Image from 'next/image'

import { formatMonthAndWeek } from '@/shared/lib/format'

import testMagazine1 from '../assets/test-magazine-1.png'
import testMagazine2 from '../assets/test-magazine-2.png'
import testMagazine3 from '../assets/test-magazine-3.png'

const TEST_MAGAZINES = [
  {
    id: '1',
    src: testMagazine1,
    href: 'https://www.instagram.com/p/DYzFYDBj8OJ',
  },
  {
    id: '2',
    src: testMagazine2,
    href: 'https://www.instagram.com/p/DZFRl3Fj4ts',
  },
  {
    id: '3',
    src: testMagazine3,
    href: 'https://www.instagram.com/p/DZXF9eFD9_C',
  },
]

export function TestTrendMagazineSection() {
  const now = new Date().toDateString()
  const { month, weekNumber } = formatMonthAndWeek(now)

  return (
    <section className='flex h-fit w-full flex-col gap-16'>
      {/* 트렌드 매거진 헤더 */}
      <div className='flex h-fit w-full flex-col items-start justify-between gap-3'>
        <h3 className='text-ibm-title-lg-normal text-text-and-icon-default'>
          {`${month}월 ${weekNumber}주차 트렌드 매거진`}
        </h3>

        {/* 서브텍스트 + 더보기 */}
        <div className='flex h-fit w-full justify-between'>
          <p className='text-noto-title-sm-thin text-text-and-icon-tertiary'>
            매주 화요일 업데이트 되는 트렌드 매거진
          </p>
          <span className='size-fit cursor-not-allowed gap-10 pt-1 pr-2 pb-3 pl-2 text-noto-label-sm-bold text-text-and-icon-tertiary'>
            더보기
          </span>
        </div>
      </div>

      {/* 매거진 리스트 */}
      <div className='grid h-fit w-full grid-cols-3 gap-24'>
        {TEST_MAGAZINES.map(({ id, src, href }) => (
          <Link key={id} href={href} target='_blank' rel='noopener noreferrer'>
            <Image src={src} alt='' className='w-full rounded-8' />
          </Link>
        ))}
      </div>
    </section>
  )
}
