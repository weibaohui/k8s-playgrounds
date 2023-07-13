import { V1Pod } from '@kubernetes/client-node'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { Observable, from, map } from 'rxjs'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('xxxx')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: any): Observable<WsResponse<any>> {
    console.log(data, client.handshake.query.token)

    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })))
    // return new Observable<WsResponse<any>>((r) => {
    //    })
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data
  }

  async sendPod(v1Pod: V1Pod) {
    this.server.emit('events', v1Pod)
  }

  async sendLog(nsn: string, log: string) {
    this.server.emit(`log:${nsn}`, log)
  }

  async sendResource(obj: object) {
    this.server.emit('events', obj)
  }
}
