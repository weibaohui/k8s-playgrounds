import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class StorageClassService {
  private readonly logger = new Logger(StorageClassService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getStorageV1Api()
    const resp = await k8sApi.listStorageClass()
    return resp.body.items
  }

  async GetOneByName(name: string) {
    const k8sApi = this.clientService.getStorageV1Api()
    const resp = await k8sApi.readStorageClass(name)
    return resp.body
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getStorageV1Api()
    const r = await k8sApi.deleteStorageClass(name)
    return r.body
  }

  async SetUniqueDefault(name: string) {
    const list = await this.List()
    for (const r1 of list.filter(r => r.metadata.name !== name))
      await this.CancelDefault(r1.metadata.name)

    for (const r1 of list.filter(r => r.metadata.name === name))
      await this.SetDefault(r1.metadata.name)
  }

  async SetDefault(name: string) {
    const k8sApi = this.clientService.getStorageV1Api()
    const r = await k8sApi.patchStorageClass(name, {
      metadata: {
        annotations: {
          'storageclass.kubernetes.io/is-default-class': 'true',
          'kubectl.kubernetes.io/origin': 'k8s-playgrounds',
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
    return r.body
  }

  async CancelDefault(name: string) {
    const k8sApi = this.clientService.getStorageV1Api()
    const r = await k8sApi.patchStorageClass(name, {
      metadata: {
        annotations: {
          'storageclass.kubernetes.io/is-default-class': 'false',
          'kubectl.kubernetes.io/origin': 'k8s-playgrounds',
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
    return r.body
  }
}
