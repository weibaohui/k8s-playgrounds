import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class ClusterRoleBindingService {
  private readonly logger = new Logger(ClusterRoleBindingService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    const res = await k8sApi.listClusterRoleBinding()
    return res.body.items
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    const res = await k8sApi.deleteClusterRoleBinding(name)
    return res.body
  }

  async GetOneByName(name: string) {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    const resp = await k8sApi.readClusterRoleBinding(name)
    return resp.body
  }
}
