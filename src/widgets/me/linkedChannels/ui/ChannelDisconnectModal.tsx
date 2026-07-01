'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import { Button } from '@/shared/ui/button'

interface ChannelDisconnectModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  isPending?: boolean
}

export function ChannelDisconnectModal({
  open,
  onClose,
  onConfirm,
  isPending = false,
}: ChannelDisconnectModalProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        overlayClassName='bg-background-dim-default'
        className='flex h-fit w-full min-w-[39rem] flex-col items-center gap-32 rounded-16 bg-white p-40'>
        <DialogTitle className='text-center text-ibm-title-lg-normal text-text-and-icon-default'>
          유튜브 채널 연동을 해지하시겠습니까?
        </DialogTitle>

        <div className='flex w-full cursor-pointer gap-12'>
          <Button
            type='button'
            color='secondary'
            variant='outlined'
            size='lg'
            onClick={onClose}
            disabled={isPending}
            className='flex-1'>
            취소
          </Button>
          <Button
            type='button'
            color='secondary'
            variant='filled'
            size='lg'
            onClick={onConfirm}
            disabled={isPending}
            className='flex-1'>
            해지하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
