import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class MutatingWebhookService {
  private readonly logger = new Logger(MutatingWebhookService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getAdmissionregistrationV1Api()
    const res = await k8sApi.listMutatingWebhookConfiguration()
    return res.body.items
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getAdmissionregistrationV1Api()
    const res = await k8sApi.deleteMutatingWebhookConfiguration(name)
    return res.body
  }

  async GetOneByName(name: string) {
    const k8sApi = this.clientService.getAdmissionregistrationV1Api()
    const resp = await k8sApi.readMutatingWebhookConfiguration(name)
    return resp.body
  }
}
