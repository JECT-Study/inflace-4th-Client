import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'

// next/image는 테스트 환경에서 일반 img 태그로 대체
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    fill: _fill,
    ...props
  }: {
    src: string
    alt: string
    fill?: boolean
    [key: string]: unknown
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('ToggleGroup', () => {
  describe('렌더링', () => {
    it('ToggleGroup이 정상 렌더링된다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('ToggleGroupItem children 텍스트가 정상 렌더링된다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByText('옵션 A')).toBeInTheDocument()
    })

    it('여러 ToggleGroupItem이 모두 렌더링된다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
          <ToggleGroupItem value='b'>옵션 B</ToggleGroupItem>
          <ToggleGroupItem value='c'>옵션 C</ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByText('옵션 A')).toBeInTheDocument()
      expect(screen.getByText('옵션 B')).toBeInTheDocument()
      expect(screen.getByText('옵션 C')).toBeInTheDocument()
    })

    it('추가 className이 ToggleGroup에 병합된다', () => {
      render(
        <ToggleGroup type='single' className='custom-class'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByRole('group')).toHaveClass('custom-class')
    })

    it('orientation="vertical" 시 flex-col 클래스가 적용된다', () => {
      render(
        <ToggleGroup type='single' orientation='vertical'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByRole('group')).toHaveClass('flex-col')
    })

    it('orientation="horizontal"(기본값) 시 flex-row 클래스가 적용된다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByRole('group')).toHaveClass('flex-row')
    })
  })

  describe('size 변형', () => {
    it('size="lg"(기본값) 적용 시 lg 크기 클래스가 포함된다', () => {
      render(
        <ToggleGroup type='single' size='lg'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
        </ToggleGroup>
      )
      const item = screen.getByRole('radio')
      expect(item.className).toMatch(/h-\[86px\]/)
    })

    it('size="fit" 적용 시 rounded-full 클래스가 포함된다', () => {
      render(
        <ToggleGroup type='single' size='fit'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
        </ToggleGroup>
      )
      const item = screen.getByRole('radio')
      expect(item).toHaveClass('rounded-full')
    })
  })

  describe('이미지 (Image)', () => {
    it('imgSrc 전달 시 img 요소가 렌더링된다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a' imgSrc='/test-icon.png' imgAlt='테스트 아이콘'>
            옵션 A
          </ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('imgAlt가 img 요소에 전달된다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a' imgSrc='/test-icon.png' imgAlt='테스트 아이콘'>
            옵션 A
          </ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByAltText('테스트 아이콘')).toBeInTheDocument()
    })

    it('imgSrc 미전달 시 img 요소가 렌더링되지 않는다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.queryByRole('img')).toBeNull()
    })

    it('iconPosition="top" 적용 시 flex-col 클래스가 아이템에 포함된다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem
            value='a'
            imgSrc='/test-icon.png'
            imgAlt='아이콘'
            iconPosition='top'>
            옵션 A
          </ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByRole('radio')).toHaveClass('flex-col')
    })

    it('iconPosition="left"(기본값) 적용 시 flex-col 클래스가 없다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem
            value='a'
            imgSrc='/test-icon.png'
            imgAlt='아이콘'
            iconPosition='left'>
            옵션 A
          </ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByRole('radio')).not.toHaveClass('flex-col')
    })
  })

  describe('상호작용', () => {
    it('type="single"에서 아이템 클릭 시 data-state가 on으로 변경된다', async () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
          <ToggleGroupItem value='b'>옵션 B</ToggleGroupItem>
        </ToggleGroup>
      )
      const itemA = screen.getByText('옵션 A').closest('[data-slot="toggle-group-item"]')!
      await userEvent.click(itemA)
      expect(itemA).toHaveAttribute('data-state', 'on')
    })

    it('type="single"에서 한 번에 하나의 아이템만 선택된다', async () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
          <ToggleGroupItem value='b'>옵션 B</ToggleGroupItem>
        </ToggleGroup>
      )
      const itemA = screen.getByText('옵션 A').closest('[data-slot="toggle-group-item"]')!
      const itemB = screen.getByText('옵션 B').closest('[data-slot="toggle-group-item"]')!

      await userEvent.click(itemA)
      await userEvent.click(itemB)

      expect(itemA).toHaveAttribute('data-state', 'off')
      expect(itemB).toHaveAttribute('data-state', 'on')
    })

    it('type="multiple"에서 여러 아이템을 동시에 선택할 수 있다', async () => {
      render(
        <ToggleGroup type='multiple'>
          <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
          <ToggleGroupItem value='b'>옵션 B</ToggleGroupItem>
        </ToggleGroup>
      )
      const itemA = screen.getByText('옵션 A').closest('[data-slot="toggle-group-item"]')!
      const itemB = screen.getByText('옵션 B').closest('[data-slot="toggle-group-item"]')!

      await userEvent.click(itemA)
      await userEvent.click(itemB)

      expect(itemA).toHaveAttribute('data-state', 'on')
      expect(itemB).toHaveAttribute('data-state', 'on')
    })
  })

  describe('disabled', () => {
    it('disabled prop이 ToggleGroupItem에 전달된다', () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a' disabled>
            비활성
          </ToggleGroupItem>
        </ToggleGroup>
      )
      expect(screen.getByRole('radio')).toBeDisabled()
    })

    it('disabled 아이템 클릭 시 선택되지 않는다', async () => {
      render(
        <ToggleGroup type='single'>
          <ToggleGroupItem value='a' disabled>
            비활성
          </ToggleGroupItem>
        </ToggleGroup>
      )
      const item = screen.getByRole('radio')
      await userEvent.click(item)
      expect(item).toHaveAttribute('data-state', 'off')
    })
  })
})
