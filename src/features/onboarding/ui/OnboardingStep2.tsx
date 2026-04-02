import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import { OPTION_ITEM } from '../model/optionsStep02'
import { useOnboardingModal } from '../model/useOnboardingModal'

export function OnboardingStep2() {
  const setSelection = useOnboardingModal((s) => s.setSelection)
  const setSelections = useOnboardingModal((s) => s.selections[2])

  return (
    <>
      <p className='text-(length:--text-title-sm) leading-(--leading-title-sm) font-medium text-text-and-icon-default'>
        관심있는 기능을 모두 선택해주세요
      </p>
      <p className='mt-4 text-(length:--text-label-xs) leading-(--leading-label-xs) font-normal text-text-and-icon-tertiary'>
        맞춤 콘텐츠를 제공해드려요
      </p>

      <ToggleGroup
        type='multiple'
        size='fit'
        spacing={16}
        value={setSelections}
        onValueChange={(value: string) => setSelection(2, value)}
        className='mt-(--spacing-xl)'>
        {OPTION_ITEM.map((item) => (
          <ToggleGroupItem
            key={item.label}
            value={item.value}
            iconPosition='left'
            imgSrc={item.imgSrc.src}
            imgAlt={item.label}
            aria-label={item.label}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  )
}
