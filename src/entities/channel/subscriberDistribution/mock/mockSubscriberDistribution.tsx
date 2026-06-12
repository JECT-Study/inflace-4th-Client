import type {
  SubscriberDistributionsResponseDto,
  SubscriberRatioDto,
} from '../model/types'

export const mockSubscriberDistribution: SubscriberDistributionsResponseDto = {
  gender: [
    { label: '남성', percentage: 74.6 },
    { label: '여성', percentage: 25.4 },
  ],
  age: [
    { label: '13-17', percentage: 6.5 },
    { label: '18-24', percentage: 46.8 },
    { label: '25-34', percentage: 31.6 },
    { label: '35-44', percentage: 10.4 },
    { label: '45', percentage: 4.7 },
  ],
  country: [
    { label: '대한민국', percentage: 91.4 },
    { label: '일본', percentage: 3.2 },
    { label: '미국', percentage: 2.4 },
    { label: '베트남', percentage: 1.8 },
    { label: '기타', percentage: 1.2 },
  ],
}

export const mockSubscriber: SubscriberRatioDto = {
  count: 729,
  ratio: 56.8,
}
