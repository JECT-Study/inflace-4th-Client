import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { AuthInitializer } from './AuthInitializer'

const mockUseAuthInit = vi.fn()

vi.mock('../model/useAuthInit', () => ({
  useAuthInit: () => mockUseAuthInit(),
}))

describe('AuthInitializer', () => {
  it('마운트 시 useAuthInit을 호출한다', () => {
    render(<AuthInitializer />)
    expect(mockUseAuthInit).toHaveBeenCalledTimes(1)
  })

  it('UI를 렌더링하지 않는다 (null 반환)', () => {
    const { container } = render(<AuthInitializer />)
    expect(container.innerHTML).toBe('')
  })
})
