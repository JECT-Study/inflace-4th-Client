import {
  InfluencerDetailResponseDto,
  InfluencerSummaryResponseDto,
} from '../model/types'
import mockChannelBanner from '@/shared/assets/mock/mockBannerImage.png'
import mockChannelProfile from '@/shared/assets/mock/mockProfileImage.png'

export const mockInfluencerDetail: InfluencerDetailResponseDto = {
  channelId: 226,
  channelName: '뷰티크리에이터 민지',
  bannerImageUrl: mockChannelBanner.src,
  profileImageUrl: mockChannelProfile.src,
  channelHandle: '@minji_beauty',
  joinedAt: '2020.03.15',
  subscriberCount: 285000,
  categories: ['반려동물/동물', '자동차'],
  audience: {
    score: 35.3,
    engagementRate: 0.83,
    likeRate: 0.82,
    commentRate: 0.01,
    viewsPerSubscriberRate: 5109.43,
  },
  content: {
    score: 51.82,
    viral2xRate: 12.0,
    viral5xRate: 8.0,
    medianVph: 476.31,
    growthTrendRate: -26.57,
  },
  activity: {
    score: 79.18,
    recentUpload: 15,
    uploadCycle: 17.02,
    frequencyTrend: 'INCREASING',
  },
  advertisement: {
    score: 27.66,
    viewCoefficientOfVariation: 2.17,
    subscriberHealthRate: 5109.43,
  },
  formatAnalysis: {
    longForm: {
      count: 312,
      averageViews30d: 436465.57,
      engagementRate: 0.0,
    },
    shortForm: {
      count: 170,
      averageViews30d: 436465.57,
      engagementRate: 0.68,
    },
  },
}

export const mockInfluencerSummary: InfluencerSummaryResponseDto = {
  summary:
    "채널 '봐쓩'은 11,000명의 구독자를 보유하고 있으며, 팬층 점수와 참여율이 낮은 편으로, 구독자 대비 조회수는 높은 수준을 유지하고 있습니다. 콘텐츠는 주로 숏폼 중심이며, 평균 조회수는 약 43만 회로 바이럴 비율은 12%로 나타나고 있습니다. 최근 15일 전에 업로드가 있었고, 업로드 빈도는 증가 추세입니다. 광고 점수는 낮아 광고 수익화에 대한 적합성은 제한적일 것으로 보입니다.",
}
