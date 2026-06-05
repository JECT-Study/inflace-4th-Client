import type { alarmsDto } from '../model/types'

export const mockAlarm: alarmsDto = {
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
