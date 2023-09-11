import { BackEndUrl } from '@frontend/service/k8s/BackEndUrl'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

export class SocketIOService {
  private sc: Socket = null
  static instance = new SocketIOService()
  getSocket() {
    // console.log(window.location)
    // console.log(`${window.location.protocol}//${window.location.host}`)
    if (this.sc !== null) {
      this.sc.connect()
      return this.sc
    }
    this.sc = io(BackEndUrl.getUrl(), {
      transports: ['websocket'], // 指定传输方式，如WebSocket
      autoConnect: true, // 是否自动连接
      reconnection: true, // 是否自动重新连接
      reconnectionAttempts: 3, // 重新连接尝试次数
      reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
      query: { token: 'your-token' }, // 自定义查询参数
      // 其他可选参数...
    })
    console.log('connect to ws', this.sc.active)
    return this.sc
  }
}
