import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { DropdownTrigger } from './DropdownTrigger'

function getChip() {
  return screen.getByText('업로드 주기:').closest('button')!
    .parentElement as HTMLElement
}

describe('DropdownTrigger', () => {
  it('라벨과 선택값을 표시한다', () => {
    render(<DropdownTrigger label='업로드 주기' output='전체' />)

    expect(screen.getByText('업로드 주기:')).toBeInTheDocument()
    expect(screen.getByText('전체')).toBeInTheDocument()
  })

  it('클릭하면 드롭다운이 열리고 다시 클릭하면 닫힌다', async () => {
    const user = userEvent.setup()
    render(
      <DropdownTrigger label='업로드 주기' output='전체'>
        {() => <div>드롭다운 콘텐츠</div>}
      </DropdownTrigger>
    )

    await user.click(screen.getByText('업로드 주기:'))
    expect(screen.getByText('드롭다운 콘텐츠')).toBeInTheDocument()

    await user.click(screen.getByText('업로드 주기:'))
    expect(screen.queryByText('드롭다운 콘텐츠')).not.toBeInTheDocument()
  })

  it('기본값 상태에서는 드롭다운을 열어도 색상/아이콘이 바뀌지 않는다', async () => {
    const user = userEvent.setup()
    render(
      <DropdownTrigger label='업로드 주기' output='전체'>
        {() => <div>드롭다운 콘텐츠</div>}
      </DropdownTrigger>
    )

    await user.click(screen.getByText('업로드 주기:'))
    expect(screen.getByText('드롭다운 콘텐츠')).toBeInTheDocument()

    expect(getChip()).not.toHaveClass('bg-brand-secondary')
    expect(
      screen.queryByRole('button', { name: '업로드 주기 초기화' })
    ).not.toBeInTheDocument()
  })

  it('기본값과 다른 상태(isModified)면 닫혀 있어도 배경이 바뀌고 X 버튼이 노출된다', () => {
    render(
      <DropdownTrigger label='업로드 주기' output='1주일 미만' isModified />
    )

    expect(getChip()).toHaveClass('bg-brand-secondary')
    expect(
      screen.getByRole('button', { name: '업로드 주기 초기화' })
    ).toBeInTheDocument()
  })

  it('X를 클릭하면 onReset이 호출되고 드롭다운이 닫힌다', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()
    render(
      <DropdownTrigger
        label='업로드 주기'
        output='1주일 미만'
        isModified
        onReset={onReset}>
        {() => <div>드롭다운 콘텐츠</div>}
      </DropdownTrigger>
    )

    await user.click(screen.getByText('업로드 주기:'))
    expect(screen.getByText('드롭다운 콘텐츠')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '업로드 주기 초기화' }))

    expect(onReset).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('드롭다운 콘텐츠')).not.toBeInTheDocument()
  })

  it('바깥 영역을 클릭하면 드롭다운이 닫힌다', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <span>바깥 영역</span>
        <DropdownTrigger label='업로드 주기' output='전체'>
          {() => <div>드롭다운 콘텐츠</div>}
        </DropdownTrigger>
      </div>
    )

    await user.click(screen.getByText('업로드 주기:'))
    expect(screen.getByText('드롭다운 콘텐츠')).toBeInTheDocument()

    await user.click(screen.getByText('바깥 영역'))
    expect(screen.queryByText('드롭다운 콘텐츠')).not.toBeInTheDocument()
  })
})
