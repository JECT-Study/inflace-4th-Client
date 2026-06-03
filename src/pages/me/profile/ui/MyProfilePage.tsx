'use client'

import { PersonalInfoSection } from '@/widgets/me/personalInfo'
import { CustomInfoSection } from '@/widgets/me/customInfo'

export function MyProfilePage() {
  return (
    <div className='flex size-full bg-background-gray-default'>
      <div className='flex h-fit w-full flex-col gap-32 p-24'>
        <h1 className='text-ibm-title-lg-normal text-text-and-icon-default'>
          프로필 설정
        </h1>

        <div className='flex h-fit w-full max-w-[118.6rem] flex-col gap-24'>
          <PersonalInfoSection />
          <CustomInfoSection />
        </div>
      </div>
    </div>
  )
}
