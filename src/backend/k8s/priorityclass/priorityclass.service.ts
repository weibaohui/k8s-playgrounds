import { V1PriorityClass } from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class PriorityClassService {
  private readonly logger = new Logger(PriorityClassService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getObjectApi()
    const res = await k8sApi.list<V1PriorityClass>('scheduling.k8s.io/v1', 'PriorityClass')
    return res.body.items
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getObjectApi()
    const r = await k8sApi.delete({
      apiVersion: 'scheduling.k8s.io/v1',
      kind: 'PriorityClass',
      metadata: {
        name,
        namespace: '',
      },
    })
    return r.body
  }

  async GetOneByName(name: string) {
    const k8sApi = this.clientService.getObjectApi()
    const resp = await k8sApi.read<V1PriorityClass>(
      {
        apiVersion: 'scheduling.k8s.io/v1',
        kind: 'PriorityClass',
        metadata: {
          name,
          namespace: '',
        },
      },
    )
    return resp.body
  }

  async SetDefault(name: string) {
    const k8sApi = this.clientService.getObjectApi()
    const pc = await this.GetOneByName(name)
    pc.globalDefault = true
    const r = await k8sApi.patch<V1PriorityClass>(pc)
    return r.body
  }

  async CancelDefault(name: string) {
    const k8sApi = this.clientService.getObjectApi()
    const pc = await this.GetOneByName(name)
    pc.globalDefault = false
    const r = await k8sApi.patch<V1PriorityClass>(pc)
    return r.body
  }

  async SetUniqueDefault(name: string) {
    const list = await this.List()
    for (const r1 of list.filter(r => r.metadata.name !== name))
      await this.CancelDefault(r1.metadata.name)

    for (const r1 of list.filter(r => r.metadata.name === name))
      await this.SetDefault(r1.metadata.name)
  }
}
