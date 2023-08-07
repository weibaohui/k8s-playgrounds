import type { Ref } from 'vue'
import { WorkloadArray } from '../../../backend/utils/WorkloadArray'
import { SocketIOService } from '../../service/k8s/SocketIOService'
import type { V1Event } from '../../../backend/k8s/model/V1Event'
import type { V1Namespace } from '../../../backend/k8s/model/V1Namespace'
import type { V1Node } from '../../../backend/k8s/model/V1Node'
import type { V1Pod } from '../../../backend/k8s/model/V1Pod'

export class WatchService {
  /**
   * 监控变化
   * @param list
   * @param type
   * @param ns ,可选
   */
  async watchChange<T extends V1Pod | V1Node | V1Event | V1Namespace>(list: Ref<T[]>, type: string, ns?: Ref<string>) {
    const socket = SocketIOService.instance.getSocket()
    console.log(`socket-io-${type}`, socket.active)
    socket.emit('watch-init', 'start')
    socket.on(`events-${type}`, (data) => {
      // 处理接收到的数据
      const p: T = data.object as T
      if (ns && ns.value && p.metadata.namespace !== ns.value)
        return

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
