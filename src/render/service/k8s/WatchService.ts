import { WorkloadArray } from '@main/utils/WorkloadArray'
import { SocketIOService } from '@render/service/k8s/SocketIOService'
import type { Ref } from 'vue'

export class WatchService {
  async watchChange<T>(list: Ref<T[]>, type: string) {
    const socket = SocketIOService.instance.getSocket()
    console.log(`socket-io-${type}`, socket.active)
    socket.on(`events-${type}`, (data) => {
      // 处理接收到的数据
      const p: T = data.object as T

      const wa = new WorkloadArray<T>()
      switch (data.type) {
        case 'MODIFIED':
          wa.Update(list.value, p)
          break
        case 'ADDED':
          wa.Add(list.value, p)
          break
        case 'DELETED':
          wa.Delete(list.value, p)
          break
      }
    })
  }
}
