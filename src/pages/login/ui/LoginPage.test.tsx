import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'

import { useLoginModal } from '@/features/auth'

const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}))

vi.mock('@/features/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/auth')>()
  return { ...actual }
})

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useLoginModal.getState().close()
  })

  it('컴포넌트 출력이 비어있다 (null 반환)', () => {
    const { container } = render(<LoginPage />)
    expect(container.innerHTML).toBe('')
  })

  it('마운트 시 loginModal.open()이 호출된다', () => {
    render(<LoginPage />)
    expect(useLoginModal.getState().isOpen).toBe(true)
  })

  it('마운트 시 router.replace(\'/\')가 호출된다', () => {
    render(<LoginPage />)
    expect(mockReplace).toHaveBeenCalledWith('/')
  })
})
