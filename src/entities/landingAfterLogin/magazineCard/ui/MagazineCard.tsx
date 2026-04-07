import Image from 'next/image'
import Link from 'next/link'

import type { MagazineCardItem } from '../model/types'

export function MagazineCard({ id, thumbnailUrl, title }: MagazineCardItem) {
  return (
    <Link
      href={`/articles/${id}`}
      className='flex h-fit w-full min-w-85 flex-col gap-8'>
      <div className='relative aspect-video h-70 w-full overflow-hidden rounded-8'>
        <Image src={thumbnailUrl} alt={title} fill />
      </div>
      <p className='line-clamp-2 text-title-sm font-medium tracking-[-1%] text-text-and-icon-default'>
        {title}
      </p>
    </Link>
  )
}
