'use client'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import {
  useYoutubeConnectModal,
  useConnectChannel,
  YoutubeConnectActions,
} from '@/features/auth'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export function YoutubeConnectModal() {
  const isOpen = useYoutubeConnectModal((s) => s.isOpen)
  const close = useYoutubeConnectModal((s) => s.close)

  const { mutate: connect, isPending, error } = useConnectChannel()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogOverlay className='bg-background-dim-default' />
      <DialogContent
        showCloseButton={false}
        className='flex w-full flex-col items-center justify-center gap-40 rounded-16 bg-white p-40 lg:max-w-[73rem] lg:px-[12rem]'>
        <VisuallyHidden>
          <DialogTitle>유튜브 채널 연동하기</DialogTitle>
        </VisuallyHidden>

        {/* 헤더 + 이미지 묶음 */}
        <div className='flex w-full flex-col items-center gap-20'>
          {/* 헤더: 제목 + 설명 */}
          <div className='flex w-full flex-col items-center gap-8'>
            <h2 className='text-center text-ibm-heading-sm-normal text-text-and-icon-default'>
              유튜브 채널 연동하기
            </h2>
            <p className='text-center text-noto-body-xs-normal text-text-and-icon-primary'>
              채널을 연동하고 내 채널 데이터 분석 및 인플루언서 분석 기능을
              사용해보세요.
            </p>
          </div>

          {/* 목업 이미지 */}
          <div className='h-[32.6rem] w-full bg-background-gray-default' />
        </div>

        <YoutubeConnectActions
          onConnect={() => connect()}
          onLater={close}
          isPending={isPending}
          error={error}
        />
      </DialogContent>
    </Dialog>
  )
}
