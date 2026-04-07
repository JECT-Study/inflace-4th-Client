import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select'

const ITEMS = ['최신순', '조회수순', '좋아요순', 'VPH순', 'Outlier순']

const meta: Meta = {
  title: 'Shared/Select',
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['none', 'left', 'right', 'all'],
      description: '트리거 아이콘 위치',
    },
    position: {
      control: 'select',
      options: ['popper', 'item-aligned'],
      description: '드롭다운 위치 방식',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '드롭다운 정렬',
    },
  },
}

export default meta

type Story = StoryObj<{
  icon: 'none' | 'left' | 'right' | 'all'
  position: 'popper' | 'item-aligned'
  align: 'start' | 'center' | 'end'
}>

export const Default: Story = {
  args: {
    icon: 'right',
    position: 'popper',
    align: 'start',
  },
  render: ({ icon, position, align }) => (
    <div className='p-6'>
      <Select>
        <SelectTrigger icon={icon}>
          <SelectValue placeholder='최신순' />
        </SelectTrigger>
        <SelectContent position={position} align={align}>
          <SelectGroup>
            {ITEMS.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}
