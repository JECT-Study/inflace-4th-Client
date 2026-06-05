export type AlarmType = 'PAYMENT' | 'FEATURE_UPDATE' | 'EVENT_BENEFIT'

export interface Alarms {
  alarmType: AlarmType
  enabled: boolean
}

export interface AlarmsDto {
  alarmEmail: string
  alarms: Alarms[]
}
