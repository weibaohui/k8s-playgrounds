import type { V1Deployment } from '@backend/k8s/model/V1Deployment'
import type { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import { HttpClient } from '@backend/utils/axios/HttpClient'
import type { V1Event } from '@backend/k8s/model/V1Event'
import type { V1Node } from '@backend/k8s/model/V1Node'
import type { V1Pod } from '@backend/k8s/model/V1Pod'

export class EventService {
  async getEventList(ns?: string) {
    return await HttpClient.inst.get<V1Event[]>(`/k8s/event/${ns}`)
  }

  async deleteEvents(nsName: string[]) {
    await HttpClient.inst.post('/k8s/event/delete/', nsName)
  }

  async getEventListWithFieldSelector(ns?: string, selector?: string) {
    return await HttpClient.inst.get<V1Event[]>(`/k8s/event/${ns}/${selector}`)
  }

  async getPodEventList(pod: V1Pod) {
    const list = await this.getEventList(pod.metadata.namespace)
    return list.filter((r) => {
      return r.involvedObject.namespace === pod.metadata.namespace && r.involvedObject.name === pod.metadata.name
    })
  }

  async getReplicasetEventList(rs: V1ReplicaSet) {
    const list = await this.getEventList(rs.metadata.namespace)
    return list.filter((r) => {
      return r.involvedObject.namespace === rs.metadata.namespace && r.involvedObject.name === rs.metadata.name
    })
  }

  async getNodeEventList(node: V1Node) {
    const list = await this.getEventList()
    return list.filter((r) => {
      return r.involvedObject.name === node.metadata.name
    })
  }

  async getDeploymentList(deploy: V1Deployment) {
    const list = await this.getEventList()
    return list.filter((r) => {
      return r.involvedObject.name === deploy.metadata.name
    })
  }
}
