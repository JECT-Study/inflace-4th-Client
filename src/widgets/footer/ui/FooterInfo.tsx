import Link from 'next/link'
import { Logo } from '@/shared/ui/Logo'

export const FooterInfo = () => {
  return (
    <div className='flex flex-col self-stretch'>
      <Logo variant='footer' />
      <div className='flex-1' />
      <div className='flex flex-col gap-y-xs'>
        <ul className='flex gap-sm'>
          <li className='text-[15px] leading-(--leading-label-md) font-medium'>
            <Link href='/'>개인정보처리방침</Link>
          </li>
          <li className='text-[15px] leading-(--leading-label-md)'>
            <Link href='/' className='text-[15px]'>
              이용약관
            </Link>
          </li>
        </ul>
        <p className='text-[12px] leading-(--leading-caption-md) font-normal text-(--color-text-and-icon-tertiary)'>
          © 2026. inflace All rights reserved.
        </p>
      </div>
    </div>
  )
}
