import type React from 'react'
import type { Select as SelectPrimitive } from 'radix-ui'

type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
> & {
  icon?: 'none' | 'left' | 'right' | 'all'
}

export type { SelectTriggerProps }
