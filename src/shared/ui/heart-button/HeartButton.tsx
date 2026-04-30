'use client'

import { useState } from 'react'

import HeartBold from '@/shared/assets/heart-bold.svg'
import HeartFilled from '@/shared/assets/heart-filled.svg'

interface HeartButtonProps {
  initialBookmarked: boolean //초기 상태
  onToggle: (bookmarked: boolean) => void
}

export function HeartButton({ initialBookmarked, onToggle }: HeartButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    const next = !bookmarked
    setBookmarked(next)
    onToggle(next)
  }

  return (
    <button
      aria-label={bookmarked ? '찜 해제' : '찜 추가'}
      className='shrink-0'
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {bookmarked || hovered ? (
        <HeartFilled
          className={`size-[2.4rem] ${bookmarked ? 'text-[#FF7169]' : 'text-[#FF9F97]'}`}
        />
      ) : (
        <HeartBold className='size-[2.4rem] text-text-and-icon-tertiary' />
      )}
    </button>
  )
}
