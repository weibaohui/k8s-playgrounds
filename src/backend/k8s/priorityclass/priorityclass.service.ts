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
    const res = await k8sApi.list('scheduling.k8s.io/v1', 'PriorityClass')
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
}
