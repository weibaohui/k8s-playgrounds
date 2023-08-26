import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'
import moment from 'moment/moment'

@Injectable()
export class StatefulSetService {
  private readonly logger = new Logger(StatefulSetService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listStatefulSetForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedStatefulSet(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const resp = await k8sApi.readNamespacedStatefulSet(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const r = await k8sApi.deleteNamespacedStatefulSet(name, ns)
    return r.body
  }

  async Scale(ns: string, name: string, replicas: number) {
    const k8sApi = this.clientService.getAppsV1Api()
    const resp = await k8sApi.patchNamespacedStatefulSetScale(name, ns,
      {
        spec: {
          replicas: Number.parseInt(`${replicas}`),
        },
      }, 'true', undefined,
      undefined, undefined, undefined,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'Accept': 'application/json, */*',
        },
      })
    return resp.body
  }

  async restartStatefulSet(ns: string, name: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const resp = await k8sApi.patchNamespacedStatefulSet(name, ns,
      {
        spec: {
          template: {
            metadata: {
              annotations: {
                'kubectl.kubernetes.io/restartedAt': moment(),
                'kubectl.kubernetes.io/origin': 'k8s-playgrounds',
              },
            },
          },
        },
      }, 'true', undefined,
      undefined, undefined, undefined,
      {
        headers: {
          'Content-Type': 'application/strategic-merge-patch+json',
          'Accept': 'application/json, */*',
        },
      })
    return resp.body
  }
}
