import { exec } from 'node:child_process'
import { Injectable, Logger } from '@nestjs/common'
import moment from 'moment/moment'
import { IPty } from 'node-pty'
import { Cron, CronExpression } from '@nestjs/schedule'
import { TerminalData, TerminalInstance } from '@backend/model/watch.model'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class PodService {
  private readonly logger = new Logger(PodService.name)

  private execPtyMap = new Map<string, IPty>()
  private logInstanceMap = new Map<string, TerminalInstance>()
  private execInstanceMap = new Map<string, TerminalInstance>()

  constructor(
    public clientService: ClientService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleHeartBeat() {
    this.logInstanceMap.forEach((inst, key) => {
      // 20秒心跳
      if (moment().diff(inst.lastHeartBeatTime, 'seconds') > 20) {
        this.logger.debug(`log 心跳超时 清除 ${key}`)
        inst.pty.kill()
        this.logInstanceMap.delete(key)
      }
    })
    this.execInstanceMap.forEach((inst, key) => {
      // 20秒心跳
      if (moment().diff(inst.lastHeartBeatTime, 'seconds') > 20) {
        this.logger.debug(`exec 心跳超时 清除 ${key}`)
        inst.pty.kill()
        this.execInstanceMap.delete(key)
      }
    })
  }

  getExecPodPty(podTerminal: TerminalData, cb: (d: string) => void) {
    const key = `${podTerminal.ns}/${podTerminal.name}/${podTerminal.containerName}`
    if (this.execInstanceMap.has(key))
      return this.execInstanceMap.get(key).pty

    const pk = this.clientService.getNodePty()
    pk.onData((d) => {
      cb(d.toString())
    })
    this.execInstanceMap.set(key, {
      pty: pk,
      lastHeartBeatTime: moment().toISOString(),
    })
    setTimeout(() => {
      pk.write(`clear;kubectl exec -i -t -n ${podTerminal.ns} ${podTerminal.name} -c ${podTerminal.containerName} -- sh -c "clear; (bash  || sh)"\r`)
    }, 1000)
    return this.execInstanceMap.get(key).pty
  }

  getLogPodPty(podTerminal: TerminalData, cb: (d: string) => void) {
    const key = `${podTerminal.ns}/${podTerminal.name}/${podTerminal.containerName}`
    if (this.logInstanceMap.has(key))
      this.logInstanceMap.get(key).pty.kill()

    const pk = this.clientService.getNodePty()
    pk.onData((d) => {
      cb(d.toString())
    })
    let extCmd = ' '
    if (podTerminal.logOptions.follow)
      extCmd += ' --follow '
    if (podTerminal.logOptions.showTimestamp)
      extCmd += ' --timestamps '
    if (!podTerminal.logOptions.showAll && podTerminal.logOptions.sinceTimestamp)
      extCmd += ` --since-time='${podTerminal.logOptions.sinceTimestamp}' `

    const cmd = `clear;kubectl logs -n ${podTerminal.ns} ${podTerminal.name} -c ${podTerminal.containerName} ${extCmd} \r`
    this.logInstanceMap.set(key, {
      pty: pk,
      lastHeartBeatTime: moment().toISOString(),
    })
    setTimeout(() => {
      pk.write(cmd)
    }, 1000)
    return this.logInstanceMap.get(key).pty
  }

  resizeKubectlPty(podTerminal: TerminalData, cb?: () => void) {
    const key = `${podTerminal.ns}/${podTerminal.name}/${podTerminal.containerName}`
    if (this.execPtyMap.has(key)) {
      const pk = this.execPtyMap.get(key)
      pk.resize(podTerminal.columns, podTerminal.rows)
      cb?.()
    }
  }

  async handlePodLogHeartBeat(podTerminal: TerminalData) {
    const key = `${podTerminal.ns}/${podTerminal.name}/${podTerminal.containerName}`
    if (this.logInstanceMap.has(key))
      this.logInstanceMap.get(key).lastHeartBeatTime = moment().toISOString()
  }

  async handlePodExecHeartBeat(podTerminal: TerminalData) {
    const key = `${podTerminal.ns}/${podTerminal.name}/${podTerminal.containerName}`
    if (this.execInstanceMap.has(key))
      this.execInstanceMap.get(key).lastHeartBeatTime = moment().toISOString()
  }

  GetContainerLogs(ns: string, podName: string, containerName: string) {
    console.log(ns, podName, containerName)
    const cmd = `kubectl logs -n ${ns} ${podName} -c ${containerName} `
    const process = exec(cmd)
    return process.stdout
  }

  async List(ns?: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    if (!ns || ns === 'null') {
      const podAllResp = await k8sApi.listPodForAllNamespaces()
      return podAllResp.body.items
    }
    const podResp = await k8sApi.listNamespacedPod(ns)
    return podResp.body.items
  }

  async GetOne(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const podResp = await k8sApi.readNamespacedPod(name, ns)
    return podResp.body
  }

  async ListByNodeName(nodeName: string) {
    const selector = `spec.nodeName=${nodeName}`
    return this.getPodsByFieldSelector(selector)
  }

  async ListByLabelSelector(selector: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const podResp = await k8sApi.listPodForAllNamespaces(undefined, undefined, undefined, selector)
    return podResp.body.items
  }

  async getPodsByFieldSelector(selector: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const podResp = await k8sApi.listPodForAllNamespaces(undefined, undefined, selector)
    return podResp.body.items
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const r = await k8sApi.deleteNamespacedPod(name, ns)
    return r.body
  }
}
