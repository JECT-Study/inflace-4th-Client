import { http, HttpResponse } from 'msw'
import { mockAlarm } from '@/features/me/alarm'
import type { AlarmType } from '@/features/me/alarm/model/types'

export const myAlarmHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/alarms`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: mockAlarm,
      error: null,
    })
  }),
  http.put(
    `${process.env.NEXT_PUBLIC_API_URL}/user/alarms`,
    async ({ request }) => {
      const body = (await request.json()) as {
        alarmType: AlarmType
        enabled: boolean
      }
      const alarm = mockAlarm.alarms.find((a) => a.alarmType === body.alarmType)
      if (alarm) alarm.enabled = body.enabled
      return HttpResponse.json({
        isSuccess: true,
        responseDto: body,
        error: null,
      })
    },
  ),
]
