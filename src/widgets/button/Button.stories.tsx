import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './Button'

const LeftIcon = () => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='w-full h-full'>
    <path
      d='M10 12L6 8L10 4'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const RightIcon = () => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='w-full h-full'>
    <path
      d='M6 4L10 8L6 12'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Widgets/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'gray'],
      description: '버튼 색상 테마',
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
      description: '버튼 크기',
    },
    style: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: '버튼 스타일 (gray는 filled만 지원)',
    },
    leftIcon: {
      control: false,
      description: '왼쪽 아이콘 (ReactNode)',
    },
    rightIcon: {
      control: false,
      description: '오른쪽 아이콘 (ReactNode)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 인터랙티브 단일 버튼
export const Default: Story = {
  args: {
    children: '버튼',
    color: 'primary',
    style: 'filled',
    size: 'lg',
  },
}

// 모든 color × style × size 조합
export const Overview: Story = {
  render: () => {
    const sizes = ['lg', 'md', 'sm', 'xs'] as const
    const variants = [
      { color: 'primary', style: 'filled' },
      { color: 'primary', style: 'outlined' },
      { color: 'secondary', style: 'filled' },
      { color: 'secondary', style: 'outlined' },
      { color: 'gray', style: 'filled' },
    ] as const

    return (
      <div className='flex flex-col gap-8 p-6'>
        {variants.map(({ color, style }) => (
          <div key={`${color}-${style}`}>
            <p className='mb-3 text-sm text-gray-400'>
              {color} / {style}
            </p>
            <div className='flex items-center gap-4 flex-wrap'>
              {sizes.map((size) => (
                <Button key={size} color={color} style={style} size={size}>
                  버튼
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

// disabled 상태 전체
export const DisabledStates: Story = {
  render: () => {
    const variants = [
      { color: 'primary', style: 'filled' },
      { color: 'primary', style: 'outlined' },
      { color: 'secondary', style: 'filled' },
      { color: 'secondary', style: 'outlined' },
      { color: 'gray', style: 'filled' },
    ] as const

    return (
      <div className='flex items-center gap-4 flex-wrap p-6'>
        {variants.map(({ color, style }) => (
          <Button
            key={`${color}-${style}`}
            color={color}
            style={style}
            size='lg'
            disabled>
            버튼
          </Button>
        ))}
      </div>
    )
  },
}

// 아이콘 포함 조합
export const WithIcons: Story = {
  render: () => (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center gap-4 flex-wrap'>
        <Button color='primary' style='filled' size='lg' leftIcon={<LeftIcon />}>
          왼쪽 아이콘
        </Button>
        <Button color='primary' style='filled' size='lg' rightIcon={<RightIcon />}>
          오른쪽 아이콘
        </Button>
        <Button
          color='primary'
          style='filled'
          size='lg'
          leftIcon={<LeftIcon />}
          rightIcon={<RightIcon />}>
          양쪽 아이콘
        </Button>
      </div>
      <div className='flex items-center gap-4 flex-wrap'>
        {(['lg', 'md', 'sm', 'xs'] as const).map((size) => (
          <Button
            key={size}
            color='primary'
            style='filled'
            size={size}
            leftIcon={<LeftIcon />}>
            {size}
          </Button>
        ))}
      </div>
    </div>
  ),
}
