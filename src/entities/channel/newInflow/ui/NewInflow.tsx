import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import type { NewInflowResponseDto } from '../model/types'
import Image from 'next/image'
import { formatComma } from '@/shared/lib/format'

interface Props {
  data: NewInflowResponseDto[]
}

export function NewInflow({ data }: Props) {
  return (
    <Table className='w-full table-fixed'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[15.6rem]'>썸네일</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className='w-[12.68%]'>조회수</TableHead>
          <TableHead className='w-[12.68%]'>신규 유입 비율</TableHead>
          <TableHead className='w-[12.68%]'>구독 전환 수</TableHead>
          <TableHead className='w-[12.68%]'>시청 유지율</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.videoId}>
            <TableCell>
              <div className='relative h-[8.8rem] overflow-hidden rounded-4'>
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  fill
                  className='object-cover'
                />
              </div>
            </TableCell>
            <TableCell className='text-left'>{item.title}</TableCell>
            <TableCell>{formatComma(item.viewCount)}</TableCell>
            <TableCell>{item.newSubscriberRatio}%</TableCell>
            <TableCell>
              {formatComma(item.subscriptionConversionCount)}
            </TableCell>
            <TableCell>{item.retentionRate}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
