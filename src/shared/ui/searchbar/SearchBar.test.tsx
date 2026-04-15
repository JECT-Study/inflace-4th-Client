import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  describe('렌더링', () => {
    it('input이 정상 렌더링된다', () => {
      render(<SearchBar />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('초기값이 없을 때 X 버튼이 표시되지 않는다', () => {
      render(<SearchBar />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('defaultValue가 있을 때 X 버튼이 표시된다', () => {
      render(<SearchBar defaultValue='검색어' />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('입력', () => {
    it('텍스트 입력 시 X 버튼이 나타난다', async () => {
      render(<SearchBar />)
      const input = screen.getByRole('textbox')
      await userEvent.type(input, '검색어')
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('onChange prop이 입력 시 호출된다', async () => {
      const handleChange = vi.fn()
      render(<SearchBar onChange={handleChange} />)
      await userEvent.type(screen.getByRole('textbox'), 'a')
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('X 버튼', () => {
    it('X 버튼 클릭 시 input 값이 초기화된다', async () => {
      render(<SearchBar />)
      const input = screen.getByRole('textbox')
      await userEvent.type(input, '검색어')
      await userEvent.click(screen.getByRole('button'))
      expect(input).toHaveValue('')
    })

    it('X 버튼 클릭 후 X 버튼이 사라진다', async () => {
      render(<SearchBar />)
      await userEvent.type(screen.getByRole('textbox'), '검색어')
      await userEvent.click(screen.getByRole('button'))
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('focus', () => {
    it('input이 focus 가능하다', async () => {
      render(<SearchBar />)
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      expect(input).toHaveFocus()
    })
  })
})
