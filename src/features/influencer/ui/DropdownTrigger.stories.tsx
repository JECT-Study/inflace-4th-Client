import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DropdownTrigger } from './DropdownTrigger'

const DEFAULT_VALUE = '전체'
const UPLOAD_PERIOD_OPTIONS = ['전체', '1주일 미만', '2주일 미만', '한달 미만']

function UploadPeriodOptions({
  onSelect,
}: {
  onSelect: (option: string) => void
}) {
  return (
    <div className='flex w-[16rem] flex-col gap-4 rounded-10 bg-white p-8 shadow-md'>
      {UPLOAD_PERIOD_OPTIONS.map((option) => (
        <button
          key={option}
          type='button'
          className='cursor-pointer rounded-6 p-8 text-left text-noto-label-sm-normal text-text-and-icon-secondary hover:bg-background-gray-default'
          onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  )
}

/** 실제 사용처(InfluencerFilter)처럼 선택값 상태를 연결한 데모.
 * 기본값과 다른 값을 선택하면 brand-secondary 배경 + X 버튼으로 전환되고,
 * X 클릭 시 기본값으로 초기화된다. */
function FilterChipDemo({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue)

  return (
    <DropdownTrigger
      label='업로드 주기'
      output={value}
      isModified={value !== DEFAULT_VALUE}
      onReset={() => setValue(DEFAULT_VALUE)}>
      {(onClose) => (
        <UploadPeriodOptions
          onSelect={(option) => {
            setValue(option)
            onClose()
          }}
        />
      )}
    </DropdownTrigger>
  )
}

const meta = {
  title: 'Features/Influencer/DropdownTrigger',
  component: DropdownTrigger,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: '필터링 기준 라벨' },
    output: { control: 'text', description: '현재 선택된 값' },
    isModified: {
      control: 'boolean',
      description:
        '기본값과 다른 값이 선택된 상태 — brand-secondary 배경 + X(초기화) 버튼 노출',
    },
    onReset: {
      action: 'reset',
      description: 'X 클릭 시 기본값 초기화 핸들러',
    },
    children: {
      control: false,
      description: '드롭다운 콘텐츠 (onClose를 받는 render prop)',
    },
  },
  decorators: [
    (Story) => (
      <div className='min-h-[24rem] bg-background-gray-default p-24'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownTrigger>

export default meta
type Story = StoryObj<typeof meta>

/** 기본값 상태 — 드롭다운을 열어도 색상/아이콘은 바뀌지 않고,
 * 기본값('전체')과 다른 옵션을 선택하면 배경 + X로 전환됨 */
export const Default: Story = {
  args: {
    label: '업로드 주기',
    output: DEFAULT_VALUE,
  },
  render: () => <FilterChipDemo initialValue={DEFAULT_VALUE} />,
}

/** 기본값과 다른 값이 선택된 상태 — X 클릭 시 기본값('전체')으로 초기화 */
export const Modified: Story = {
  args: {
    label: '업로드 주기',
    output: '1주일 미만',
    isModified: true,
  },
  render: () => <FilterChipDemo initialValue='1주일 미만' />,
}

/** 드롭다운 없는 필터(ex. 언어) — 클릭해도 열리지 않음 */
export const WithoutDropdown: Story = {
  args: {
    label: '언어',
    output: '한국어',
  },
}
