import {
  getImpactTier,
  IMPACT_ITEM,
  ImpactMetricsCard,
  ImpactMetricsBarChart,
  ImpactMetricsPieChart,
} from '@/entities/influencerDetail/impactMetrics'
import {
  AdvertisementFilterResponseDto,
  VIDEO_FORMAT_LABEL,
} from '@/features/influencerDetail'
import { format10Thousands } from '@/shared/lib/format'
import IconOutlier from '@/shared/assets/outlier-bold.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'

export function AdvertisementMetricsSection({
  data,
  isLoading,
}: {
  data?: AdvertisementFilterResponseDto
  isLoading?: boolean
}) {
  if (isLoading) {
    return (
      <div className='flex flex-col gap-32 rounded-12 bg-white p-24 pb-32'>
        <div className='flex h-fit w-fit items-center gap-12'>
          <span className='bg-background-brand-default rounded-12 p-4'>
            <IconOutlier className='size-24 text-btn-primary-text-disabled' />
          </span>
          <p className='text-ibm-title-md-normal text-text-and-icon-default'>
            임팩트 지표
          </p>
          <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
            검색 기간 내 결과
          </span>
        </div>
        <div className='flex h-fit w-full gap-32'>
          <Skeleton className='h-[27.3rem] flex-1' />
          <Skeleton className='h-[27.3rem] flex-1' />
          <Skeleton className='h-[27.3rem] flex-1' />
          <Skeleton className='h-[27.3rem] flex-1' />
        </div>
      </div>
    )
  }

  if (!data) return null
  const { adScore } = data
  return (
    <div className='flex flex-col gap-32 rounded-12 bg-white p-24 pb-32'>
      {/* 아이콘 + 타이틀 */}
      <div className='flex h-fit w-fit items-center gap-12'>
        <span className='bg-background-brand-default rounded-12 p-4'>
          <IconOutlier className='size-24 text-btn-primary-text-disabled' />
        </span>
        <p className='text-ibm-title-md-normal text-text-and-icon-default'>
          임팩트 지표
        </p>
        <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
          검색 기간 내 결과
        </span>
      </div>

      {/* 광고 뱃지 카드 */}
      <div className='flex h-fit w-full gap-32'>
        <ImpactMetricsCard
          title='광고 뱃지'
          badge={IMPACT_ITEM[getImpactTier(adScore?.score ?? 0)].ad}
          mainMetric={{
            label: '협찬 비율',
            value: adScore?.score ?? 0,
            unit: '점',
          }}
          subMetrics={[
            {
              label: '조회수 안정성',
              state: adScore?.viewStability ?? '',
              value: adScore?.viewStabilityCv ?? 0,
            },
            {
              label: '구독 건강도',
              state: adScore?.subscriptionHealth ?? '',
              value: adScore?.subscriptionHealthRate ?? 0,
              unit: '%',
            },
            {
              label: '협찬 경험도',
              state: adScore?.collaborationExperience ?? '',
              value: adScore?.collaborationRate ?? 0,
              unit: '%',
            },
          ]}
          variant='advertisement'
        />

        {/* 롱폼 vs 숏폼 광고 참여율 분석 카드 */}
        <ImpactMetricsCard
          title='롱폼 vs 숏폼 광고 참여율 분석'
          chart={
            <div className='flex w-full flex-col gap-28'>
              <ImpactMetricsBarChart
                title='평균 조회수'
                formatValue={format10Thousands}
                data={data.avgViewsByContentType.map((item) => ({
                  label: VIDEO_FORMAT_LABEL[item.format],
                  percentage: item.avgViewCount,
                  fill: item.format === 'LONG_FORM' ? '#5A44F2' : '#E4DFFF',
                }))}
              />
              <ImpactMetricsBarChart
                title='참여율'
                unit='%'
                data={data.avgViewsByContentType.map((item) => ({
                  label: VIDEO_FORMAT_LABEL[item.format],
                  percentage: item.avgEngagementRate,
                  fill: item.format === 'LONG_FORM' ? '#5A44F2' : '#E4DFFF',
                }))}
              />
            </div>
          }
        />

        {/* 카테고리 비중 (개수) 카드 */}
        <ImpactMetricsCard
          title='카테고리 비중 (개수)'
          chart={
            <div className='flex w-full flex-col gap-28'>
              <ImpactMetricsPieChart
                data={data.categoryDistribution.map((item, idx) => ({
                  label: item.category,
                  percentage: item.percentage,
                  unit: '개',
                  count: item.count,
                  fill: idx === 0 ? '#5A44F2' : '#E4DFFF',
                }))}
              />
            </div>
          }
        />

        {/* 콘텐츠 비중 (개수) 카드 */}
        <ImpactMetricsCard
          title='콘텐츠 비중 (개수)'
          chart={
            <div className='flex w-full flex-col gap-28'>
              <ImpactMetricsPieChart
                data={data.contentTypeDistribution.map((item) => ({
                  label: VIDEO_FORMAT_LABEL[item.format],
                  percentage: item.percentage,
                  count: item.count,
                  fill: item.format === 'LONG_FORM' ? '#5A44F2' : '#E4DFFF',
                }))}
              />
            </div>
          }
        />
      </div>
    </div>
  )
}
