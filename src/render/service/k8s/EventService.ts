import { get } from '@main/utils/axios/api'
import type { V1Event } from '../../../model/V1Event'

export class EventService {
  async getEventsList(ns: string) {
    return await get<V1Event[]>(`/watch/events/${ns}`)
  }
}
