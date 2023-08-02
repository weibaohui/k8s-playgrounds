import { ClientService } from '@main/k8s/client/client.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class NsService {
  private readonly logger = new Logger(NsService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async getNsList() {
    const k8sApi = this.clientService.getK8sApi()
    const res = await k8sApi.listNamespace()
    return res.body.items
  }
}
