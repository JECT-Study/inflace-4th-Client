import { create } from 'zustand'

import type { LoginModalState } from './types'

export const useLoginModal = create<LoginModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
