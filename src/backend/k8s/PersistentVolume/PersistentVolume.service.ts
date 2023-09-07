import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class PersistentVolumeService {
  private readonly logger = new Logger(PersistentVolumeService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getK8sApi()
    const res = await k8sApi.listPersistentVolume()
    return res.body.items
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getK8sApi()
    const res = await k8sApi.deletePersistentVolume(name)
    return res.body
  }

  async GetOneByName(name: string) {
    const k8sApi = this.clientService.getK8sApi()
    const resp = await k8sApi.readPersistentVolume(name)
    return resp.body
  }
}
