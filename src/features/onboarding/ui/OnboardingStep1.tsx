import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import { OPTION_ITEM } from '../model/optionsStep01'
import { useOnboardingModal } from '../model/useOnboardingModal'

export function OnboardingStep1() {
  const setSelection = useOnboardingModal((s) => s.setSelection)
  const setSelections = useOnboardingModal((s) => s.selections[1])

  return (
    <>
      <p className='text-(length:--text-title-sm) leading-(--leading-title-sm) font-medium text-text-and-icon-default'>
        어떤 일을 하시나요?
      </p>
      <p className='mt-4 text-(length:--text-label-xs) leading-(--leading-label-xs) font-normal text-text-and-icon-tertiary'>
        맞춤 콘텐츠를 제공해드려요
      </p>

      <ToggleGroup
        type='single'
        size='lg'
        spacing={20}
        value={setSelections}
        onValueChange={(value: string) => setSelection(1, value)}
        className='mt-(--spacing-xl)'>
        {OPTION_ITEM.map((item) => (
          <ToggleGroupItem
            key={item.label}
            value={item.value}
            iconPosition='top'
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
