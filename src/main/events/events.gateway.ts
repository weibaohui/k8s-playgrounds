import stream from 'node:stream'
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
    console.log(data, client.handshake.query.token)

    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })))
    // return new Observable<WsResponse<any>>((r) => {
    //    })
  }

  @SubscribeMessage('terminal')
  async identity(@MessageBody() data: any): Promise<any> {
    console.log('terminal receive', data)
    // return data
    //
    // return new Observable<string>((s) => {
    //
    // })
    const duplexStream = new stream.PassThrough()
    duplexStream.on('data', (res) => {
      console.log('duplexStream on data')
      console.log(res.toString())
      this.server.emit('terminal', res.toString())
    })
    const stdin = process.stdin
    await this.watchService.execPod('default', 'forwhile-745849b656-mcmsb', 'forwhile', data, duplexStream, duplexStream, stdin, true)
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
    once(() => {
      console.log('start pod watcher')
      this.watchService.PodWatcher(async (d) => {
        return await this.sendPod(d)
      })
    })()
  }
}
