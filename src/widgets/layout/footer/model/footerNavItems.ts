interface FooterNavItem {
  title: string
  url: string
}

interface FooterNavGroup {
  group: string
  items: FooterNavItem[]
}

export const FOOTER_NAV_ITEMS: FooterNavGroup[] = [
  {
    group: '내 채널 관리',
    items: [
      { title: '대시보드 홈', url: '' },
      { title: '영상 성과 분석', url: '' },
    ],
  },
  {
    group: '인플루언서 찾기',
    items: [{ title: '통합검색', url: '' }],
  },
  {
    group: '커뮤니케이션',
    items: [
      { title: '협업 제안 이력', url: '' },
      { title: '메세지 수신함', url: '' },
    ],
  },
  {
    group: '비즈니스 전략',
    items: [
      { title: '경쟁사 벤치마크', url: '' },
      { title: '트렌드 분석', url: '' },
    ],
  },
  {
    group: '지원',
    items: [{ title: '고객센터', url: '' }],
  },
]
