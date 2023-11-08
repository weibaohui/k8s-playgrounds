import { spawn } from 'node:child_process'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ClientService } from '@backend/k8s/client/client.service'
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import { PortForward } from '@backend/model/PortForward'
import { Injectable, Logger } from '@nestjs/common'
import moment from 'moment/moment'
import { IPty } from 'node-pty'

// nc -v -w 1 -z 127.0.0.1 8080

class ShellAction {
  shell: IPty
  cmd: string
  pid: number
  process: string
  portForward: PortForward
}
@Injectable()
export class ShellService {
  private readonly logger = new Logger(ShellService.name)
  private shellList: Array<ShellAction> = new Array<ShellAction>()

  constructor(
    public clientService: ClientService,
  ) {
  }

  start(cmd: string, cb?: (d: string) => void) {
    const pk = this.clientService.getNodePty()
    pk.onData((d) => {
      cb?.(d.toString())
    })
    setTimeout(() => {
      pk.write(`clear;${cmd} \r`)
    }, 1000)
    const sa = new ShellAction()
    sa.shell = pk
    sa.cmd = cmd
    sa.pid = pk.pid
    sa.process = pk.process
    this.shellList.push(sa)
    return sa
  }

  forwardPod(localPort: number, podName: string, podPort: string, ns: string) {
    const sa = this.start(`kubectl port-forward --address 0.0.0.0 pod/${podName} ${localPort}:${podPort}`)
    const pf = new PortForward()
    pf.metadata = new V1ObjectMeta()
    pf.type = 'Pod'
    pf.metadata.name = `${podName}-${podPort}-${localPort}`
    pf.kubePort = podPort
    pf.localPort = localPort
    pf.metadata.namespace = ns
    pf.metadata.creationTimestamp = moment().local().toDate()
    sa.portForward = pf
  }

  forwardSvc(localPort: number, svcName: string, svcPort: string, ns: string) {
    const sa = this.start(`kubectl port-forward --address 0.0.0.0 service/${svcName} ${localPort}:${svcPort}`)
    const pf = new PortForward()
    pf.metadata = new V1ObjectMeta()
    pf.metadata.name = `${svcName}-${svcPort}-${localPort}`
    pf.kubePort = svcPort
    pf.localPort = localPort
    pf.metadata.namespace = ns
    pf.metadata.creationTimestamp = moment().local().toDate()
    pf.type = 'Service'
    sa.portForward = pf
  }

  forwardDeployment(localPort: number, deployName: string, deployPort: string, ns: string) {
    const sa = this.start(`kubectl port-forward --address 0.0.0.0 deployment/${deployName} ${localPort}:${deployPort}`)
    const pf = new PortForward()
    pf.metadata = new V1ObjectMeta()
    pf.type = 'Deployment'
    pf.metadata.name = `${deployName}-${deployPort}-${localPort}`
    pf.kubePort = deployPort
    pf.localPort = localPort
    pf.metadata.namespace = ns
    pf.metadata.creationTimestamp = moment().local().toDate()
    sa.portForward = pf
  }

  Kill = (ns: string, name: string) => {
    const sa = this.shellList.filter(
      s => s.portForward.metadata.name === name && s.portForward.metadata.namespace === ns,
    ).pop()
    if (sa !== undefined) {
      sa.shell.kill()
      this.shellList = this.shellList.filter(s => s.portForward.metadata.name !== name)
    }
  }

  print() {
    this.shellList.forEach((r) => {
      this.logger.error(JSON.stringify(r))
      this.logger.error(r)
      this.logger.error(r.portForward)
    })
  }

  list() {
    return this.shellList.map(r => r.portForward)
  }

  @Cron(CronExpression.EVERY_SECOND)
  cornCheckPortList() {
    this.shellList.forEach((d) => {
      this.ncPort(d.portForward.localPort,
        () => {
          d.portForward.status = 'succeeded'
          d.portForward.statusTimestamp = moment().local().toDate()
          // this.logger.log(`nc probe ${d.portForward.localPort} succeeded`)
        },
        () => {
          d.portForward.status = 'refused'
          d.portForward.statusTimestamp = moment().local().toDate()
          // this.logger.log(`nc probe ${d.portForward.localPort} refused`)
        })

      // this.logger.log(`nc probe ${d.portForward.localPort}`)
    })
  }

  ncPort(port: number, successCallback: () => void, refusedCallback: () => void) {
    const nc = spawn('nc', ['-v', '-w', '1', '-z', '127.0.0.1', `${port}`])
    nc.on('close', (code, signal) => {
      this.logger.log(
          `nc probe ${port} end ${code} ${signal}`)
    })
    nc.stdout.on('data', (data) => {
      if (data.toString().includes('succeeded'))
        successCallback()
      if (data.toString().includes('refused'))
        refusedCallback()
    })
    //
    nc.stderr.on('data', (data) => {
      if (data.toString().includes('succeeded'))
        successCallback()
      if (data.toString().includes('refused'))
        refusedCallback()
    })
    // Send SIGHUP to process.
    // nc.kill('SIGHUP')
  }
}
