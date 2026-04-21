import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Calendar, CalendarRangePicker } from './Calendar'

// ─── CalendarRangePicker ────────────────────────────────────────────────────

describe('CalendarRangePicker', () => {
  describe('렌더링', () => {
    it('기본 label "기간" 텍스트가 표시된다', () => {
      render(<CalendarRangePicker />)
      expect(screen.getByRole('button', { name: '기간' })).toBeInTheDocument()
    })

    it('label prop으로 커스텀 텍스트를 표시한다', () => {
      render(<CalendarRangePicker label='날짜' />)
      expect(screen.getByRole('button', { name: '날짜' })).toBeInTheDocument()
    })

    it('초기에 캘린더 드롭다운이 닫혀있다', () => {
      render(<CalendarRangePicker />)
      expect(screen.queryByRole('button', { name: '완료' })).not.toBeInTheDocument()
    })
  })

  describe('토글 동작', () => {
    it('토글 클릭 시 캘린더가 열린다', async () => {
      render(<CalendarRangePicker />)
      await userEvent.click(screen.getByRole('button', { name: '기간' }))
      expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument()
    })

    it('외부 클릭 시 캘린더가 닫힌다', async () => {
      render(<CalendarRangePicker />)
      await userEvent.click(screen.getByRole('button', { name: '기간' }))
      expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument()

      fireEvent.mouseDown(document.body)
      expect(screen.queryByRole('button', { name: '완료' })).not.toBeInTheDocument()
    })
  })

  describe('완료 버튼', () => {
    it('날짜 미선택 시 완료 버튼이 비활성화된다', async () => {
      render(<CalendarRangePicker />)
      await userEvent.click(screen.getByRole('button', { name: '기간' }))
      expect(screen.getByRole('button', { name: '완료' })).toBeDisabled()
    })

    it('날짜 미선택 상태에서 완료 버튼 클릭해도 캘린더가 닫히지 않는다', async () => {
      render(<CalendarRangePicker />)
      await userEvent.click(screen.getByRole('button', { name: '기간' }))

      await userEvent.click(screen.getByRole('button', { name: '완료' }))

      expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument()
    })
  })
})

// ─── Calendar ───────────────────────────────────────────────────────────────

describe('Calendar', () => {
  describe('렌더링', () => {
    it('정상 렌더링된다', () => {
      render(<Calendar />)
      expect(document.querySelector('[data-slot="calendar"]')).toBeInTheDocument()
    })

    it('onConfirm 미전달 시 완료 버튼이 없다', () => {
      render(<Calendar />)
      expect(screen.queryByRole('button', { name: '완료' })).not.toBeInTheDocument()
    })

    it('onConfirm 전달 시 완료 버튼이 표시된다', () => {
      render(<Calendar onConfirm={() => {}} />)
      expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument()
    })

    it('confirmDisabled=true 시 완료 버튼이 비활성화된다', () => {
      render(<Calendar onConfirm={() => {}} confirmDisabled />)
      expect(screen.getByRole('button', { name: '완료' })).toBeDisabled()
    })

    it('confirmDisabled=false 시 완료 버튼이 활성화된다', () => {
      render(<Calendar onConfirm={() => {}} confirmDisabled={false} />)
      expect(screen.getByRole('button', { name: '완료' })).toBeEnabled()
    })
  })

  describe('상호작용', () => {
    it('완료 버튼 클릭 시 onConfirm이 호출된다', async () => {
      const handleConfirm = vi.fn()
      render(<Calendar onConfirm={handleConfirm} />)
      await userEvent.click(screen.getByRole('button', { name: '완료' }))
      expect(handleConfirm).toHaveBeenCalledTimes(1)
    })
  })
})
