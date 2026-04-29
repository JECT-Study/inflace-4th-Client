import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

describe('Table', () => {
  it('table 컨테이너와 table 요소를 렌더링한다', () => {
    const { container } = render(<Table />)
    expect(
      container.querySelector('[data-slot="table-container"]')
    ).toBeTruthy()
    expect(container.querySelector('[data-slot="table"]')).toBeTruthy()
  })

  it('className이 table 요소에 적용된다', () => {
    const { container } = render(<Table className='custom-class' />)
    expect(container.querySelector('table')).toHaveClass('custom-class')
  })
})

describe('TableHeader', () => {
  it('thead를 렌더링한다', () => {
    const { container } = render(
      <table>
        <TableHeader />
      </table>
    )
    expect(container.querySelector('[data-slot="table-header"]')).toBeTruthy()
  })
})

describe('TableBody', () => {
  it('tbody를 렌더링한다', () => {
    const { container } = render(
      <table>
        <TableBody />
      </table>
    )
    expect(container.querySelector('[data-slot="table-body"]')).toBeTruthy()
  })
})

describe('TableRow', () => {
  it('tr를 렌더링한다', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow />
        </tbody>
      </table>
    )
    expect(container.querySelector('[data-slot="table-row"]')).toBeTruthy()
  })
})

describe('TableHead', () => {
  it('th를 렌더링하고 텍스트가 표시된다', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead>헤더</TableHead>
          </tr>
        </thead>
      </table>
    )
    expect(screen.getByText('헤더')).toBeTruthy()
  })
})

describe('TableCell', () => {
  it('td를 렌더링하고 텍스트가 표시된다', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>셀 내용</TableCell>
          </tr>
        </tbody>
      </table>
    )
    expect(screen.getByText('셀 내용')).toBeTruthy()
  })
})
