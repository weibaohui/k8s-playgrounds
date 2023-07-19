import os from 'node:os'
import process from 'node:process'
import { ConfigService } from '@nestjs/config'
import { TerminalData, TerminalInstance } from '@main/watch/watch.model'
import { Injectable, Logger } from '@nestjs/common'
import moment from 'moment/moment'
import * as pty from 'node-pty'
import { IPty } from 'node-pty'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class WatchPodService {
  private readonly logger = new Logger(WatchPodService.name)

  private execPtyMap = new Map<string, IPty>()
  private logInstanceMap = new Map<string, TerminalInstance>()
  private execInstanceMap = new Map<string, TerminalInstance>()

  constructor(
    private configService: ConfigService,
  ) {
    this.handleHeartBeat()
  }

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

    const pk = this.getNodePty()
    pk.onData((d) => {
      cb(d.toString())
    })

    pk.write(`kubectl exec -i -t -n ${podTerminal.ns} ${podTerminal.name} -c ${podTerminal.containerName} -- sh -c "clear; (bash  || sh)"\r`)
    this.execInstanceMap.set(key, {
      pty: pk,
      lastHeartBeatTime: moment().toISOString(),
    })
    return this.execInstanceMap.get(key).pty
  }

  getLogPodPty(podTerminal: TerminalData, cb: (d: string) => void) {
    const key = `${podTerminal.ns}/${podTerminal.name}/${podTerminal.containerName}`
    if (this.logInstanceMap.has(key))
      this.logInstanceMap.get(key).pty.kill()

    const pk = this.getNodePty()
    pk.onData((d) => {
      cb(d.toString())
    })
    let extCmd = ' '
    if (podTerminal.logOptions.follow)
      extCmd += ' --follow '
    if (podTerminal.logOptions.showTimestamp)
      extCmd += ' --timestamps '
    if (podTerminal.logOptions.sinceTimestamp)
      extCmd += ` --since-time='${podTerminal.logOptions.sinceTimestamp}' `

    const cmd = `kubectl logs -n ${podTerminal.ns} ${podTerminal.name} -c ${podTerminal.containerName} ${extCmd} \r`
    pk.write(cmd)
    this.logInstanceMap.set(key, {
      pty: pk,
      lastHeartBeatTime: moment().toISOString(),
    })
    return this.logInstanceMap.get(key).pty
  }

  private getNodePty() {
    const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

    return pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      env: process.env,
      cwd: process.cwd(),
    })
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
}
