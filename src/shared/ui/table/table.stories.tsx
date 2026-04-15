import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Image from 'next/image'
import { useState } from 'react'
import React from 'react'
import mockImage from './assets/mock/mock-image.png'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import { Button } from '../button'
import { mockTrendingVideos } from '@/features/channelDashboard/trendingVideos/mock/mockTrendingVideos'

function SidebarDecorator({
  defaultOpen,
  children,
}: {
  defaultOpen: boolean
  children: (open: boolean) => React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className='flex flex-col gap-4 p-6'>
      {/* 임시 토글 버튼 */}
      <Button
        color='primary'
        size='sm'
        variant='filled'
        onClick={() => setOpen((v) => !v)}>
        사이드바 {open ? '닫기' : '열기'}
      </Button>

      <div data-sidebar-open={open ? 'true' : 'false'}>{children(open)}</div>
    </div>
  )
}

const meta: Meta = {
  title: 'Shared/Table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
1. **셀 크기 고정 (사이드바 무관)**
   - \`<TableHead className='w-39'>\`

2. **사이드바 상태에 따른 가변 크기**
   - \`<TableHead className='in-data-[sidebar-open=false]:w-153.5 in-data-[sidebar-open=true]:w-176'>\`

3. **남은 영역 자동 계산**
   - \`<TableHead>\` (클래스 생략)
          `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='w-391 overflow-x-auto'>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const WithThumbnail: Story = {
  name: '이미지 포함 테이블',

  render: () => (
    <SidebarDecorator defaultOpen={true}>
      {() => (
        <Table className='table-fixed'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-39'>썸네일</TableHead>
              <TableHead className='in-data-[sidebar-open=false]:w-153.5 in-data-[sidebar-open=true]:w-176'>
                제목
              </TableHead>
              <TableHead>조회수</TableHead>
              <TableHead>참여율</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>시청 유지율</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTrendingVideos.map((data) => (
              <TableRow key={data.rank}>
                <TableCell>
                  <div className='relative h-22 overflow-hidden rounded-4'>
                    <Image
                      src={mockImage.src}
                      alt={data.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                </TableCell>
                <TableCell className='text-left text-text-and-icon-primary'>
                  {data.title}
                </TableCell>
                <TableCell>{data.viewCount.toLocaleString()}</TableCell>
                <TableCell>{data.engagementRate}%</TableCell>
                <TableCell>{data.ctr}%</TableCell>
                <TableCell>{data.retentionRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </SidebarDecorator>
  ),
}

export const WithoutThumbnail: Story = {
  name: '이미지 미포함 테이블',

  render: () => (
    <SidebarDecorator defaultOpen={true}>
      {() => (
        <Table className='table-fixed'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-40'>순위</TableHead>
              <TableHead className='in-data-[sidebar-open=false]:w-153.5 in-data-[sidebar-open=true]:w-176'>
                제목
              </TableHead>
              <TableHead>조회수</TableHead>
              <TableHead>참여율</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>시청 유지율</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTrendingVideos.map((data) => (
              <TableRow key={data.rank}>
                <TableCell className='text-center'>{data.rank}</TableCell>
                <TableCell className='text-left text-text-and-icon-primary'>
                  {data.title}
                </TableCell>
                <TableCell>{data.viewCount.toLocaleString()}</TableCell>
                <TableCell>{data.engagementRate}%</TableCell>
                <TableCell>{data.ctr}%</TableCell>
                <TableCell>{data.retentionRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </SidebarDecorator>
  ),
}

export const SidebarCollapsed: Story = {
  name: '사이드바 닫힘',

  render: () => (
    <SidebarDecorator defaultOpen={false}>
      {() => (
        <Table className='table-fixed'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-39'>썸네일</TableHead>
              <TableHead className='in-data-[sidebar-open=false]:w-153.5 in-data-[sidebar-open=true]:w-176'>
                제목
              </TableHead>
              <TableHead>조회수</TableHead>
              <TableHead>참여율</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>시청 유지율</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTrendingVideos.map((data) => (
              <TableRow key={data.rank}>
                <TableCell>
                  <div className='relative h-22 overflow-hidden rounded-4'>
                    <Image
                      src={mockImage.src}
                      alt={data.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                </TableCell>
                <TableCell className='text-left text-text-and-icon-primary'>
                  {data.title}
                </TableCell>
                <TableCell>{data.viewCount.toLocaleString()}</TableCell>
                <TableCell>{data.engagementRate}%</TableCell>
                <TableCell>{data.ctr}%</TableCell>
                <TableCell>{data.retentionRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </SidebarDecorator>
  ),
}
