import IconError from '@/shared/assets/error-bold.svg'

export function AccountDeleteNoticeCard() {
  return (
    <div className='flex w-full flex-col gap-24 rounded-16 bg-[#fff0f0] p-32'>
      <div className='flex w-full items-start gap-12'>
        <div className='flex items-center p-2'>
          <IconError className='size-20 text-feedback-error' />
        </div>
        <div className='flex flex-1 flex-col gap-8'>
          <p className='text-noto-title-md-bold text-feedback-error'>
            계정 탈퇴 전 꼭 읽어주세요
          </p>
          <p className='text-noto-body-xxs-normal text-dashboard-negative'>
            탈퇴 후 <span className='font-bold'>30일 이내</span>에 재가입하면
            데이터 복구가 가능하지만,
            <br />
            30일 경과 후에는 모든 데이터가{' '}
            <span className='font-bold'>영구적으로 삭제</span>되며 복구가
            불가능합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
