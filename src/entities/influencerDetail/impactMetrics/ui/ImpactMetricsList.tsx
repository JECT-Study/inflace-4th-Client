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
    <div className='flex flex-col gap-28 p-24'>
      <p className='text-noto-title-sm-normal text-text-and-icon-primary'>
        뱃지 등급 기준표
      </p>
      <Table className='w-full table-fixed'>
        <TableHeader>
          <TableRow>
            <TableHead>뱃지</TableHead>
            <TableHead>팬층</TableHead>
            <TableHead>콘텐츠</TableHead>
            <TableHead>활동</TableHead>
            <TableHead>광고</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {IMPACT_ITEM.map((item) => (
            <TableRow key={item.activity}>
              <TableCell>{item.badge}</TableCell>
              <TableCell>{item.fanbase}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>{item.activity}</TableCell>
              <TableCell>{item.ad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
