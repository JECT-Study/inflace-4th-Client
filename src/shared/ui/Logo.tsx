import Link from 'next/link'
import LogoSvg from '@/shared/assets/logo.svg'
import { cn } from '@/shared/lib/utils'

interface LogoProps {
  variant?: 'header' | 'footer'
  className?: string
}

export const Logo = ({ variant = 'header', className }: LogoProps) => {
  return (
    <Link
      href={'/'}
      className={cn('inline-flex items-center', className)}
      aria-label='inflace 홈으로 이동'>
      <LogoSvg
        className={cn(
          variant === 'header' && 'h-header-logo w-header-logo',
          variant === 'footer' && 'h-footer-logo w-footer-logo'
        )}
        role='img'
      />
      <span className='sr-only'>inflace</span>
    </Link>
  )
}
