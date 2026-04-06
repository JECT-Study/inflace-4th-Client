import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { toast } from 'sonner'

import { Toaster } from './Sonner'

vi.mock('@/shared/assets/error-bold.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid='icon-error' {...props} />
  ),
}))
vi.mock('@/shared/assets/info-bold.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid='icon-info' {...props} />
  ),
}))
vi.mock('@/shared/assets/check-bold.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid='icon-success' {...props} />
  ),
}))
vi.mock('@/shared/assets/x-bold.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid='icon-close' {...props} />
  ),
}))

describe('Toaster', () => {
  beforeEach(() => {
    Element.prototype.setPointerCapture = vi.fn()
  })

  it('렌더링된다', async () => {
    render(<Toaster />)
    toast('테스트')
    await waitFor(() => {
      expect(document.body.querySelector('[data-sonner-toaster]')).toBeInTheDocument()
    })
  })

  it('toast.success 호출 시 성공 메시지가 표시된다', async () => {
    render(<Toaster />)
    toast.success('성공 메시지')
    await waitFor(() => {
      expect(screen.getByText('성공 메시지')).toBeInTheDocument()
    })
  })

  it('toast.info 호출 시 정보 메시지가 표시된다', async () => {
    render(<Toaster />)
    toast.info('정보 메시지')
    await waitFor(() => {
      expect(screen.getByText('정보 메시지')).toBeInTheDocument()
    })
  })

  it('toast.error 호출 시 오류 메시지가 표시된다', async () => {
    render(<Toaster />)
    toast.error('오류 메시지')
    await waitFor(() => {
      expect(screen.getByText('오류 메시지')).toBeInTheDocument()
    })
  })

  it('닫기 버튼 클릭 시 토스트가 사라진다', async () => {
    render(<Toaster />)
    toast.success('닫기 테스트')

    await waitFor(() => {
      expect(screen.getByText('닫기 테스트')).toBeInTheDocument()
    })

    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText('닫기 테스트')).not.toBeInTheDocument()
    })
  })
})
