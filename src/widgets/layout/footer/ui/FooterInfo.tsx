import Link from 'next/link'
import { Logo } from '@/shared/ui/Logo'

export const FooterInfo = () => {
  return (
    <div className='flex flex-col self-stretch'>
      <Logo variant='footer' />
      <div className='flex-1' />
      <div className='flex flex-col gap-y-xs'>
        <ul className='flex gap-sm'>
          <li className='text-noto-label-md-normal text-text-and-icon-primary'>
            <Link
              href='https://accidental-ironclad-397.notion.site/inflace-legecy'
              target='_blank'>
              개인정보처리방침
            </Link>
          </li>
          <li className='text-noto-label-md-normal text-text-and-icon-primary'>
            <Link
              href='https://accidental-ironclad-397.notion.site/inflace-legecy-personal'
              target='_blank'>
              이용약관
            </Link>
          </li>
        </ul>
        <p className='text-noto-caption-md-normal text-text-and-icon-tertiary'>
          ⓒ 2026. inflace All rights reserved.
        </p>
      </div>
    </div>
  )
}
