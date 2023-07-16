import * as process from 'node:process'
import os from 'node:os'
import { TerminalData } from '@main/watch/watch.model'
import { IPty } from 'node-pty'
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

import * as pty from 'node-pty'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    private watchService: WatchService,
  ) {}

  ptyList = new Map<string, IPty>()

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
  async identity(@MessageBody() podTerminal: TerminalData): Promise<any> {
    console.log('terminal receive', podTerminal)
    const pk = this.getPty(podTerminal)
    pk.write(`${podTerminal.command}\r`)
  }

  private getPty(podTerminal: TerminalData) {
    const key = `${podTerminal.ns}/${podTerminal.name}/${podTerminal.containerName}`
    if (this.ptyList.has(key))
      return this.ptyList.get(key)

    const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

    const pk = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env,
    })

    pk.onData((d) => {
      process.stdout.write(d.toString())
      podTerminal.data = d.toString()
      this.server.emit('terminal', podTerminal)
    })
    pk.write(`kubectl exec -i -t -n ${podTerminal.ns} ${podTerminal.name} -c ${podTerminal.containerName} -- sh -c "clear; (bash || ash || sh)"\r`)
    this.ptyList.set(key, pk)
    return this.ptyList.get(key)
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
