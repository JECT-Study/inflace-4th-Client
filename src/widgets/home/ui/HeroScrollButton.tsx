'use client'

export function HeroScrollButton() {
  return (
    <button
      onClick={() =>
        document
          .getElementById('section02')
          ?.scrollIntoView({ behavior: 'smooth' })
      }
      className='flex size-fit cursor-pointer rounded-full border-1 border-white p-16 py-6 text-body-xs text-white'>
      더 알아보기
    </button>
  )
}
