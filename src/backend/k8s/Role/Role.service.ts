import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listRoleForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedRole(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    const resp = await k8sApi.readNamespacedRole(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getRbacAuthorizationV1Api()
    const r = await k8sApi.deleteNamespacedRole(name, ns)
    return r.body
  }
}
