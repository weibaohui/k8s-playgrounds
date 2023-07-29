import { TerminalData } from '@main/watch/watch.model'
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

  private async sendEvent(resType: string, obj: object) {
    this.server.emit(`events-${resType}`, obj)
  }

  private async startWatch() {
    return once(() => {
      if (this.watched) {
        this.logger.log('watch service is started')
        return
      }
      this.watchService.watch('pod', (d) => {
        return this.sendEvent('pod', d)
      })
      this.watchService.watch('ns', (d) => {
        return this.sendEvent('ns', d)
      })
      this.watchService.watch('node', (d) => {
        return this.sendEvent('node', d)
      })
      this.watchService.watch('event', (d) => {
        return this.sendEvent('event', d)
      })
      this.watched = true
    })()
  }
}
