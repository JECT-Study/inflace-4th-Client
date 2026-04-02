import { SocialLoginButton, usePopupOAuth } from '@/features/auth'
import IconRightArrow from '@/shared/assets/rightwards-arrow-bold.svg'
import YouTubeIcon from '@/shared/assets/youtube.svg'
import { Button } from '@/shared/ui/button'
import { useOnboardingModal } from '@/features/onboarding/model/useOnboardingModal'

export function OnboardingActionButtons() {
  const close = useOnboardingModal((s) => s.close)

  const youtube = usePopupOAuth({
    apiPath: '/api/auth/google',
    popupName: 'youtube-login',
  })
  return (
    <>
      {/* 임시 div 태그 */}
      <div className='flex flex-col'>
        {/* 구글 로그인 시 */}
        <div className='flex flex-col'>
          <SocialLoginButton
            icon={<YouTubeIcon />}
            label={youtube.isLoading ? '로그인 중...' : 'Continue with YouTube'}
            onClick={youtube.handleClick}
            disabled={youtube.isLoading}
          />
          <button
            className='mt-[var(--spacing-xs)] cursor-pointer text-center'
            onClick={close}>
            나중에 할래요
          </button>
        </div>
        {/* 유튜브 연동 완료 시 */}
        <Button
          color={'primary'}
          size={'lg'}
          style={'filled'}
          onClick={close}
          rightIcon={<IconRightArrow />}
          className='ml-auto'>
          대시보드 둘러보기
        </Button>
      </div>
    </>
  )
}
