export type AlarmType = 'PAYMENT' | 'FEATURE_UPDATE' | 'EVENT_BENEFIT'

export interface alarms {
  alarmType: AlarmType
  enabled: boolean
}

export interface alarmsDto {
  alarmEmail: string
  alarms: alarms[]
}
