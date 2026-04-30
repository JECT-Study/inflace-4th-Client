import ImgMock from '../assets/mock/onboardingMock.jpg'
import { FeatureSlide } from './types'

export const FEATURE_SLIDES: FeatureSlide[] = [
  {
    title: '수천 개 채널 중, 딱 맞는 인플루언서만 골라드려요',
    desc: '카테고리, 구독자 수, 평균 조회수, 오디언스 성별·연령까지 필터링해서 캠페인에 맞는 채널만 골라드려요.',
    image: ImgMock,
  },
  {
    title: '왜 이 영상은 안 터졌을까요?',
    desc: '조회수, 시청 지속률, 클릭률을 한 화면에서 분석해 드려요. 어디서 이탈이 생겼는지 정확하게 짚어줄게요.',
    image: ImgMock,
  },
  {
    title: '우리 브랜드에 어울리는 채널인가요?',
    desc: '협찬 전에 오디언스 적합도와 브랜드 안전성을 먼저 확인하세요. 맞지 않는 채널에 예산을 낭비하지 않아도 돼요.',
    image: ImgMock,
  },
]

export const FEATURE_SLIDES_COUNT = FEATURE_SLIDES.length
