import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Input } from './Input'

describe('Input', () => {
  describe('렌더링', () => {
    it('input 엘리먼트가 정상 렌더링된다', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('placeholder가 정상 렌더링된다', () => {
      render(<Input placeholder='영상 제목으로 검색' />)
      expect(screen.getByPlaceholderText('영상 제목으로 검색')).toBeInTheDocument()
    })

    it('검색 아이콘이 렌더링된다', () => {
      const { container } = render(<Input />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('추가 className이 적용된다', () => {
      render(<Input className='custom-class' />)
      expect(screen.getByRole('textbox')).toHaveClass('custom-class')
    })
  })

  describe('상호작용', () => {
    it('텍스트 입력 시 값이 변경된다', async () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      await userEvent.type(input, '뷰티 인플루언서')
      expect(input).toHaveValue('뷰티 인플루언서')
    })

    it('onChange 핸들러가 호출된다', async () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      await userEvent.type(screen.getByRole('textbox'), 'a')
      expect(handleChange).toHaveBeenCalled()
    })

    it('클릭 시 포커스가 활성화된다', async () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      expect(input).toHaveFocus()
    })
  })

  describe('disabled', () => {
    it('disabled prop이 input 엘리먼트에 전달된다', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('disabled 상태에서 텍스트 입력이 되지 않는다', async () => {
      render(<Input disabled />)
      const input = screen.getByRole('textbox')
      await userEvent.type(input, '텍스트')
      expect(input).toHaveValue('')
    })
  })
})
