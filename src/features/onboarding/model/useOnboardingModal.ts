import { create } from 'zustand'

import type { OnboardingModalState } from './types'

export const useOnboardingModal = create<OnboardingModalState>((set) => ({
  isOpen: false,
  step: 1,
  featureIndex: 0,
  selections: {}, //{[step]: value} 형태로 각 step 옵션 값 저장 / setSelection 참조
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  nextStep: () =>
    set((s) => ({ step: s.step < 4 ? s.step + 1 : s.step, featureIndex: 0 })),
  prevStep: () =>
    set((s) => ({ step: s.step >= 2 ? s.step - 1 : s.step, featureIndex: 0 })),
  nextFeature: () => set((s) => ({ featureIndex: s.featureIndex + 1 })),
  setSelection: (step, value) =>
    set((s) => ({ selections: { ...s.selections, [step]: value } })),
}))
