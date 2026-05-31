'use client'

import Image from 'next/image'
import CameraIcon from '@/shared/assets/camera-bold.svg'
import FaviconIcon from '@/shared/assets/favicon.svg'
import { useMyProfile } from '@/features/me'
import { formatDate } from '@/shared/lib/format'

export function PersonalInfoSection() {
  const { data } = useMyProfile()
  const account = data?.account


  return (
    <div className='flex h-fit w-full flex-col gap-24 rounded-16 bg-white p-32 shadow-[0px_2px_6px_0px_#0D0D0D0A]'>
      <h2 className='text-noto-title-md-bold text-text-and-icon-primary'>
        개인 정보
      </h2>

      <div className='flex h-fit w-full min-w-[42rem] flex-col'>
        {/* 프로필 사진 + 정보 */}
        <div className='flex h-fit w-full min-w-[42rem] gap-[4rem]'>
          {/* 프로필 사진 */}
          <div className='relative size-[9.2rem] shrink-0'>
            <div className='size-full overflow-hidden rounded-full'>
              {account?.profileImageUrl ? (
                <Image
                  src={account.profileImageUrl}
                  alt='프로필 사진'
                  fill
                  className='rounded-full object-cover'
                />
              ) : (
                <div className='flex size-full items-center justify-center rounded-full bg-background-gray-default'>
                  <FaviconIcon className='size-[9.2rem]' />
                </div>
              )}
            </div>
            {/* 프로필 변경 버튼 */}
            <button
              type='button'
              aria-label='프로필 사진 변경'
              className='absolute top-[6.2rem] left-[6.2rem] flex size-[2.8rem] cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-background-gray-default'
            >
              <CameraIcon className='size-[2rem]' />
            </button>
          </div>

          {/* 정보 */}
          <div className='flex h-fit w-full flex-col gap-16'>
            <div className='flex h-fit w-full gap-20'>
              <h4 className='h-[2rem] w-[6rem] text-noto-body-xs-normal text-text-and-icon-secondary'>
                이름
              </h4>
              <span className='h-fit w-full text-noto-body-xs-normal text-text-and-icon-primary'>
                {account?.name ?? '-'}
              </span>
            </div>

            <div className='flex h-fit w-full gap-20'>
              <h4 className='h-[2rem] w-[6rem] text-noto-body-xs-normal text-text-and-icon-secondary'>
                이메일
              </h4>
              <span className='h-fit w-full text-noto-body-xs-normal text-text-and-icon-primary'>
                {account?.email ?? '-'}
              </span>
            </div>

            <div className='flex h-fit w-full gap-20'>
              <h4 className='h-[2rem] w-[6rem] text-noto-body-xs-normal text-text-and-icon-secondary'>
                가입일
              </h4>
              <span className='h-fit w-full text-noto-body-xs-normal'>
                {account?.enteredAt ? (() => { const { year, month, day } = formatDate(account.enteredAt); return `${year}.${month}.${day}` })() : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* 계정 탈퇴 TODO: 계정 탈퇴 페이지로 라우팅 */}
        <span className='block cursor-pointer px-8 py-4 text-right text-noto-body-xs-normal text-text-and-icon-secondary underline'>
          계정 탈퇴
        </span>
      </div>
    </div>
  )
}
