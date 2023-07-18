import { TerminalData } from '@main/watch/watch.model'
import { V1Pod } from '@kubernetes/client-node'
import { WatchService } from '@main/watch/watch.service'
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
  constructor(
    private watchService: WatchService,
  ) {}

  @WebSocketServer()
  server: Server

  @SubscribeMessage('xxxx')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: any): Observable<WsResponse<any>> {
    console.log('url query', client.handshake.query.token)
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })))
  }

  @SubscribeMessage('terminal')
  async terminal(@MessageBody() podTerminal: TerminalData): Promise<any> {
    const pk = this.watchService.getKubectlPty(podTerminal, (r) => {
      podTerminal.data = r
      this.server.emit('terminal', podTerminal)
    })
    pk.write(`${podTerminal.command}\r`)
  }

  @SubscribeMessage('terminal-resize')
  async terminalResize(@MessageBody() podTerminal: TerminalData): Promise<any> {
    this.watchService.resizeKubectlPty(podTerminal)
  }

  @SubscribeMessage('terminal-log')
  async terminalLog(@MessageBody() podTerminal: TerminalData): Promise<any> {
    await this.watchService.getPodLogs(podTerminal, (r) => {
      podTerminal.data = r
      this.server.emit('terminal-log', podTerminal)
    }, {
      follow: true,
      pretty: true,
    })
  }

  @SubscribeMessage('watch-init')
  async watchInit(@MessageBody() data: string): Promise<string> {
    console.log('watchInit')
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
      console.log('start pod watcher')
      this.watchService.PodWatcher((d) => {
        return this.sendPod(d)
      })
    })()
  }
}
