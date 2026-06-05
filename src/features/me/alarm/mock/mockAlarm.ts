import type { AlarmsDto } from '../model/types'

export const mockAlarm: AlarmsDto = {
  alarmEmail: 'hong@gmail.com',
  alarms: [
    {
      alarmType: 'PAYMENT',
      enabled: false,
    },
    {
      alarmType: 'FEATURE_UPDATE',
      enabled: true,
    },
    {
      alarmType: 'EVENT_BENEFIT',
      enabled: false,
    },
  ],
}
