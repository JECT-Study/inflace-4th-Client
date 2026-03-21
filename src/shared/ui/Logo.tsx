import LogoSvg from '@/shared/assets/logo.svg'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'header' | 'footer'
}

export const Logo = ({ className, variant = 'header' }: LogoProps) => {
  const widthMap = {
    header: 'var(--header-logo-width)',
    footer: 'var(--footer-logo-width); flex-1',
  }

  return (
    <Link href='/'>
      <LogoSvg
        className={cn('shrink-0', className)}
        style={{ width: widthMap[variant], height: 'auto' }}
      />
    </Link>
  )
}
