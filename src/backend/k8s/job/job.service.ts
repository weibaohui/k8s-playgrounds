import { V1Job } from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listJobForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedJob(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    const resp = await k8sApi.readNamespacedJob(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    const r = await k8sApi.deleteNamespacedJob(name, ns)
    return r.body
  }

  async Create(ns: string, job: V1Job) {
    const k8sApi = this.clientService.getBatchV1Api()
    const r = await k8sApi.createNamespacedJob(ns, job)
    return r.body
  }
}
