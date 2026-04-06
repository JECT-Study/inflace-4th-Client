import { OptionItem } from './types'

import Icon01 from '../assets/role-icon01.png'
import Icon02 from '../assets/role-icon02.png'
import Icon03 from '../assets/role-icon03.png'
import Icon04 from '../assets/role-icon04.png'
import Icon05 from '../assets/role-icon05.png'
import Icon06 from '../assets/role-icon06.png'

export const OPTION_ITEM: OptionItem[] = [
  {
    value: 'YOUTUBER',
    imgSrc: Icon01,
    label: '유튜버',
  },
  {
    value: 'MARKETER',
    imgSrc: Icon02,
    label: '마케터',
  },

  {
    value: 'BRAND_MANAGER',
    imgSrc: Icon03,
    label: '브랜드 담당자',
  },
  {
    value: 'MCN_AGENCY',
    imgSrc: Icon04,
    label: 'MCN / 에이전시',
  },
  {
    value: 'CONTENT_PLANNER',
    imgSrc: Icon05,
    label: '콘텐츠기획자',
  },
  {
    value: 'ETC',
    imgSrc: Icon06,
    label: '기타',
  },
]
