import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'
import moment from 'moment'

@Injectable()
export class DeploymentService {
  private readonly logger = new Logger(DeploymentService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listDeploymentForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedDeployment(ns)
    return resp.body.items
  }

  async Delete(ns: string, name: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const r = await k8sApi.deleteNamespacedDeployment(name, ns)
    return r.body
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const resp = await k8sApi.readNamespacedDeployment(name, ns)
    return resp.body
  }

  async Restart(ns: string, name: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const resp = await k8sApi.patchNamespacedDeployment(name, ns,
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

  async Scale(ns: string, name: string, replicas: string) {
    const k8sApi = this.clientService.getAppsV1Api()
    const resp = await k8sApi.patchNamespacedDeploymentScale(name, ns,
      {
        spec: {
          replicas: Number.parseInt(replicas),
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
}
