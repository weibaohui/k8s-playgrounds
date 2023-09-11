import os from 'node:os'
import process from 'node:process'
import * as k8s from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'
import * as pty from 'node-pty'

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name)
  private kc = new k8s.KubeConfig()
  public getKubeConfig() {
    if (process.env.inCluster) {
      this.kc.loadFromCluster()
      return this.kc
    }
    const home = process.env.HOME || process.env.USERPROFILE
    this.kc.loadFromFile(`${home}/.kube/config`)
    return this.kc
  }

  public getClusters() {
    return this.getKubeConfig().getClusters()
  }

  public getCurrentContext() {
    return this.getKubeConfig().currentContext
  }

  public setContext(name) {
    this.getKubeConfig().setCurrentContext(name)
  }

  public getAppsV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.AppsV1Api)
  }

  public getCoreV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
  }

  public getAutoScalingV2Api() {
    return this.getKubeConfig().makeApiClient(k8s.AutoscalingV2Api)
  }

  public getBatchV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.BatchV1Api)
  }

  public getStorageV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.StorageV1Api)
  }

  public getPolicyV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.PolicyV1Api)
  }

  public getObjectApi() {
    return this.getKubeConfig().makeApiClient(k8s.KubernetesObjectApi)
  }

  public getNetworkingV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.NetworkingV1Api)
  }

  public getRbacAuthorizationV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.RbacAuthorizationV1Api)
  }

  public getNodePty() {
    const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

    return pty.spawn(shell, [], {
      name: 'xterm-256color',
      cols: 80,
      rows: 30,
      env: process.env,
      cwd: process.cwd(),
    })
  }

  /**
   * 执行驱逐命令
   * @param nodeName
   * @param cb
   */
  execKubectlDrainNode(nodeName: string, cb: (d: string) => void) {
    const pk = this.getNodePty()
    pk.onData((d) => {
      cb(d.toString())
    })
    setTimeout(() => {
      pk.write(`clear;kubectl drain ${nodeName} --delete-emptydir-data --ignore-daemonsets --force \r`)
    }, 1000)
    return pk
  }
}
