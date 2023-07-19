import { TerminalData } from '@main/watch/watch.model'
import { V1Pod } from '@kubernetes/client-node'
import { WatchService } from '@main/watch/watch.service'
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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  private readonly logger = new Logger(EventsGateway.name)

  constructor(
    private watchService: WatchService,
  ) {}

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
      await this.watchService.podService.handlePodExecHeartBeat(podTerminal)
      return
    }
    const pk = this.watchService.podService.getExecPodPty(podTerminal, (r) => {
      podTerminal.data = r
      this.server.emit('terminal', podTerminal)
    })
    // pk.stdin.write(`${podTerminal.command}`)
    pk.write(`${podTerminal.command}\r`)
  }

  @SubscribeMessage('terminal-resize')
  async terminalResize(@MessageBody() podTerminal: TerminalData): Promise<any> {
    this.watchService.podService.resizeKubectlPty(podTerminal)
  }

  @SubscribeMessage('terminal-log')
  async terminalLog(@MessageBody() podTerminal: TerminalData): Promise<any> {
    if (podTerminal.command === 'HeartBeat') {
      await this.watchService.podService.handlePodLogHeartBeat(podTerminal)
      return
    }

    await this.watchService.podService.getLogPodPty(podTerminal, (r) => {
      podTerminal.data = r
      this.server.emit('terminal-log', podTerminal)
    })
  }

  @SubscribeMessage('watch-init')
  async watchInit(@MessageBody() data: string): Promise<string> {
    this.logger.debug('watchInit')
    await this.startWatch()
    return data
  }

  private async sendPod(v1Pod: V1Pod) {
    this.server.emit('events-pod', v1Pod)
  }

  private async sendLog(nsn: string, log: string) {
    this.server.emit(`log:${nsn}`, log)
  }

  private async sendResource(obj: object) {
    this.server.emit('events-res', obj)
  }

  private async startWatch() {
    return once(() => {
      this.logger.debug('start pod watcher')
      this.watchService.PodWatcher((d) => {
        return this.sendPod(d)
      })
    })()
  }
}
