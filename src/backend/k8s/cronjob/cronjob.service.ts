import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listCronJobForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedCronJob(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    const resp = await k8sApi.readNamespacedCronJob(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    const r = await k8sApi.deleteNamespacedCronJob(name, ns)
    return r.body
  }
}
