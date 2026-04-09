export interface PlansCardItem {
  planName: string
  price: string
  period: string | null
  features: { label: string; active: boolean }[]
  buttonLabel: string
}
