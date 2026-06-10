import { FeatureCardItem } from './types'
import featureCardImg01 from '@/entities/home/featureCard/assets/featureCard01.jpg'
import featureCardImg02 from '@/entities/home/featureCard/assets/featureCard02.jpg'
import featureCardImg03 from '@/entities/home/featureCard/assets/featureCard03.jpg'
import featureCardImg04 from '@/entities/home/featureCard/assets/featureCard04.jpg'
import featureCardImg05 from '@/entities/home/featureCard/assets/featureCard05.jpg'
import featureCardImg06 from '@/entities/home/featureCard/assets/featureCard06.jpg'

import IconDashboard from '@/shared/assets/dashboard-bold.svg'
import IconVideo from '@/shared/assets/video-bold.svg'
import IconSearch from '@/shared/assets/search-bold.svg'
import IconChart from '@/shared/assets/chart-bold.svg'
import IconRising from '@/shared/assets/rising-bold.svg'
import IconLightbulb from '@/shared/assets/lightbulb-ai-bold.svg'

export const FEATURE_CARD_ITEM: FeatureCardItem[] = [
  {
    icon: IconDashboard,
    title: '내 채널 분석',
    description:
      '구독자 추이, 참여율, 시청자 분포를 한눈에 분석하고 카테고리 평균 대비 내 채널의 위치를 데이터로 확인하세요',
    imgSrc: featureCardImg01,
  },
  {
    icon: IconVideo,
    title: '영상 성과 분석',
    description:
      '내 유튜브 채널의 영상별 조회수, 참여율, VPH, Outlier 지수를 분석해 성과 높은 콘텐츠 패턴을 발견하세요',
    imgSrc: featureCardImg02,
  },
  {
    icon: IconSearch,
    title: '인플루언서 검색',
    description:
      '상세 필터링으로 캠페인에 딱 맞는 인플루언서를 빠르게 찾아보세요. 팬층·콘텐츠·활동·광고, 4종 임팩트 지표로 검증까지 한번에',
    imgSrc: featureCardImg03,
  },
  {
    icon: IconChart,
    title: '경쟁 채널 분석',
    description:
      '경쟁 브랜드가 협업한 인플루언서 콘텐츠의 트렌드를 파악하세요. 협찬 광고 이력 분석으로 우리 캠페인 후보군을 전략적으로 확장할 수 있어요',
    imgSrc: featureCardImg04,
  },
  {
    icon: IconRising,
    title: '성장 전략 수집',
    description:
      'AI 기반 성장 인사이트와 경쟁 채널 비교로 내 채널의 방향을 수립하세요',
    imgSrc: featureCardImg05,
  },
  {
    icon: IconLightbulb,
    title: '수익화 전략',
    description:
      '조회수 안정성, 팬 반응, 수익화 전략까지. 채널 성장과 수익화에 필요한 데이터를 지금 확인하세요',
    imgSrc: featureCardImg06,
  },
]
