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
    const home = process.env.HOME || process.env.USERPROFILE
    this.kc.loadFromFile(`${home}/.kube/config`)
    return this.kc
  }

  public getK8sApi() {
    return this.getCoreV1Api()
  }

  public getAppsV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.AppsV1Api)
  }

  public getCoreV1Api() {
    return this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
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
