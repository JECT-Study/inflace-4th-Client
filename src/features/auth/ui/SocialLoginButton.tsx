'use client'

import { SocialLoginButtonProps } from './type'

//구글 로그인, 유튜브 로그인에 따라 다른 아이콘을 보여주고 다른 로직을 수행하는 버튼
export function SocialLoginButton({
  icon,
  label,
  onClick,
  disabled = false,
}: SocialLoginButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className='flex h-13.5 w-88 items-center justify-center rounded-6 border border-stroke-border-gray-stronger bg-white text-(length:--text-caption-md) leading-caption-md font-normal tracking-[0%] text-text-and-icon-default transition-colors disabled:pointer-events-none disabled:opacity-50'>
      <div className='top-3.75 left-17.5 flex size-fit items-center justify-center gap-16'>
        <span className='flex size-24 shrink-0 items-center justify-center *:size-full'>
          {icon}
        </span>
        <span className='font-(family-name:--typo-typeface-point) text-(length:--typo-size-label-lg) leading-(--typo-lineHeight-label-lg) font-semibold tracking-normal'>
          {label}
        </span>
      </div>
    </button>
  )
}
