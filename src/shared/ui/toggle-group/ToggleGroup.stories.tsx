import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'
import ImgUrl from '@/features/onboarding/assets/features-icon01.png'

const PLACEHOLDER_IMG = ImgUrl

const meta: Meta<typeof ToggleGroup> = {
  title: 'Shared/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: '단일 선택 / 다중 선택',
    },
    size: {
      control: 'select',
      options: ['lg', 'fit'],
      description: '아이템 크기',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '배치 방향',
    },
    spacing: {
      control: 'number',
      description: '아이템 간격 (CSS spacing 변수 번호)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 인터랙티브 단일
export const Default: Story = {
  args: {
    type: 'single',
    size: 'lg',

    orientation: 'horizontal',
    spacing: 2,
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value='item1'>아이템 1</ToggleGroupItem>
      <ToggleGroupItem value='item2'>아이템 2</ToggleGroupItem>
      <ToggleGroupItem value='item3'>아이템 3</ToggleGroupItem>
    </ToggleGroup>
  ),
}

// size 별 비교
export const SizeOverview: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-6'>
      {(['lg', 'fit'] as const).map((size) => (
        <div key={size}>
          <p className='mb-3 text-sm text-gray-400'>size: {size}</p>
          <ToggleGroup type='single' size={size}>
            <ToggleGroupItem value='a'>옵션 A</ToggleGroupItem>
            <ToggleGroupItem value='b'>옵션 B</ToggleGroupItem>
            <ToggleGroupItem value='c'>옵션 C</ToggleGroupItem>
          </ToggleGroup>
        </div>
      ))}
    </div>
  ),
}

// 아이콘 (Image) — iconPosition: left
export const WithIconLeft: Story = {
  render: () => (
    <ToggleGroup type='single' size='fit'>
      <ToggleGroupItem
        value='item1'
        imgSrc={PLACEHOLDER_IMG}
        imgAlt='아이콘 1'
        iconPosition='left'>
        아이템 1
      </ToggleGroupItem>
      <ToggleGroupItem
        value='item2'
        imgSrc={PLACEHOLDER_IMG}
        imgAlt='아이콘 2'
        iconPosition='left'>
        아이템 2
      </ToggleGroupItem>
      <ToggleGroupItem
        value='item3'
        imgSrc={PLACEHOLDER_IMG}
        imgAlt='아이콘 3'
        iconPosition='left'>
        아이템 3
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

// 아이콘 (Image) — iconPosition: top
export const WithIconTop: Story = {
  render: () => (
    <ToggleGroup type='single' size='lg'>
      <ToggleGroupItem
        value='item1'
        imgSrc={PLACEHOLDER_IMG}
        imgAlt='아이콘 1'
        iconPosition='top'>
        아이템 1
      </ToggleGroupItem>
      <ToggleGroupItem
        value='item2'
        imgSrc={PLACEHOLDER_IMG}
        imgAlt='아이콘 2'
        iconPosition='top'>
        아이템 2
      </ToggleGroupItem>
      <ToggleGroupItem
        value='item3'
        imgSrc={PLACEHOLDER_IMG}
        imgAlt='아이콘 3'
        iconPosition='top'>
        아이템 3
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

// 다중 선택
export const Multiple: Story = {
  render: () => (
    <ToggleGroup type='multiple' size='lg'>
      <ToggleGroupItem value='item1'>아이템 1</ToggleGroupItem>
      <ToggleGroupItem value='item2'>아이템 2</ToggleGroupItem>
      <ToggleGroupItem value='item3'>아이템 3</ToggleGroupItem>
    </ToggleGroup>
  ),
}

// 수직 방향
export const Vertical: Story = {
  render: () => (
    <ToggleGroup type='single' orientation='vertical' size='lg'>
      <ToggleGroupItem value='item1'>아이템 1</ToggleGroupItem>
      <ToggleGroupItem value='item2'>아이템 2</ToggleGroupItem>
      <ToggleGroupItem value='item3'>아이템 3</ToggleGroupItem>
    </ToggleGroup>
  ),
}

// disabled
export const Disabled: Story = {
  render: () => (
    <ToggleGroup type='single' size='lg'>
      <ToggleGroupItem value='item1'>활성 아이템</ToggleGroupItem>
      <ToggleGroupItem value='item2' disabled>
        비활성 아이템
      </ToggleGroupItem>
      <ToggleGroupItem value='item3'>활성 아이템</ToggleGroupItem>
    </ToggleGroup>
  ),
}
