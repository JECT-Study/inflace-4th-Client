import Image from 'next/image'
import LockButton from '../assets/lock-button.png'
import { type ReactNode } from 'react'
import type { UserPlan } from '@/shared/api/types'
import { usePlanGate } from '../model/usePlanGate'
import { LockTooltip } from './LockTooltip'

interface BlurPlanGateProps {
  requiredPlan: UserPlan
  children: ReactNode
}

// PlanGate의 그라데이션 dim 대신 전체 영역을 균일하게 블러 처리하는 변형
// (예: 시청자 반응 급상승 동영상 섹션의 잠금 미리보기)
export function BlurPlanGate({ requiredPlan, children }: BlurPlanGateProps) {
  const { isLocked } = usePlanGate(requiredPlan)

  if (!isLocked) return <>{children}</>

  return (
    <div className='relative'>
      {children}

      {/* 전체 블러 + 반투명 오버레이 */}
      <div
        className={
          'pointer-events-none absolute inset-0 bg-white/95 backdrop-blur-[1.2rem]'
        }
      />

      {/* 락 UI: 자물쇠 호버 시 shadcn Tooltip으로 안내 노출 */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <LockTooltip label='채널 연동 후 확인할 수 있어요'>
          <Image src={LockButton} alt='Lock' width={32} height={32} />
        </LockTooltip>
      </div>
    </div>
  )
}
