import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'

vi.mock('@/shared/assets/down-bold.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select'

// jsdom에서 Radix UI Select가 포인터 이벤트를 사용하기 위한 polyfill
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  window.HTMLElement.prototype.releasePointerCapture = vi.fn()
  window.HTMLElement.prototype.hasPointerCapture = vi.fn().mockReturnValue(true)
})

const ITEMS = ['최신순', '조회수순', '좋아요순']

function renderSelect(
  icon: 'none' | 'left' | 'right' | 'all' = 'right',
  disabled = false,
) {
  return render(
    <Select>
      <SelectTrigger icon={icon} disabled={disabled}>
        <SelectValue placeholder='정렬 선택' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {ITEMS.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>,
  )
}

describe('Select', () => {
  describe('렌더링', () => {
    it('트리거가 정상 렌더링된다', () => {
      renderSelect()
      expect(
        screen.getByRole('combobox'),
      ).toBeInTheDocument()
    })

    it('placeholder 텍스트가 표시된다', () => {
      renderSelect()
      expect(screen.getByText('정렬 선택')).toBeInTheDocument()
    })

    it('data-slot="select-trigger" 속성이 트리거에 존재한다', () => {
      const { container } = renderSelect()
      expect(
        container.querySelector('[data-slot="select-trigger"]'),
      ).toBeInTheDocument()
    })
  })

  describe('icon prop', () => {
    it('icon="none" 시 SVG 아이콘이 렌더링되지 않는다', () => {
      const { container } = renderSelect('none')
      const trigger = container.querySelector('[data-slot="select-trigger"]')!
      expect(trigger.querySelectorAll('svg')).toHaveLength(0)
    })

    it('icon="left" 시 왼쪽 SVG 아이콘 1개가 렌더링된다', () => {
      const { container } = renderSelect('left')
      const trigger = container.querySelector('[data-slot="select-trigger"]')!
      expect(trigger.querySelectorAll('svg')).toHaveLength(1)
    })

    it('icon="right" 시 오른쪽 SVG 아이콘 1개가 렌더링된다', () => {
      const { container } = renderSelect('right')
      const trigger = container.querySelector('[data-slot="select-trigger"]')!
      expect(trigger.querySelectorAll('svg')).toHaveLength(1)
    })

    it('icon="all" 시 SVG 아이콘 2개가 렌더링된다', () => {
      const { container } = renderSelect('all')
      const trigger = container.querySelector('[data-slot="select-trigger"]')!
      expect(trigger.querySelectorAll('svg')).toHaveLength(2)
    })

    it('icon="left" 시 아이콘이 children 앞에 위치한다', () => {
      const { container } = renderSelect('left')
      const trigger = container.querySelector('[data-slot="select-trigger"]')!
      const nodes = Array.from(trigger.childNodes)
      const svgIndex = nodes.findIndex((n) => (n as Element).tagName === 'svg')
      const valueIndex = nodes.findIndex(
        (n) => (n as Element).getAttribute?.('data-slot') === 'select-value',
      )
      expect(svgIndex).toBeLessThan(valueIndex)
    })
  })

  describe('상호작용', () => {
    it('트리거 클릭 시 드롭다운이 열리고 아이템이 표시된다', async () => {
      renderSelect()
      await userEvent.click(screen.getByRole('combobox'))
      expect(await screen.findByRole('listbox')).toBeInTheDocument()
      for (const item of ITEMS) {
        expect(screen.getByRole('option', { name: item })).toBeInTheDocument()
      }
    })

    it('아이템 선택 시 트리거 텍스트가 선택값으로 변경된다', async () => {
      renderSelect()
      await userEvent.click(screen.getByRole('combobox'))
      await userEvent.click(await screen.findByRole('option', { name: '조회수순' }))
      expect(screen.getByText('조회수순')).toBeInTheDocument()
    })

    it('아이템 선택 후 드롭다운이 닫힌다', async () => {
      renderSelect()
      await userEvent.click(screen.getByRole('combobox'))
      await userEvent.click(await screen.findByRole('option', { name: '최신순' }))
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('disabled', () => {
    it('disabled prop이 트리거에 전달된다', () => {
      renderSelect('right', true)
      expect(screen.getByRole('combobox')).toBeDisabled()
    })

    it('disabled 상태에서 클릭해도 드롭다운이 열리지 않는다', async () => {
      renderSelect('right', true)
      await userEvent.click(screen.getByRole('combobox'))
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })
})
