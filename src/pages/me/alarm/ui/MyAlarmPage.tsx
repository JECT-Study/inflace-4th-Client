'use client'

import { Switch } from '@/shared/ui/shadcn/switch'

export function MyAlarmPage() {
  return (
    <div className='flex h-fit w-full flex-col gap-xl p-md'>
      {/* 타이틀 */}
      <div className='h-fit w-full'>
        <h3 className='text-ibm-title-lg-normal text-text-and-icon-default'>
          알림 설정
        </h3>
      </div>
      <div className='flex max-w-[118.6rem] flex-col gap-24'>
        {/* 결제 알림 */}
        <div className='flex flex-col gap-lg rounded-16 bg-white p-xl shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
          <div className='flex items-end justify-between gap-8'>
            <div className='flex flex-col gap-8'>
              <p className='text-noto-title-md-bold text-text-and-icon-primary'>
                결제 알림
              </p>
              <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
                결제 관련 중요한 알림
              </span>
            </div>
            <Switch />
          </div>

          <div className='flex items-end justify-between gap-8'>
            <div>
              <p className='text-noto-body-xs-bold text-text-and-icon-primary'>
                결제 관련 알림
              </p>
              <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
                결제 완료, 실패, 다음 결제 예정일을 알려드려요
              </span>
            </div>
            <Switch />
          </div>
        </div>
        {/* 마케팅 알림 */}
        <div className='flex flex-col gap-lg rounded-16 bg-white p-xl shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
          <div className='flex items-end justify-between gap-8'>
            <div className='flex flex-col gap-8'>
              <p className='text-noto-title-md-bold text-text-and-icon-primary'>
                마케팅 알림
              </p>
              <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
                새 기능 및 이벤트 안내 (선택)
              </span>
            </div>
            <Switch />
          </div>

          <div className='flex items-end justify-between gap-8'>
            <div>
              <p className='text-noto-body-xs-bold text-text-and-icon-primary'>
                새 기능 안내
              </p>
              <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
                플랫폼의 새로운 기능을 가장 먼저 알려드려요
              </span>
            </div>
            <Switch />
          </div>

          <div className='flex items-end justify-between gap-8'>
            <div>
              <p className='text-noto-body-xs-bold text-text-and-icon-primary'>
                이벤트 및 혜택
              </p>
              <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
                특별 할인이나 이벤트 정보를 보내드려요
              </span>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  )
}
