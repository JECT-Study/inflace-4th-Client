import { describe, it, expect, beforeEach } from 'vitest'

import { useLoginModal } from './useLoginModal'

describe('useLoginModal', () => {
  beforeEach(() => {
    useLoginModal.getState().close()
  })

  it('초기 상태: isOpen이 false다', () => {
    expect(useLoginModal.getState().isOpen).toBe(false)
  })

  it('open() 호출 시 isOpen이 true가 된다', () => {
    useLoginModal.getState().open()
    expect(useLoginModal.getState().isOpen).toBe(true)
  })

  it('close() 호출 시 isOpen이 false가 된다', () => {
    useLoginModal.getState().open()
    useLoginModal.getState().close()
    expect(useLoginModal.getState().isOpen).toBe(false)
  })

  it('open() → close() 전환이 정상 동작한다', () => {
    useLoginModal.getState().open()
    expect(useLoginModal.getState().isOpen).toBe(true)

    useLoginModal.getState().close()
    expect(useLoginModal.getState().isOpen).toBe(false)
  })
})
