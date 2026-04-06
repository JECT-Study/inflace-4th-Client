import { OptionItem } from './types'

import Icon01 from '../assets/features-icon01.png'
import Icon02 from '../assets/features-icon02.png'
import Icon03 from '../assets/features-icon03.png'
import Icon04 from '../assets/features-icon04.png'
import Icon05 from '../assets/features-icon05.png'
import Icon06 from '../assets/features-icon06.png'
import Icon07 from '../assets/features-icon07.png'

export const CHANNEL_ANALYSIS_VALUE = 'CHANNEL_ANALYSIS'

export const OPTION_ITEM: OptionItem[] = [
  {
    value: CHANNEL_ANALYSIS_VALUE,
    imgSrc: Icon01,
    label: '내 채널 관리 & 분석',
  },
  {
    value: 'INFLUENCER_SEARCH',
    imgSrc: Icon02,
    label: '인플루언서 탐색 & 비교',
  },

  {
    value: 'YOUTUBE_CONTENT_SEARCH',
    imgSrc: Icon03,
    label: '유튜브 콘텐츠 탐색 & 비교',
  },
  {
    value: 'FAKE_SUBSCRIBER_DETECT',
    imgSrc: Icon04,
    label: '가짜 구독자 탐지',
  },
  {
    value: 'COMPETITOR_BENCHMARK',
    imgSrc: Icon05,
    label: '경쟁사 벤치마크',
  },
  {
    value: 'COLLAB_PROPOSAL',
    imgSrc: Icon06,
    label: '협업 제안 관리',
  },
  {
    value: 'INSIGHT_MAGAZINE ',
    imgSrc: Icon07,
    label: '인사이트 매거진',
  },
]
