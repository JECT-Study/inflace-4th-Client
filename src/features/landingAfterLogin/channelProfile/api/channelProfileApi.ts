import type { ChannelProfileDto } from '@/entities/landingAfterLogin/channelProfile'
import { channelProfileMock } from '../mock/channelProfileMock'

export async function fetchChannelProfile(
  _id: string
): Promise<ChannelProfileDto> {
  return channelProfileMock
}
