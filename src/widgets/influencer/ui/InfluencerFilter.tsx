import { useState } from 'react'

import { SearchBar } from '@/shared/ui/search-bar'
import { Button } from '@/shared/ui/button'
import IconHeart from '@/shared/assets/heart-bold.svg?react'
import {
  DropdownTrigger,
  CategoryNamesDropdown,
  SubscriberDropdown,
  UploadPeriodDropdown,
  OutlierRangeDropdown,
  HasAdHistoryDropdown,
  EngagementRateDropdown,
  type SubscriberQuery,
  type EngagementRateQuery,
} from '@/features/influencer'
import type { YoutubeCategory } from '@/entities/youtubeCategory'

type CategoryFilterState = {
  output: string
  categoryIds: number[]
}

type SubscriberFilterState = {
  output: string
  query: SubscriberQuery
}

type UploadPeriodFilterState = {
  output: string
  values: string[]
}

type SimpleFilterState = {
  output: string
  value: string
}

type EngagementRateFilterState = {
  output: string
  query: EngagementRateQuery | null
}

type InfluencerFilterProps = {
  categories: YoutubeCategory[]
}

export function InfluencerFilter({ categories }: InfluencerFilterProps) {
  const [category, setCategory] = useState<CategoryFilterState>({
    output: '전체',
    categoryIds: [],
  })
  const [subscriber, setSubscriber] = useState<SubscriberFilterState>({
    output: '전체',
    query: { from: '', to: '' },
  })
  const [uploadPeriod, setUploadPeriod] = useState<UploadPeriodFilterState>({
    output: '전체',
    values: [],
  })
  const [hasAdHistory, setHasAdHistory] = useState<SimpleFilterState>({
    output: '있음',
    value: 'true',
  })
  const [engagementRate, setEngagementRate] = useState<EngagementRateFilterState>({
    output: '전체',
    query: null,
  })
  const [outlierRange, setOutlierRange] = useState<SimpleFilterState>({
    output: '전체',
    value: '',
  })
  const [language] = useState<SimpleFilterState>({
    output: '한국어',
    value: 'ko',
  })

  return (
    <div className='flex h-fit w-full items-center gap-24 bg-background-gray-default p-24'>
      {/* 검색바 */}
      <SearchBar placeholder='채널명 또는 키워드 검색' />

      {/* 필터 */}
      <div className='flex h-fit w-full flex-1 items-center gap-12'>
        <DropdownTrigger label='카테고리' output={category.output}>
          {(onClose) => (
            <CategoryNamesDropdown
              categories={categories}
              defaultValue={category.categoryIds}
              onChange={(output, categoryIds) => {
                setCategory({ output, categoryIds })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>

        <DropdownTrigger label='구독자 수' output={subscriber.output}>
          {(onClose) => (
            <SubscriberDropdown
              defaultFrom={subscriber.query.from}
              defaultTo={subscriber.query.to}
              onChange={(output, query) => {
                setSubscriber({ output, query })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>

        <DropdownTrigger label='업로드 주기' output={uploadPeriod.output}>
          {(onClose) => (
            <UploadPeriodDropdown
              defaultValue={uploadPeriod.values}
              onChange={(output, outputQuery) => {
                setUploadPeriod({ output, values: outputQuery ? outputQuery.split(',') : [] })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>

        <DropdownTrigger label='광고 이력' output={hasAdHistory.output}>
          {(onClose) => (
            <HasAdHistoryDropdown
              defaultValue={hasAdHistory.value}
              onChange={(output, value) => {
                setHasAdHistory({ output, value })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>

        <DropdownTrigger label='참여율' output={engagementRate.output}>
          {(onClose) => {
            const q = engagementRate.query
            const defaultSelectedOptions =
              q && 'selectedOptions' in q ? q.selectedOptions : []
            const defaultFrom = q && 'from' in q ? q.from : ''
            const defaultTo = q && 'to' in q ? q.to : ''

            return (
              <EngagementRateDropdown
                defaultSelectedOptions={defaultSelectedOptions}
                defaultFrom={defaultFrom}
                defaultTo={defaultTo}
                onChange={(output, query) => {
                  setEngagementRate({ output, query })
                  onClose()
                }}
              />
            )
          }}
        </DropdownTrigger>

        <DropdownTrigger label='Outlier 배수' output={outlierRange.output}>
          {(onClose) => (
            <OutlierRangeDropdown
              defaultValue={outlierRange.value}
              onChange={(output, value) => {
                setOutlierRange({ output, value })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>

        {/* TODO: 기획단에서 언어와 관련된 필터값 논의중 */}
        <DropdownTrigger label='언어' output={language.output} />
      </div>

      {/* 보관함 버튼 */}
      <Button
        color='primary'
        variant='outlined'
        size='sm'
        rightIcon={<IconHeart />}>
        보관함
      </Button>
    </div>
  )
}
