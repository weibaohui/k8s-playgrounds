import type { V1Event } from '../k8s/model/V1Event'
import type { V1Namespace } from '../k8s/model/V1Namespace'
import type { V1Node } from '../k8s/model/V1Node'
import type { V1Pod } from '../k8s/model/V1Pod'

export class WorkloadArray<T extends V1Pod | V1Node | V1Event | V1Namespace> {
  Add(list: Array<T>, item: T) {
    const index = list.findIndex(r => r.metadata.name === item.metadata.name)
    if (index === -1) {
      // 真没有
      list.push(item)
    }
    else {
      this.Update(list, item)
    }
  }

  Update(list: Array<T>, item: T) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].metadata.name === item.metadata.name) {
        // console.log('222找到修改的pod了', item.metadata.name)
        list[i] = item
      }
    }
  }

  Delete(list: Array<T>, item: T) {
    const index = list.findIndex(r => r.metadata.name === item.metadata.name)
    if (index !== -1)
      list.splice(index, 1)
  }
}
