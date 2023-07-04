import type { V1Pod } from '../../model/V1Pod'

export class PodArray {
  AddPods(pods: Array<V1Pod>, pod: V1Pod) {
    const index = pods.findIndex(r => r.metadata.name === pod.metadata.name)
    if (index === -1) {
      // 真没有
      pods.push(pod)
    }
    else {
      this.UpdatePods(pods, pod)
    }
  }

  UpdatePods(pods: Array<V1Pod>, pod: V1Pod) {
    for (let i = 0; i < pods.length; i++) {
      if (pods[i].metadata.name === pod.metadata.name) {
        // console.log('222找到修改的pod了', item.metadata.name)
        pods[i] = pod
      }
    }
  }

  DeletePods(pods: Array<V1Pod>, pod: V1Pod) {
    const index = pods.findIndex(r => r.metadata.name === pod.metadata.name)
    if (index !== -1)
      pods.splice(index, 1)
  }
}
