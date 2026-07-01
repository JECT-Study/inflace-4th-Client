'use client'

import { XIcon } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import { Button } from '@/shared/ui/button'
import {
  useGoogleAuthNoticeModal,
  confirmGoogleAuthNotice,
} from '@/features/googleAuthNotice'

const STEPS = [
  { label: '[고급] 클릭' },
  { label: '[inflace로 이동] 클릭' },
  { label: 'Google 로그인 완료' },
]

export function GoogleAuthNoticeModal() {
  const isOpen = useGoogleAuthNoticeModal((s) => s.isOpen)
  const close = useGoogleAuthNoticeModal((s) => s.close)

  const handleConfirm = () => {
    confirmGoogleAuthNotice()
    close()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          confirmGoogleAuthNotice()
          close()
        }
      }}>
      <DialogContent
        showCloseButton={false}
        overlayClassName='bg-background-dim-default'
        className='flex h-fit w-[60rem] max-w-[60rem]! flex-col gap-24 rounded-16 bg-white p-40'>
        <DialogClose asChild>
          <button
            type='button'
            aria-label='닫기'
            onClick={handleConfirm}
            className='absolute top-24 right-24 flex size-32 cursor-pointer items-center justify-center rounded-full bg-background-gray-default text-text-and-icon-tertiary'>
            <XIcon className='size-16' />
          </button>
        </DialogClose>

        {/* 헤더 */}
        <div className='flex flex-col gap-8'>
          <p className='text-noto-label-md-bold text-brand-primary'>
            Google 로그인 사전 안내
          </p>
          <DialogTitle className='text-ibm-heading-lg-bold text-text-and-icon-default'>
            로그인 과정에서 Google 안내 문구가 표시될 수 있어요
          </DialogTitle>
        </div>

        {/* 설명 */}
        <p className='text-noto-body-md-normal text-text-and-icon-primary'>
          Inflace는 베타 서비스 단계임에 따라 Google 인증 심사 중에 있습니다.
          <br />
          로그인 중 &ldquo;Google에서 확인하지 않은 앱&rdquo; 안내가 표시될 수
          있습니다.
        </p>

        {/* 정보 배너 */}
        <div className='flex items-start gap-8 rounded-8 border-[#DDE2FF] bg-[#F7F8FF] p-16'>
          <span className='mt-2 flex size-24 shrink-0 items-center justify-center rounded-full bg-brand-primary text-noto-body-sm-normal text-white'>
            i
          </span>
          <p className='text-noto-body-sm-bold text-text-and-icon-primary'>
            Inflace는 로그인에 필요한 최소 권한만 요청하며,
            <br />
            계정 정보는 안전하게 처리됩니다.
          </p>
        </div>

        {/* 순서 안내 */}
        <div className='flex flex-col gap-12'>
          <p className='text-noto-label-md-bold text-text-and-icon-default'>
            서비스 이용을 위해 아래 순서로 진행해주세요.
          </p>
          <ol className='flex flex-col gap-8'>
            {STEPS.map((step, index) => (
              <li
                key={step.label}
                className='border-stroke-border-primary flex items-center gap-12 rounded-8 border px-16 py-16'>
                <span className='flex size-24 shrink-0 items-center justify-center rounded-full bg-text-and-icon-default text-noto-label-sm-bold text-white'>
                  {index + 1}
                </span>
                <span className='text-noto-body-md-bold text-text-and-icon-default'>
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <Button
          color='primary'
          variant='filled'
          size='lg'
          className='mt-auto w-full justify-center'
          onClick={handleConfirm}>
          확인하고 Google 로그인 계속하기
        </Button>
      </DialogContent>
    </Dialog>
  )
}
