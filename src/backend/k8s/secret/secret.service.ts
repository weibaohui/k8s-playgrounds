import { JsonDataWrap } from '@backend/model/JsonDataWrap'
import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class SecretService {
  private readonly logger = new Logger(SecretService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listSecretForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedSecret(ns)
    return resp.body.items
  }

  async Delete(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const r = await k8sApi.deleteNamespacedSecret(name, ns)
    return r.body
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const resp = await k8sApi.readNamespacedSecret(name, ns)
    return resp.body
  }

  async Update(ns: string, name: string, key: string, data: JsonDataWrap<string>) {
    const x = data.data
    const k8sApi = this.clientService.getCoreV1Api()
    const secret = await this.GetOneByNsName(ns, name)
    secret.data[key] = atob(x)
    return await k8sApi.replaceNamespacedSecret(name, ns, secret)
  }
}
