import { ClientService } from '@backend/k8s/client/client.service'
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import { PortForward } from '@backend/model/PortForward'
import { Injectable, Logger } from '@nestjs/common'
import moment from 'moment/moment'
import { IPty } from 'node-pty'

class ShellAction {
  shell: IPty
  name: string
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
    sa.name = cmd
    sa.process = pk.process
    this.shellList.push(sa)
    return sa
  }

  forwardPod(localPort: number, podName: string, podPort: string, ns: string) {
    const sa = this.start(`kubectl port-forward --address 0.0.0.0 pod/${podName} ${localPort}:${podPort}`)
    const pf = new PortForward()
    pf.metadata = new V1ObjectMeta()
    pf.type = 'Pod'
    pf.type = 'Deployment'
    pf.metadata.name = podName
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
    pf.metadata.name = svcName
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
    pf.metadata.name = deployName
    pf.kubePort = deployPort
    pf.localPort = localPort
    pf.metadata.namespace = ns
    pf.metadata.creationTimestamp = moment().local().toDate()
    sa.portForward = pf
  }

  kill(cmd: string) {
    const sa = this.shellList.filter(s => s.cmd === cmd).pop()
    if (sa !== undefined) {
      sa.shell.kill()
      this.shellList = this.shellList.filter(s => s.cmd !== cmd)
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
}
