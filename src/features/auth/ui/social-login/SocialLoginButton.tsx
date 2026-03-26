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
      className='flex w-full items-center justify-center gap-[var(--spacing-8)] rounded-[var(--radius-24)] border border-[var(--color-stroke-border-default)] px-[var(--spacing-16)] py-[var(--spacing-10)] text-[length:var(--text-caption-md)] leading-caption-md font-normal tracking-[0%] text-[var(--color-text-and-icon-default)] transition-colors hover:bg-[var(--color-background-gray-default)] disabled:pointer-events-none disabled:opacity-50'>
      <span className='flex shrink-0 items-center'>{icon}</span>
      <span>{label}</span>
    </button>
  )
}
