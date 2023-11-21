import os from 'node:os'
import process from 'node:process'
import fs from 'node:fs'
import { KubeConfig } from '@backend/model/KubeConfig'
import { KubernetesObject } from '@kubernetes/client-node'
import * as k8s from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'
import * as pty from 'node-pty'
import YAML from 'yaml'

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name)
  private kc = new k8s.KubeConfig()
  private configPath = `${process.env.HOME || process.env.USERPROFILE}/.kube/config`

  public getKubeConfig() {
    if (process.env.inCluster) {
      this.kc.loadFromCluster()
      return this.kc
    }

    this.kc.loadFromFile(this.configPath)
    return this.kc
  }

  public getClusters() {
    return this.getKubeConfig().getClusters()
  }

  public getCurrentContext() {
    return this.getKubeConfig().currentContext
  }

  public setContext(name) {
    if (process.env.inCluster) {
      this.logger.error(`inCluster change context to ${name} error`)
      return
    }
    const data = fs.readFileSync(this.configPath, 'utf8')
    const x: KubeConfig = YAML.parse(data)
    // const key = x['current-context']
    x['current-context'] = name
    const s = YAML.stringify(x)
    fs.writeFileSync(this.configPath, s)
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

  public getAdmissionregistrationV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.AdmissionregistrationV1Api)
  }

  public getDiscoveryV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.DiscoveryV1Api)
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

  async update(k8sObject: KubernetesObject) {
    const k8sApi = this.getObjectApi()
    const r = await k8sApi.replace(k8sObject)
    return r.body
  }
}
