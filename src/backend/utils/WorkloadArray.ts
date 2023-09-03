import type { V1CronJob } from '@backend/k8s/model/v1CronJob'
import type { V1Deployment } from '@backend/k8s/model/V1Deployment'
import type { V1Job } from '@backend/k8s/model/v1Job'
import type { V1LimitRange } from '@backend/k8s/model/V1LimitRange'
import type { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import type { V1ReplicationController } from '@backend/k8s/model/V1ReplicationController'
import type { V1ResourceQuota } from '@backend/k8s/model/V1ResourceQuota'
import type { V1StatefulSet } from '@backend/k8s/model/v1StatefulSet'
import type { V2HorizontalPodAutoscaler } from '@backend/k8s/model/v2HorizontalPodAutoscaler'
import type { V1Event } from '../k8s/model/V1Event'
import type { V1Namespace } from '../k8s/model/V1Namespace'
import type { V1Node } from '../k8s/model/V1Node'
import type { V1Pod } from '../k8s/model/V1Pod'

export class WorkloadArray<T extends V1Pod | V2HorizontalPodAutoscaler | V1ResourceQuota | V1LimitRange | V1Node | V1CronJob | V1Event | V1Namespace | V1ReplicaSet | V1Deployment | V1ReplicationController | V1StatefulSet | V1Job> {
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
