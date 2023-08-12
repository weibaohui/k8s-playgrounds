import { ResType } from '@backend/k8s/watch/watch.model'
import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { once } from 'lodash'
import { Observable, from, map } from 'rxjs'
import { Server } from 'socket.io'
import { K8sService } from '../k8s/k8s.service'
import { TerminalData } from '../model/watch.model'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventHubGateway {
  private readonly logger = new Logger(EventHubGateway.name)

  constructor(
    private k8sService: K8sService,
  ) {}

  watched = false
  @WebSocketServer()
  server: Server

  @SubscribeMessage('xxxx')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: any): Observable<WsResponse<any>> {
    this.logger.debug('url query', client.handshake.query.token)
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })))
  }

  @SubscribeMessage('terminal')
  async terminal(@MessageBody() podTerminal: TerminalData): Promise<any> {
    if (podTerminal.command === 'HeartBeat') {
      await this.k8sService.podService.handlePodExecHeartBeat(podTerminal)
      return
    }
    const pk = this.k8sService.podService.getExecPodPty(podTerminal, (r) => {
      podTerminal.data = r
      this.server.emit('terminal', podTerminal)
    })
    // pk.stdin.write(`${podTerminal.command}`)
    pk.write(`${podTerminal.command}\r`)
  }

  @SubscribeMessage('terminal-resize')
  async terminalResize(@MessageBody() podTerminal: TerminalData): Promise<any> {
    this.k8sService.podService.resizeKubectlPty(podTerminal)
  }

  @SubscribeMessage('terminal-log')
  async terminalLog(@MessageBody() podTerminal: TerminalData): Promise<any> {
    if (podTerminal.command === 'HeartBeat') {
      await this.k8sService.podService.handlePodLogHeartBeat(podTerminal)
      return
    }

    await this.k8sService.podService.getLogPodPty(podTerminal, (r) => {
      podTerminal.data = r
      this.server.emit('terminal-log', podTerminal)
    })
  }

  @SubscribeMessage('drain-node')
  async drainNode(@MessageBody() nodeName: string): Promise<any> {
    await this.k8sService.clientService.execKubectlDrainNode(nodeName, (r) => {
      this.server.emit('drain-node', {
        nodeName,
        data: r,
      })
    })
  }

  @SubscribeMessage('watch-init')
  async watchInit(@MessageBody() data: string): Promise<string> {
    this.logger.debug('watchInit')
    await this.startWatch()
    return data
  }

  private async sendEvent(resType: ResType, obj: object) {
    this.server.emit(`events-${resType}`, obj)
  }

  private async startWatch() {
    return once(() => {
      if (this.watched) {
        this.logger.log('watch service is started')
        return
      }
      this.k8sService.watchService.watch(ResType.Pods, (d) => {
        return this.sendEvent(ResType.Pods, d)
      })
      this.k8sService.watchService.watch(ResType.Namespaces, (d) => {
        return this.sendEvent(ResType.Namespaces, d)
      })
      this.k8sService.watchService.watch(ResType.Nodes, (d) => {
        return this.sendEvent(ResType.Nodes, d)
      })
      this.k8sService.watchService.watch(ResType.Events, (d) => {
        return this.sendEvent(ResType.Events, d)
      })
      this.watched = true
    })()
  }
}
