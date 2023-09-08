import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class ClusterRoleService {
  private readonly logger = new Logger(ClusterRoleService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    const res = await k8sApi.listClusterRole()
    return res.body.items
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    const res = await k8sApi.deleteClusterRole(name)
    return res.body
  }

  async GetOneByName(name: string) {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    const resp = await k8sApi.readClusterRole(name)
    return resp.body
  }
}
