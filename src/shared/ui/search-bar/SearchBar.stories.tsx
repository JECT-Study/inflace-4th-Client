import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '@base-ui/react/input'
import { cn } from '@/shared/lib/utils'

const IconSearch = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11.1564 2.5C15.8816 2.50002 19.7121 6.33053 19.7121 11.0557C19.7121 13.0578 19.0214 14.8969 17.8693 16.3545L21.3078 19.793C21.6979 20.1835 21.6982 20.8166 21.3078 21.207C20.9174 21.5974 20.2843 21.5972 19.8937 21.207L16.4553 17.7686C14.9977 18.9206 13.1585 19.6113 11.1564 19.6113C6.4313 19.6113 2.60079 15.7808 2.60077 11.0557C2.60077 6.33052 6.43129 2.5 11.1564 2.5ZM11.1564 4.5C7.53586 4.5 4.60077 7.43509 4.60077 11.0557C4.60079 14.6762 7.53587 17.6113 11.1564 17.6113C14.777 17.6113 17.7121 14.6762 17.7121 11.0557C17.7121 7.4351 14.777 4.50002 11.1564 4.5Z'
      fill='currentColor'
    />
  </svg>
)

const IconX = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M19.2927 3.29192C19.6832 2.90139 20.3162 2.90139 20.7067 3.29192C21.0972 3.68245 21.0972 4.31548 20.7067 4.70598L13.4138 11.999L20.7067 19.2919C21.0972 19.6825 21.0972 20.3155 20.7067 20.706C20.3162 21.0965 19.6832 21.0965 19.2927 20.706L11.9997 13.413L4.70671 20.706C4.31622 21.0965 3.68318 21.0965 3.29265 20.706C2.90212 20.3155 2.90212 19.6825 3.29265 19.2919L10.5856 11.999L3.29265 4.70598C2.90212 4.31546 2.90212 3.68244 3.29265 3.29192C3.68318 2.90139 4.31619 2.90139 4.70671 3.29192L11.9997 10.5849L19.2927 3.29192Z'
      fill='currentColor'
    />
  </svg>
)

type SearchBarProps = {
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  className?: string
}

function SearchBarPreview({ placeholder, defaultValue, disabled, className }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(defaultValue ?? '')

  return (
    <div className='border-transparen flex h-fit w-140 items-center gap-16 rounded-16 border bg-background-gray-stronger px-16 py-12 has-[input:focus]:border has-[input:focus]:border-brand-primary has-[input:focus]:bg-white'>
      <IconSearch />
      <Input
        type='text'
        data-slot='input'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'h-20 w-127 text-noto-body-xs-normal text-text-and-icon-secondary transition-colors outline-none focus:text-text-and-icon-primary',
          className
        )}
      />
      {inputValue && (
        <button type='button' onClick={() => setInputValue('')}>
          <IconX />
        </button>
      )}
    </div>
  )
}

const meta: Meta<typeof SearchBarPreview> = {
  title: 'Shared/SearchBar',
  component: SearchBarPreview,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: '인플루언서 검색',
    placeholder: '검색어를 입력하세요',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    disabled: true,
  },
}
