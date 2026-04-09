import type React from 'react'
import type { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import type { ImageProps } from 'next/image'

type ToggleGroupProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
  'type'
> & {
  type?: 'single' | 'multiple'
  spacing?: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'lg' | 'fit'
}

type ToggleGroupItemProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Item
> & {
  size?: 'lg' | 'fit'
  iconPosition?: 'left' | 'top'
  imgSrc?: ImageProps['src']
  imgAlt?: string
}

export type { ToggleGroupProps, ToggleGroupItemProps }
