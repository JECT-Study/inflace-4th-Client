'use client'

import { FooterNav } from '@/widgets/footer/ui/FooterNav'
import { FooterInfo } from '@/widgets/footer/ui/FooterInfo'

export function Footer() {
  return (
    <>
      <footer className='z-11 w-full bg-(--color-background-gray-default)'>
        <div className='w-full px-64 pt-40 pb-64'>
          <div className='flex justify-between'>
            <FooterInfo />
            <FooterNav />
          </div>
        </div>
      </footer>
    </>
  )
}
