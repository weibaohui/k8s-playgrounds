import { get } from '@main/utils/axios/api'
import type { V1Event } from '../../../model/V1Event'
import type { V1Node } from '../../../model/V1Node'
import type { V1Pod } from '../../../model/V1Pod'

export class EventService {
  async getEventsList(ns?: string) {
    return await get<V1Event[]>(`/watch/events/${ns}`)
  }

  async getPodEventsList(pod: V1Pod) {
    const list = await this.getEventsList(pod.metadata.namespace)
    return list.filter((r) => {
      return r.involvedObject.namespace === pod.metadata.namespace && r.involvedObject.name === pod.metadata.name
    })
  }

  async getNodeEventsList(node: V1Node) {
    const list = await this.getEventsList()
    return list.filter((r) => {
      return r.involvedObject.name === node.metadata.name
    })
  }
}
