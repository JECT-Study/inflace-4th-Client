'use client'

import { XIcon } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/shadcn/dialog'
import { Button } from '@/shared/ui/shadcn/button'
import {
  SocialLoginButton,
  useLoginModal,
  usePopupOAuth,
} from '@/features/auth'
import GoogleIcon from '@/features/auth/ui/social-login/assets/google-icon.svg'
import YouTubeIcon from '@/features/auth/ui/social-login/assets/youtube-icon.svg'

export function LoginModal() {
  const isOpen = useLoginModal((s) => s.isOpen)
  const close = useLoginModal((s) => s.close)

  const youtube = usePopupOAuth({
    apiPath: '/api/auth/google',
    popupName: 'youtube-login',
  })
  const google = usePopupOAuth({
    apiPath: '/api/auth/google',
    popupName: 'google-login',
  })

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        showCloseButton={false}
        className='flex h-100 flex-col bg-[var(--primitive-color-brand-vivid-75)] p-6 sm:max-w-100'>
        {/* 상단: 로고 + X 버튼 */}
        <div className='flex items-center justify-between'>
          {/* TODO: inflace 로고 에셋으로 교체 */}
          <span className='text-[length:var(--text-body-md)] font-medium text-[var(--color-brand-primary)] italic'>
            inflace
          </span>
          <Button variant='ghost' size='icon-sm' onClick={close}>
            <XIcon />
            <span className='sr-only'>Close</span>
          </Button>
        </div>

        {/* 중앙 콘텐츠 */}
        <div className='flex flex-1 flex-col items-center justify-center gap-4'>
          {/* TODO: fl 로고 에셋으로 교체 */}
          <div className='flex size-16 items-center justify-center rounded-2xl bg-[var(--color-brand-primary)] text-2xl font-bold text-white'>
            fl
          </div>

          {/* 메인 문구 */}
          <DialogTitle className='text-center text-[length:var(--text-body-md)] leading-[var(--leading-body-md)] font-medium tracking-[-1%] text-[var(--color-text-and-icon-default)]'>
            inflace는 인플루언서의 플레이스입니다.
          </DialogTitle>

          {/* 서브 문구 */}
          <p className='text-center text-[length:var(--text-label-xs)] leading-[var(--leading-label-xs)] font-medium tracking-[-1.5%] text-[var(--color-text-and-icon-tertiary)]'>
            인플루언서 탐색, 채널 관리, 콘텐츠 분석을{' '}
            <span className='text-[var(--color-brand-primary)]'>inflace</span>
            에서 시작하세요.
          </p>

          {/* 로그인 버튼 */}
          <div className='flex w-full flex-col gap-2'>
            <div className='flex flex-col items-center gap-3'>
              <SocialLoginButton
                icon={<YouTubeIcon />}
                label={
                  youtube.isLoading ? '로그인 중...' : 'Sign in with Youtube'
                }
                onClick={youtube.handleClick}
                disabled={youtube.isLoading}
              />
              {youtube.error && (
                <p className='text-sm text-destructive'>{youtube.error}</p>
              )}
            </div>
            <div className='flex flex-col items-center gap-3'>
              <SocialLoginButton
                icon={<GoogleIcon />}
                label={
                  google.isLoading ? '로그인 중...' : 'Sign in with Google'
                }
                onClick={google.handleClick}
                disabled={google.isLoading}
              />
              {google.error && (
                <p className='text-sm text-destructive'>{google.error}</p>
              )}
            </div>
          </div>
        </div>

        {/* 하단 링크 */}
        <div className='flex items-center justify-center gap-6 text-[length:var(--text-caption-sm)] leading-[var(--leading-caption-sm)] text-[var(--color-text-and-icon-tertiary)]'>
          <span>개인정보 처리방침</span>
          <span>서비스 이용약관</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
