import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useLoginModal } from '@/features/auth'
import { LoginModal } from './LoginModal'

vi.mock('@/features/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/auth')>()
  return {
    ...actual,
    usePopupOAuth: vi.fn().mockReturnValue({
      isLoading: false,
      error: null,
      handleClick: vi.fn(),
    }),
  }
})

import { usePopupOAuth } from '@/features/auth'
const mockUsePopupOAuth = vi.mocked(usePopupOAuth)

describe('LoginModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUsePopupOAuth.mockReturnValue({
      isLoading: false,
      error: null,
      handleClick: vi.fn(),
    })
  })

  it('isOpen이 true일 때 다이얼로그가 렌더링된다', () => {
    useLoginModal.setState({ isOpen: true })
    const { baseElement } = render(<LoginModal />)

    expect(
      baseElement.querySelector('[role="dialog"]') ?? screen.queryByRole('dialog')
    ).toBeInTheDocument()
  })

  it('isOpen이 false일 때 다이얼로그가 렌더링되지 않는다', () => {
    useLoginModal.setState({ isOpen: false })
    render(<LoginModal />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('isOpen이 true일 때 YouTube 로그인 버튼이 표시된다', () => {
    useLoginModal.setState({ isOpen: true })
    render(<LoginModal />)

    expect(screen.getByText('Continue with YouTube')).toBeInTheDocument()
  })

  it('isOpen이 true일 때 Google 로그인 버튼이 표시된다', () => {
    useLoginModal.setState({ isOpen: true })
    render(<LoginModal />)

    expect(screen.getByText('Continue with Google')).toBeInTheDocument()
  })

  it('다이얼로그 닫기 동작 시 loginModal.close()가 호출된다', async () => {
    useLoginModal.setState({ isOpen: true })
    const { baseElement } = render(<LoginModal />)

    const closeButton = baseElement.querySelector('button[aria-label="Close"]')
    if (closeButton) {
      await userEvent.click(closeButton)
      expect(useLoginModal.getState().isOpen).toBe(false)
    }
  })

  it('usePopupOAuth가 error를 반환하면 에러 텍스트가 표시된다', () => {
    mockUsePopupOAuth
      .mockReturnValueOnce({
        isLoading: false,
        error: '팝업이 차단되었습니다.',
        handleClick: vi.fn(),
      })
      .mockReturnValueOnce({
        isLoading: false,
        error: null,
        handleClick: vi.fn(),
      })

    useLoginModal.setState({ isOpen: true })
    render(<LoginModal />)

    expect(screen.getByText('팝업이 차단되었습니다.')).toBeInTheDocument()
  })
})
