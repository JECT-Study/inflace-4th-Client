import { SocialLoginButton, usePopupOAuth } from '@/features/auth'
import IconRightArrow from '@/shared/assets/rightwards-arrow-bold.svg'
import YouTubeIcon from '@/shared/assets/youtube.svg'
import { Button } from '@/shared/ui/button'
import { useOnboarding, useOnboardingModal } from '@/features/onboarding'
import { CHANNEL_ANALYSIS_VALUE } from '../model/optionsStep02'

export function OnboardingActionButtons() {
  const close = useOnboardingModal((s) => s.close)
  const youtube = usePopupOAuth({
    apiPath: '/api/auth/google',
    popupName: 'youtube-login',
  })

  const { selections } = useOnboardingModal()

  const { mutate } = useOnboarding()
  // role(step01 선택 옵션), need(step02 선택 옵션)
  const role = selections[1] as string
  const need = selections[2] as string[]

  // 나중에 할래요, 대시보드 둘러보기 용 데이터 전달
  const handelComplete = () => {
    // console.log({ role, need }) // POST 확인용 console
    mutate({ role, need }, { onSuccess: close })
  }

  // 유튜브 연동 용 데이터 전달
  const handelYoutube = () => {
    // console.log({ role, need }) // POST 확인용 console
    mutate({ role, need }, { onSuccess: youtube.handleClick })
  }

  return (
    <>
      {need?.includes(CHANNEL_ANALYSIS_VALUE) ? (
        // {/* 구글 로그인 및 내 채널 관리 & 분석 체크 */}
        <div className='flex flex-col'>
          <SocialLoginButton
            icon={<YouTubeIcon />}
            label={youtube.isLoading ? '로그인 중...' : 'Continue with YouTube'}
            onClick={handelYoutube}
            disabled={youtube.isLoading}
          />
          <button
            className='mt-(--spacing-xs) cursor-pointer text-center'
            onClick={handelComplete}>
            나중에 할래요
          </button>
        </div>
      ) : (
        // {/* 유튜브 로그인 시 및 내 채널 관리 & 분석 미 체크 */}
        <Button
          color={'primary'}
          size={'lg'}
          variant={'filled'}
          onClick={handelComplete}
          rightIcon={<IconRightArrow />}
          className='ml-auto'>
          대시보드 둘러보기
        </Button>
      )}
    </>
  )
}
