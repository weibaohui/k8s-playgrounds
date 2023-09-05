import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class IngressClassService {
  private readonly logger = new Logger(IngressClassService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getNetworkingV1Api()
    const resp = await k8sApi.listIngressClass()
    return resp.body.items
  }

  async GetOneByName(name: string) {
    const k8sApi = this.clientService.getNetworkingV1Api()
    const resp = await k8sApi.readIngressClass(name)
    return resp.body
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getNetworkingV1Api()
    const r = await k8sApi.deleteIngressClass(name)
    return r.body
  }
}
