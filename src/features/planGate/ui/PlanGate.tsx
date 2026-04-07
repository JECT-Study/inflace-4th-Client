import Image from 'next/image'
import LockButton from '../assets/lock-button.png'
import { type ReactNode } from 'react'

import type { UserPlan } from '@/shared/api/types'
import { usePlanGate } from '../model/usePlanGate'

interface PlanGateProps {
  requiredPlan: UserPlan
  children: ReactNode
}

export function PlanGate({ requiredPlan, children }: PlanGateProps) {
  const { isLocked } = usePlanGate(requiredPlan)

  if (!isLocked) return <>{children}</>

  return (
    <div className='relative'>
      {children}

      {/* 그라데이션 오버레이 */}
      <div
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, #FFFFFF 49.68%)',
        }}
      />

      {/* 락 UI */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <Image src={LockButton} alt='Lock' width={32} height={32} />
      </div>
    </div>
  )
}
