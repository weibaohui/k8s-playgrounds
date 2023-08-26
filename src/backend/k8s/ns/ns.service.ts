import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class NsService {
  private readonly logger = new Logger(NsService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getK8sApi()
    const res = await k8sApi.listNamespace()
    return res.body.items
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getK8sApi()
    const res = await k8sApi.deleteNamespace(name)
    return res.body
  }
}
