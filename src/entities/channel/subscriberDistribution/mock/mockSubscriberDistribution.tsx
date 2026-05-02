import type {
  SubscriberDistributionsResponseDto,
  SubscriberRatioDto,
} from '../model/types'

export const mockSubscriberDistribution: SubscriberDistributionsResponseDto = {
  gender: [
    { label: '남성', percentage: 62.4 },
    { label: '여성', percentage: 37.6 },
  ],
  age: [
    { label: '13-17', percentage: 70 },
    { label: '18-24', percentage: 20.1 },
    { label: '25-34', percentage: 7.9 },
    { label: '35-44', percentage: 2.5 },
    { label: '45-54', percentage: 1.2 },
    { label: '55-64', percentage: 1.2 },
    { label: '65+', percentage: 1.2 },
  ],
  country: [
    { label: '대한민국', percentage: 70 },
    { label: '일본', percentage: 20.1 },
    { label: '미국', percentage: 7.9 },
    { label: '남아프리카 공화국', percentage: 2.5 },
    { label: '중앙 아프리카 공화국', percentage: 1.2 },
  ],
}

export const mockSubscriber: SubscriberRatioDto = {
  count: 1240,
  ratio: 62.5,
}
