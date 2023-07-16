import { once } from 'lodash'
import { io } from 'socket.io-client'

export class SocketIOService {
  sc = null
  static instance = new SocketIOService()
  getSocket() {
    if (this.sc !== null)
      return this.sc
    once(() => {
      this.sc = io('http://127.0.0.1:3007', {
        transports: ['websocket'], // 指定传输方式，如WebSocket
        autoConnect: true, // 是否自动连接
        reconnection: true, // 是否自动重新连接
        reconnectionAttempts: 3, // 重新连接尝试次数
        reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
        query: { token: 'your-token' }, // 自定义查询参数
        // 其他可选参数...
      })
      console.log('connect to ws', this.sc.active)
    })()
    return this.sc
  }
}
