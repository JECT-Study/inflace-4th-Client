'use client'

import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { SearchBar } from '@/shared/ui/search-bar'
import { Button } from '@/shared/ui/button'
import IconHeart from '@/shared/assets/heart-bold.svg?react'
import IconLeftArrow from '@/shared/assets/leftwards-arrow-bold.svg?react'
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
  query: EngagementRateQuery
}

type InfluencerFilterProps = {
  categories: YoutubeCategory[]
}

export function InfluencerFilter({ categories }: InfluencerFilterProps) {
  return (
    <Suspense fallback={<div className='h-full' />}>
      <InfluencerFilterInner categories={categories} />
    </Suspense>
  )
}

function InfluencerFilterInner({ categories }: InfluencerFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
    query: { from: '', to: '' },
  })
  const [outlierRange, setOutlierRange] = useState<SimpleFilterState>({
    output: '전체',
    value: '',
  })
  const [language] = useState<SimpleFilterState>({
    output: '한국어',
    value: 'ko',
  })

  //화면 새로고침 시 필터 초기화
  useEffect(() => {
    router.replace(pathname ?? '/')
  }, [router, pathname])

  // 채널명 검색어 상태 및 포커스 여부
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  // useCallback 내부에서 최신 searchParams를 참조하기 위한 ref
  const searchParamsRef = useRef(searchParams)
  useEffect(() => {
    searchParamsRef.current = searchParams
  }, [searchParams])

  // URL 파라미터 반영 함수들
  const applyChannelNameToUrl = useCallback(
    (channelName: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (channelName) {
        params.set('channelName', channelName)
      } else {
        params.delete('channelName')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  const applyCategoriesToUrl = useCallback(
    (categoryIds: number[]) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      params.delete('categoryIds')
      categoryIds.forEach((id) => params.append('categoryIds', String(id)))
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  const applySubscriberToUrl = useCallback(
    ({ from, to }: SubscriberQuery) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (from) {
        params.set('subscriberFrom', from)
      } else {
        params.delete('subscriberFrom')
      }
      if (to) {
        params.set('subscriberTo', to)
      } else {
        params.delete('subscriberTo')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // uploadPeriod: 쉼표로 구분된 주기 값 목록
  const applyUploadPeriodToUrl = useCallback(
    (values: string[]) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      const outputQuery = values.join(',')
      if (outputQuery) {
        params.set('uploadPeriod', outputQuery)
      } else {
        params.delete('uploadPeriod')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // hasAdHistory: "true" | "false" 불리언 문자열
  const applyHasAdHistoryToUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (value) {
        params.set('hasAdHistory', value)
      } else {
        params.delete('hasAdHistory')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // outlierRange: 선택된 배수 단일 값 (예: "1.5X")
  const applyOutlierRangeToUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (value) {
        params.set('outlierRange', value)
      } else {
        params.delete('outlierRange')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  const applyEngagementRateToUrl = useCallback(
    ({ from, to }: EngagementRateQuery) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (from) {
        params.set('engagementRateFrom', from)
      } else {
        params.delete('engagementRateFrom')
      }
      if (to) {
        params.set('engagementRateTo', to)
      } else {
        params.delete('engagementRateTo')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // 채널명 입력 시 500ms 디바운스 후 URL 반영
  useEffect(() => {
    if (!isFocused) return
    const timer = setTimeout(() => {
      applyChannelNameToUrl(query)
    }, 500)
    return () => clearTimeout(timer)
  }, [query, isFocused, applyChannelNameToUrl])

  const isBookmarkPage = pathname === '/influencer/bookmarked'

  return (
    <div className='flex h-fit w-full flex-col items-center gap-16 bg-background-gray-default p-24'>
      {/** 보관함 페이지 헤더
       * /influencer/bookmarked일 때만 랜더링
       */}
      {isBookmarkPage && (
        <div className='flex h-[6.8rem] w-full gap-16 pt-24 pr-24 pb-16 pl-24'>
          <button
            type='button'
            onClick={() => router.push('/influencer')}
            className='flex size-24 shrink-0 items-center gap-10'>
            <IconLeftArrow className='size-full' />
          </button>
          <span className='size-fit w-full text-ibm-title-lg-normal text-text-and-icon-default'>
            보관함
          </span>
        </div>
      )}

      <div className='flex w-full items-center gap-24'>
        {/* 검색바 */}
        <SearchBar
          placeholder='채널명 또는 키워드 검색'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => {
            setQuery('')
            applyChannelNameToUrl('')
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              applyChannelNameToUrl(query)
              e.currentTarget.blur()
            }
          }}
        />

        {/* 필터 */}
        <div className='flex h-fit w-full flex-1 items-center gap-12'>
          <DropdownTrigger label='카테고리' output={category.output}>
            {(onClose) => (
              <CategoryNamesDropdown
                categories={categories}
                defaultValue={category.categoryIds}
                onChange={(output, categoryIds) => {
                  setCategory({ output, categoryIds })
                  applyCategoriesToUrl(categoryIds)
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
                  applySubscriberToUrl(query)
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
                  const values = outputQuery ? outputQuery.split(',') : []
                  setUploadPeriod({ output, values })
                  applyUploadPeriodToUrl(values)
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
                  applyHasAdHistoryToUrl(value)
                  onClose()
                }}
              />
            )}
          </DropdownTrigger>

          <DropdownTrigger label='참여율' output={engagementRate.output}>
            {(onClose) => (
              <EngagementRateDropdown
                defaultFrom={engagementRate.query.from}
                defaultTo={engagementRate.query.to}
                onChange={(output, query) => {
                  setEngagementRate({ output, query })
                  applyEngagementRateToUrl(query)
                  onClose()
                }}
              />
            )}
          </DropdownTrigger>

          <DropdownTrigger label='Outlier 배수' output={outlierRange.output}>
            {(onClose) => (
              <OutlierRangeDropdown
                defaultValue={outlierRange.value}
                onChange={(output, value) => {
                  setOutlierRange({ output, value })
                  applyOutlierRangeToUrl(value)
                  onClose()
                }}
              />
            )}
          </DropdownTrigger>

          {/* TODO: 기획단에서 언어와 관련된 필터값 논의중 */}
          <DropdownTrigger label='언어' output={language.output} />
        </div>

        {/* 보관함 버튼: /influencer 페이지에서만 노출 */}
        {!isBookmarkPage && (
          <Button
            color='primary'
            variant='outlined'
            size='sm'
            rightIcon={<IconHeart />}
            onClick={() => router.push('/influencer/bookmarked')}>
            보관함
          </Button>
        )}
      </div>
    </div>
  )
}
