import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import { OPTION_ITEM } from '../model/optionsStep01'
import { useOnboardingModal } from '../model/useOnboardingModal'

export function OnboardingStep1() {
  const setSelection = useOnboardingModal((s) => s.setSelection)
  const setSelections = useOnboardingModal((s) => s.selections[1])

  return (
    <>
      <p className='text-noto-title-sm-bold text-text-and-icon-default'>
        어떤 일을 하시나요?
      </p>
      <p className='mt-4 text-noto-caption-md-normal text-text-and-icon-tertiary'>
        맞춤 콘텐츠를 제공해드려요
      </p>

      <ToggleGroup
        type='multiple'
        size='lg'
        spacing={20}
        value={(setSelections as string[]) ?? []}
        onValueChange={(value: string) => setSelection(1, value)}
        className='mt-xl'>
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
