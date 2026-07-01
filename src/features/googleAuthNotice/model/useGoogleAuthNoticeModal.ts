import { create } from 'zustand'

import type { GoogleAuthNoticeModalState } from './types'

export const useGoogleAuthNoticeModal = create<GoogleAuthNoticeModalState>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  })
)
