import { WorkloadArray } from '@main/utils/WorkloadArray'
import { SocketIOService } from '@render/service/k8s/SocketIOService'
import type { Ref } from 'vue'
import type { V1Event } from '../../../model/V1Event'
import type { V1Namespace } from '../../../model/V1Namespace'
import type { V1Node } from '../../../model/V1Node'
import type { V1Pod } from '../../../model/V1Pod'

export class WatchService {
  async watchChange<T extends V1Pod | V1Node | V1Event | V1Namespace>(list: Ref<T[]>, type: string, ns?: Ref<string>) {
    const socket = SocketIOService.instance.getSocket()
    console.log(`socket-io-${type}`, socket.active)
    socket.emit('watch-init', 'start')
    socket.on(`events-${type}`, (data) => {
      // 处理接收到的数据
      const p: T = data.object as T
      if (ns && ns.value && p.metadata.namespace !== ns.value) {
        // console.log('跳过', selectedNs.value, item.metadata.namespace)
        return
      }
      const wa = new WorkloadArray<T>()
      switch (data.type) {
        case 'MODIFIED':
          console.log('MODIFIED', p)
          wa.Update(list.value, p)
          break
        case 'ADDED':
          console.log('ADDED', p)
          wa.Add(list.value, p)
          break
        case 'DELETED':
          console.log('DELETED', p)
          wa.Delete(list.value, p)
          break
      }
    })
  }
}
