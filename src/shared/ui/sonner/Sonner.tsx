'use client'

import { Toaster as Sonner, type ToasterProps } from 'sonner'
import IconError from '@/shared/assets/error-bold.svg?react'
import IconInfo from '@/shared/assets/info-bold.svg?react'
import IconSuccess from '@/shared/assets/check-bold.svg?react'
import IconClose from '@/shared/assets/x-bold.svg?react'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group'
      richColors
      closeButton
      icons={{
        success: <IconSuccess className='size-24 [&_path]:fill-feedback-success' />,
        info: <IconInfo className='size-24 [&_path]:fill-feedback-informative' />,
        error: <IconError className='size-24 [&_path]:fill-feedback-error' />,
        close: <IconClose className='size-16 [&_path]:fill-text-and-icon-tertiary' />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          '--success-bg': '#EBFFE8',
          '--success-text': '#008A3C',
          '--success-border': '#008A3C',
          '--info-bg': '#E9EDFF',
          '--info-text': '#2473E6',
          '--info-border': '#2473E6',
          '--error-bg': '#FFF0F0',
          '--error-text': '#E02F52',
          '--error-border': '#E02F52',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'cn-toast relative w-max! min-w-[19.6rem] pl-24! py-16! pr-48! rounded-6 gap-8',
          title:
            'text-(length:--text-label-md)! lending-(--leading-label-md) font-normal',
          closeButton:
            'bg-transparent! border-0! [--toast-close-button-start:auto] [--toast-close-button-end:16px] [--toast-close-button-transform:translateY(-50%)] top-[50%]!',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
