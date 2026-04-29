import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar'

interface ChannelProfileCardProps {
  profileImageUrl: string
  name: string
  channelHandle: string
  category: string
}

//채널의 기본 정보를 알려주는 프로필 카드
export function ChannelProfileCard({
  profileImageUrl,
  name,
  channelHandle,
  category,
}: ChannelProfileCardProps) {
  return (
    <div className='flex h-fit w-full items-center gap-4'>
      {/* 스튜디오 이미지 */}
      <Avatar className='h-[15rem] w-[15rem]'>
        <AvatarImage src={profileImageUrl} alt={name} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      {/* 콘텐츠 종류, 채널 이름, handle name  */}
      <div className='flex h-fit w-full flex-col justify-center gap-8 p-28'>
        <span className='size-fit gap-10 rounded-[3rem] bg-brand-secondary px-12 py-6 text-noto-label-sm-normal text-white'>
          {category}
        </span>

        <div className='flex h-fit w-full flex-col gap-4'>
          <h2 className='text-ibm-heading-md-normal text-text-and-icon-default'>
            {name}
          </h2>
          <p className='text-ibm-label-sm-thin text-text-and-icon-default'>
            {channelHandle}
          </p>
        </div>
      </div>
    </div>
  )
}
