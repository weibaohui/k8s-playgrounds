import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'
import moment from 'moment'

@Injectable()
export class DaemonSetService {
  private readonly logger = new Logger(DaemonSetService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listDaemonSetForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedDaemonSet(ns)
    return resp.body.items
  }

  async Delete(ns: string, name: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const r = await k8sApi.deleteNamespacedDaemonSet(name, ns)
    return r.body
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const resp = await k8sApi.readNamespacedDaemonSet(name, ns)
    return resp.body
  }

  async Restart(ns: string, name: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const resp = await k8sApi.patchNamespacedDaemonSet(name, ns,
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
