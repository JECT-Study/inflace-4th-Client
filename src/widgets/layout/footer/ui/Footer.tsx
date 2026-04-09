'use client'

import { FooterNav } from './FooterNav'
import { FooterInfo } from './FooterInfo'

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
