import process from 'node:process'
import * as k8s from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class WatchKubectlService {
  private readonly logger = new Logger(WatchKubectlService.name)
  private kc = new k8s.KubeConfig()

  public getKubeConfig() {
    const home = process.env.HOME || process.env.USERPROFILE
    this.kc.loadFromFile(`${home}/.kube/config`)
    return this.kc
  }

  public getK8sApi() {
    return this.getCoreV1Api()
  }

  public getCoreV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
  }
}
