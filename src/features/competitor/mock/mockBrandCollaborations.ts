import type { BrandCollaborationDto } from '../model/types'

/* 실제 유튜브 채널 아바타 (로드 확인된 yt3 URL 2종을 채널별로 사용) */
const AVATAR_A =
  'https://yt3.ggpht.com/ytc/AIdro_nE7wjv1m8pTETHjXPVDQ2FrUsU6GtTnBSo3qRb8qaTQcc=s88-c-k-c0x00ffffff-no-rj'
const AVATAR_B =
  'https://yt3.ggpht.com/kf_W-VBTUZ0K2KgXpghjiKSurUZlZ8Uw8j3wyXHcA7gX9EC-jmKAXMPP20EXjjySLmeHoY3-JQ=s88-c-k-c0x00ffffff-no-rj'

/* 채널별 메타 — 같은 채널은 동일 id/아바타 유지 */
const CHANNELS: Record<
  string,
  { channelId: string; channelThumbnailUrl: string }
> = {
  /* IT */
  ITSub잇섭: { channelId: 'UCdUcjkyZtf-1WJyPPiETF1g', channelThumbnailUrl: AVATAR_A },
  '인태크 INTAECH': { channelId: 'UCr6deoUPd2sh7mafAk5xWDQ', channelThumbnailUrl: AVATAR_B },
  '더신자 TheSINZA': { channelId: 'UCMUnjdq-yLc_LkkPsIMTFug', channelThumbnailUrl: AVATAR_A },
  '주연테크 JOOYONTECH': { channelId: 'UCjooyontech', channelThumbnailUrl: AVATAR_B },
  노트기어: { channelId: 'UCnotegear', channelThumbnailUrl: AVATAR_A },
  'underKG 언더케이지': { channelId: 'UC_0oo0GPlDUU88ubLDnJkSQ', channelThumbnailUrl: AVATAR_B },
  '디에디트 THE EDIT': { channelId: 'UCJKZoVf3RIMfFffjdseqdEg', channelThumbnailUrl: AVATAR_A },
  '방구석 리뷰룸': { channelId: 'UCZTjbqrV3s1zIWfEqliBhYA', channelThumbnailUrl: AVATAR_B },
  그랜: { channelId: 'UC-5eSu3jfdt7XranLDnhd7g', channelThumbnailUrl: AVATAR_A },
  /* 뷰티 */
  스완SWAN: { channelId: 'UCswan_beauty', channelThumbnailUrl: AVATAR_B },
  쏭냥: { channelId: 'UCssongnyang', channelThumbnailUrl: AVATAR_A },
  '서누누 SUNWOO': { channelId: 'UCsunwoo_beauty', channelThumbnailUrl: AVATAR_B },
  아림다운: { channelId: 'UCarimdaun', channelThumbnailUrl: AVATAR_A },
  하이준HiJune: { channelId: 'UChijune', channelThumbnailUrl: AVATAR_B },
}

type Seed = {
  videoId: string
  videoTitle: string
  channelName: keyof typeof CHANNELS
}

/* 실제 유튜브 영상 (IT 먼저, 뷰티 아래) — 썸네일은 i.ytimg에서 실제 로드 */
const seeds: Seed[] = [
  /* ───────────── IT ───────────── */
  { videoId: 'cAlevFMKtGA', videoTitle: '잇섭이 말하는 유튜버의 수입 이야기', channelName: 'ITSub잇섭' },
  { videoId: 'jfqeK51yzmo', videoTitle: '국내 원탑 테크 유튜버 잇섭에 대한 15가지 사실', channelName: 'ITSub잇섭' },
  { videoId: 'Y3WkKp0LRIU', videoTitle: '100만 유튜버 잇섭의 10기가 인터넷 이야기', channelName: 'ITSub잇섭' },
  { videoId: 'qvZ6km9hILg', videoTitle: '디자인을 포기하고 성능을 선택했다, 아이폰 17 프로 변화점', channelName: 'ITSub잇섭' },
  { videoId: '3904pEiNDM8', videoTitle: '갤럭시 S25 울트라 리뷰', channelName: 'ITSub잇섭' },
  { videoId: 'e0D3zoBy1tA', videoTitle: '첫 Copilot+ PC, 갤럭시 북4 엣지 리뷰', channelName: '인태크 INTAECH' },
  { videoId: 'Pagrxf_bFZM', videoTitle: '갤럭시 S25 울트라 한 달 사용 후기, 또 울트라 살 거예요?', channelName: '인태크 INTAECH' },
  { videoId: '9YOJ174ZcoY', videoTitle: '갤럭시 버즈 프로 vs 에어팟 프로 ANC 성능 비교', channelName: '인태크 INTAECH' },
  { videoId: 'QnPANuklHyU', videoTitle: '맥북 프로 언박싱 및 M4 Pro vs M4 성능 비교 테스트', channelName: '인태크 INTAECH' },
  { videoId: 'GGGpBfrCIBw', videoTitle: '갤럭시 북5 Pro 역대급, 루나레이크 사야 하는 진짜 이유', channelName: '더신자 TheSINZA' },
  { videoId: 'dDkT5kn43f0', videoTitle: '소신발언, 아이폰 17 프로 맥스 2주 장단점 분석 리뷰', channelName: '더신자 TheSINZA' },
  { videoId: '97gGzokWdZ8', videoTitle: '갤럭시 S25 울트라 10일 실사용 장단점 리뷰', channelName: '더신자 TheSINZA' },
  { videoId: 'NY_eYnjiINQ', videoTitle: 'M5 아이패드 프로 13인치 1TB, M4 vs M5 비교 리뷰', channelName: '더신자 TheSINZA' },
  { videoId: 'xJGUw4wZJk0', videoTitle: '독거미 시대는 끝났다, 2만원대 미친 기계식 키보드 언박싱', channelName: '더신자 TheSINZA' },
  { videoId: 'quYRr_S6fFQ', videoTitle: '삼성에 가성비? 60만 원대 갤럭시 북4 분석 리뷰', channelName: '주연테크 JOOYONTECH' },
  { videoId: 'KHCJg_INze0', videoTitle: '삼성 보급형 노트북이 이젠 170만원입니다', channelName: '주연테크 JOOYONTECH' },
  { videoId: '29N7NDD9CXg', videoTitle: '갤럭시 S25 엣지 외관 리뷰, S25 울트라와 직접 비교', channelName: '주연테크 JOOYONTECH' },
  { videoId: 'XxWSSmzDxEE', videoTitle: '로지텍 MX 기계식 키보드 솔직 리뷰', channelName: '주연테크 JOOYONTECH' },
  { videoId: 'JzBcGohL5HA', videoTitle: '지금 사야 이득인 독거미보다 좋은 기계식 키보드', channelName: '주연테크 JOOYONTECH' },
  { videoId: 'WTyljOGmpbE', videoTitle: '키보드에 쓴 돈만 1억, 2025년 최고의 키보드는?', channelName: '주연테크 JOOYONTECH' },
  { videoId: 'LFN1Eo4q7Pk', videoTitle: '노트기어 노트북 리뷰가 동영상 리뷰로 새롭게 바뀝니다', channelName: '노트기어' },
  { videoId: 'Xb3mOVXutOU', videoTitle: '49만 9천원 노트북, 기대보단 별로지만 쓸만은 합니다', channelName: '노트기어' },
  { videoId: 'umvm25nTVnU', videoTitle: '노트북마스터 시리즈, 내 노트북 완벽하게 파헤치기', channelName: '노트기어' },
  { videoId: 'l2kx9vB8f5w', videoTitle: '고민말고 이거 사세요, 2024년 가성비 노트북 추천 BEST5', channelName: '노트기어' },
  { videoId: '8gE0gyzsjLs', videoTitle: '아이폰 17 프로 1달 동안 딥하게 써봤습니다, 성능 하나만큼은', channelName: 'underKG 언더케이지' },
  { videoId: 'pO-vNafBErg', videoTitle: '아이폰 17 전 기종 다 사봤습니다, 솔직하게 단점까지', channelName: 'underKG 언더케이지' },
  { videoId: 'lzOKjyVHYB4', videoTitle: '갤럭시 S25 울트라 언박싱, 드디어 공개된 역대급 변화', channelName: 'underKG 언더케이지' },
  { videoId: 'AgSf6hHIH_A', videoTitle: '버즈4 프로 vs 에어팟 vs 소니, 직접 다 비교해보니', channelName: 'underKG 언더케이지' },
  { videoId: 'wVeKlm3rSfA', videoTitle: '누구보다 찐하게 아이폰 17 프로 써봤습니다', channelName: '디에디트 THE EDIT' },
  { videoId: '-iosQ6BGvmw', videoTitle: '갤럭시 S25 시리즈 한 달씩 써 본 후기', channelName: '디에디트 THE EDIT' },
  { videoId: 'uCymbV8SyI0', videoTitle: '역사상 가장 뛰어난 무선 이어폰, 애플 에어팟 프로3', channelName: '디에디트 THE EDIT' },
  { videoId: 'BysGgDi3yHU', videoTitle: '에어팟 프로3는 그냥 좋아진 에어팟 프로2가 아닙니다', channelName: '디에디트 THE EDIT' },
  { videoId: 'DJoyX-VSlJ4', videoTitle: 'M4 아이패드 프로 한 달 실사용, PD와 디자이너의 생각은?', channelName: '디에디트 THE EDIT' },
  { videoId: 'MKBADHqsMoA', videoTitle: '같은 iPhone도 레벨이 다르게, 방구석 리뷰룸 원픽', channelName: '방구석 리뷰룸' },
  { videoId: 'UoXSitfFyDc', videoTitle: '진짜 변색 되었나요? 아이폰 17 프로 맥스 3달 사용기', channelName: '방구석 리뷰룸' },
  { videoId: 'pbNA-98m3mc', videoTitle: '에어팟4 vs 프로3 vs 프로2, 지금 어떤 걸 사야 할까', channelName: '방구석 리뷰룸' },
  { videoId: '3pj4ZVncA9U', videoTitle: '내 인생 최고의 무선 이어폰? 애플 에어팟4 7개월 사용기', channelName: '방구석 리뷰룸' },
  { videoId: 'QmI5CFf31rM', videoTitle: 'M4 아이패드 프로 13인치 실버 언박싱, 실제 사용기', channelName: '방구석 리뷰룸' },
  { videoId: 'bJHMzZBomEA', videoTitle: '아이패드 프로 M4 13인치 스페이스 블랙 리뷰', channelName: '방구석 리뷰룸' },
  { videoId: 'DrZTZ9Z9dgY', videoTitle: '2025년 끝판왕 게이밍 노트북 가성비 BEST5', channelName: '그랜' },
  { videoId: 'bLu9hVS8YVA', videoTitle: '역대급 초 하이엔드 게이밍 노트북, MSI 레이더 18 리뷰', channelName: '그랜' },
  /* ───────────── 뷰티 ───────────── */
  { videoId: '97irpVpyF7s', videoTitle: '바이오미믹 장벽 강화 레드 수딩 크림 솔직 리뷰', channelName: '스완SWAN' },
  { videoId: 'KcHpbc84CDM', videoTitle: '인스타에서 인기 많던 피드 메이크업 튜토리얼', channelName: '스완SWAN' },
  { videoId: 'mrYod65kZj4', videoTitle: '화이트 쥬얼 필링 젤로 깐달걀 피부 만들기', channelName: '쏭냥' },
  { videoId: 'kybiFMmTgxM', videoTitle: '확신의 토끼상 메이크업 튜토리얼', channelName: '쏭냥' },
  { videoId: 'uHWJ4Kz3nSM', videoTitle: '올영 8년차가 추천하는 트러블 피부용 미백 선크림', channelName: '서누누 SUNWOO' },
  { videoId: 'qX__SeNKNME', videoTitle: '4월 MSG 추천템, 올영 신상 + 약국템 + 뷰티 디바이스 후기', channelName: '아림다운' },
  { videoId: 'v4EdICPw9LI', videoTitle: '신입생을 위한 데일리 메이크업 튜토리얼', channelName: '아림다운' },
  { videoId: 'cLbj67bZ7Eo', videoTitle: '[광고] 2026년 가성비 피부관리 추천 TOP10', channelName: '하이준HiJune' },
  { videoId: '-twSJ2EjtF8', videoTitle: '28가지 최고의 메이크업 튜토리얼 모음', channelName: '하이준HiJune' },
]

export const mockBrandCollaborations: BrandCollaborationDto[] = seeds.map(
  (s, index) => {
    const channel = CHANNELS[s.channelName]
    return {
      videoId: s.videoId,
      videoThumbnailUrl: `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`,
      videoTitle: s.videoTitle,
      publishedAt: new Date(2026, 4, 31 - index).toISOString(),
      viewCount: 84000 + index * 9700,
      likeCount: 1300 + index * 73,
      commentCount: 45 + index * 6,
      channelId: channel.channelId,
      channelName: s.channelName,
      channelThumbnailUrl: channel.channelThumbnailUrl,
    }
  }
)
