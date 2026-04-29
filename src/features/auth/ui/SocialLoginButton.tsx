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
      className='flex h-[5.4rem] w-[35.2rem] items-center justify-center rounded-6 border border-stroke-border-gray-stronger bg-white transition-colors disabled:pointer-events-none disabled:opacity-50'>
      <div className='top-[1.5rem] left-[7rem] flex size-fit items-center justify-center gap-16'>
        <span className='flex size-24 shrink-0 items-center justify-center *:size-full'>
          {icon}
        </span>
        <span className='text-ibm-label-lg-bold text-text-and-icon-primary'>
          {label}
        </span>
      </div>
    </button>
  )
}
