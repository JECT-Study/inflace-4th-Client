'use client'

import { useState } from 'react'

import type { WithdrawalReason } from '../model/withdrawalConfig'

import { DataDeletionModal } from './DataDeletionModal'
import { WithdrawalCompletedModal } from './WithdrawalCompletedModal'
import { WithdrawalReasonModal } from './WithdrawalReasonModal'

export type AccountDeleteStep = 'dataDeletion' | 'reason' | 'completed'

interface AccountDeleteModalFlowProps {
  open: boolean
  /* 시작 단계 — 기본 'dataDeletion'. 스토리북에서 특정 단계부터 확인할 때 사용 */
  initialStep?: AccountDeleteStep
  /* 모달 닫기 (좌측 "다시 생각해볼게요" 또는 dim/ESC) */
  onClose: () => void
  /* 완료 모달의 "홈으로 이동하기" 클릭 시 */
  onComplete: () => void
  /* 탈퇴 사유 제출 시 호출 (API 트리거 자리). customReason은 '기타' 선택 시 직접 입력값 */
  onSubmitReason?: (reason: WithdrawalReason, customReason?: string) => void
}

/**
 * 계정 탈퇴 모달 3단계 시퀀스
 * - 모달 1 (탈퇴 시 삭제되는 데이터) → 모달 2 (탈퇴 사유 및 확인) → 모달 3 (완료)
 * - 각 모달의 우측 버튼이 자동으로 다음 단계로 전환
 * - 페이지/스토리북 어느 곳에서든 동일하게 흐름 확인 가능
 *
 * 외부 컴포넌트는 open=false → true 전환마다 Inner가 새로 mount되어
 * step이 initialStep으로 초기화됨
 */
export function AccountDeleteModalFlow(props: AccountDeleteModalFlowProps) {
  if (!props.open) return null
  return <AccountDeleteModalFlowInner {...props} />
}

function AccountDeleteModalFlowInner({
  initialStep = 'dataDeletion',
  onClose,
  onComplete,
  onSubmitReason,
}: AccountDeleteModalFlowProps) {
  const [step, setStep] = useState<AccountDeleteStep>(initialStep)

  function handleSubmit(reason: WithdrawalReason, customReason?: string) {
    onSubmitReason?.(reason, customReason)
    setStep('completed')
  }

  return (
    <>
      <DataDeletionModal
        open={step === 'dataDeletion'}
        onClose={onClose}
        onNext={() => setStep('reason')}
      />
      <WithdrawalReasonModal
        open={step === 'reason'}
        onClose={onClose}
        onConfirm={handleSubmit}
      />
      <WithdrawalCompletedModal
        open={step === 'completed'}
        onGoHome={onComplete}
      />
    </>
  )
}
