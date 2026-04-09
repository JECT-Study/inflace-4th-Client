import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  describe('렌더링', () => {
    it('children 텍스트가 정상 렌더링된다', () => {
      render(<Button>확인</Button>)
      expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument()
    })

    it('기본 variant(primary/filled/lg) 클래스가 적용된다', () => {
      render(<Button>버튼</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-brand-primary')
    })

    it('추가 className이 기존 클래스와 병합된다', () => {
      render(<Button className='custom-class'>버튼</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('type, aria-label 등 네이티브 button props가 전달된다', () => {
      render(
        <Button type='submit' aria-label='제출 버튼'>
          제출
        </Button>
      )
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('aria-label', '제출 버튼')
    })
  })

  describe('아이콘', () => {
    it('leftIcon 전달 시 아이콘 wrapper span이 렌더링된다', () => {
      render(<Button leftIcon={<span data-testid='left-icon' />}>버튼</Button>)
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('rightIcon 전달 시 아이콘 wrapper span이 렌더링된다', () => {
      render(
        <Button rightIcon={<span data-testid='right-icon' />}>버튼</Button>
      )
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('아이콘 미전달 시 아이콘 wrapper span이 없다', () => {
      render(<Button>버튼</Button>)
      const button = screen.getByRole('button')
      // 아이콘 wrapper span이 없으면 aria-hidden 요소도 없어야 함
      expect(button.querySelector('[aria-hidden="true"]')).toBeNull()
    })

    it('아이콘 span에 aria-hidden="true"가 적용된다', () => {
      render(<Button leftIcon={<span />}>버튼</Button>)
      const button = screen.getByRole('button')
      const iconWrapper = button.querySelector('[aria-hidden="true"]')
      expect(iconWrapper).toBeInTheDocument()
    })

    it('아이콘 wrapper span에 w-[1em] h-[1em] 클래스가 적용된다', () => {
      render(<Button leftIcon={<span />}>버튼</Button>)
      const button = screen.getByRole('button')
      const iconWrapper = button.querySelector('[aria-hidden="true"]')
      expect(iconWrapper).toHaveClass('w-[1em]', 'h-[1em]')
    })
  })

  describe('상호작용', () => {
    it('onClick 핸들러가 클릭 시 호출된다', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>버튼</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('disabled', () => {
    it('disabled prop이 button 엘리먼트에 전달된다', () => {
      render(<Button disabled>버튼</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabled 상태에서 onClick이 호출되지 않는다', async () => {
      const handleClick = vi.fn()
      render(
        <Button disabled onClick={handleClick}>
          버튼
        </Button>
      )
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('variant 클래스', () => {
    it('color="secondary" 적용 시 secondary 클래스가 포함된다', () => {
      render(
        <Button color='secondary' variant='filled'>
          버튼
        </Button>
      )
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-brand-secondary')
    })

    it('variant="outlined" 적용 시 border 클래스가 포함된다', () => {
      render(
        <Button color='primary' variant='outlined'>
          버튼
        </Button>
      )
      expect(screen.getByRole('button')).toHaveClass('border')
    })

    it('size="xs" 적용 시 xs 크기 클래스가 포함된다', () => {
      render(<Button size='xs'>버튼</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-noto-label-xs-normal')
    })
  })
})
