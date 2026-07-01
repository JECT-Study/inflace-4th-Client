import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { IMPACT_ITEM } from '../model/impactMetricsItem'

export function ImpactMetricsList() {
  return (
    <div className='flex w-[28.8rem] flex-col gap-16'>
      <div className='flex flex-col items-center gap-6'>
        <p className='text-noto-title-sm-normal text-text-and-icon-primary'>
          뱃지 등급 기준표
        </p>
        <span className='text-noto-caption-sm-bold text-text-and-icon-disabled'>
          * 인플레이스만의 채널 분석 알고리즘을 바탕으로 산출된 결과입니다
        </span>
      </div>
      <Table className='w-full table-fixed'>
        <TableHeader>
          <TableRow>
            <TableHead>뱃지</TableHead>
            <TableHead>점수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {IMPACT_ITEM.map((item) => (
            <TableRow key={item.badge}>
              <TableCell>{item.badge}</TableCell>
              <TableCell>{item.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
