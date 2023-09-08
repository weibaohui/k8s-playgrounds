import { ResType } from '@backend/k8s/watch/watch.model'
import { definitions } from '@frontend/service/page/DocDefinitions'

class Property {
  name: string
  type: string
  description: string
  $ref: string
  isLeaf: boolean
}

class DocTree {
  name: string
  properties: Property[]
  type: string
  description: string
  isLeaf: boolean
}

export class DocHelper {
  static getDocTree(resType: ResType) {
    let k = 'io.k8s.api.core.v1.Pod'
    switch (resType) {
      case ResType.Pod:
        k = 'io.k8s.api.core.v1.Pod'
        break
      case ResType.Namespace:
        k = 'io.k8s.api.core.v1.Namespace'
        break
      case ResType.Deployment:
        k = 'io.k8s.api.apps.v1.Deployment'
        break
      case ResType.Node:
        k = 'io.k8s.api.core.v1.Node'
        break
      case ResType.ReplicaSet:
        k = 'io.k8s.api.apps.v1.ReplicaSet'
        break
      case ResType.Event:
        k = 'io.k8s.api.core.v1.Event'
        break
      case ResType.DaemonSet:
        k = 'io.k8s.api.apps.v1.DaemonSet'
        break
      case ResType.StatefulSet:
        k = 'io.k8s.api.apps.v1.StatefulSet'
        break
      case ResType.ReplicationController:
        k = 'io.k8s.api.core.v1.ReplicationController'
        break
      case ResType.Job:
        k = 'io.k8s.api.batch.v1.Job'
        break
      case ResType.CronJob:
        k = 'io.k8s.api.batch.v1.CronJob'
        break
      case ResType.Secret:
        k = 'io.k8s.api.core.v1.Secret'
        break
      case ResType.PriorityClass:
        k = 'io.k8s.api.scheduling.v1.PriorityClass'
        break
      case ResType.ResourceQuota:
        k = 'io.k8s.api.core.v1.ResourceQuota'
        break
      case ResType.LimitRange:
        k = 'io.k8s.api.core.v1.LimitRange'
        break
      case ResType.HorizontalPodAutoscaler:
        k = 'io.k8s.api.autoscaling.v1.HorizontalPodAutoscaler'
        break
      case ResType.PodDisruptionBudget:
        k = 'io.k8s.api.policy.v1.PodDisruptionBudget'
        break
      case ResType.Endpoint:
        k = 'io.k8s.api.core.v1.Endpoints'
        break
      case ResType.Service:
        k = 'io.k8s.api.core.v1.Service'
        break
      case ResType.Ingress:
        k = 'io.k8s.api.networking.v1.Ingress'
        break
      case ResType.IngressClass:
        k = 'io.k8s.api.networking.v1.IngressClass'
        break
      case ResType.NetworkPolicy:
        k = 'io.k8s.api.networking.v1.NetworkPolicy'
        break
      case ResType.ConfigMap:
        k = 'io.k8s.api.core.v1.ConfigMap'
        break
      case ResType.StorageClass:
        k = 'io.k8s.api.storage.v1.StorageClass'
        break
      case ResType.PersistentVolume:
        k = 'io.k8s.api.core.v1.PersistentVolume'
        break
      case ResType.PersistentVolumeClaim:
        k = 'io.k8s.api.core.v1.PersistentVolumeClaim'
        break
      case ResType.ClusterRole:
        k = 'io.k8s.api.rbac.v1.ClusterRole'
        break
      default:
        k = 'io.k8s.api.core.v1.Pod'
    }
    return this.extracted(k)
  }

  /**
     *
     * @param k io.k8s.api.core.v1.Pod
     * @private
     */
  private static extracted(k: string) {
    const root = JSON.parse(definitions).definitions
    const resource = this.getObjectValue(root, k)
    if (resource === null || resource === undefined)
      return []

    const dt = new DocTree()
    dt.name = k
    dt.type = resource.type
    dt.description = resource.description
    dt.properties = []
    dt.isLeaf = false
    this.fillDocTree(dt, resource)
    return [dt]
  }

  static getObjectValue(data: object, key: string) {
    return data[key]
  }

  static getProperties(data: any) {
    return data.properties
  }

  private static fillDocTree(dt: DocTree, resource: any) {
    const data = this.getProperties(resource)
    if (data === null || data === undefined)
      return

    const keys = Object.keys(data)
    keys.forEach((k) => {
      const item = data[k]
      const dn = new Property()
      dn.description = item.description
      dn.type = item.type ? item.type : 'object'
      dn.$ref = item.$ref
      dn.isLeaf = false
      if (item.items && item.items.$ref && item.$ref === undefined)
        dn.$ref = item.items.$ref

      dn.name = `${k} (${dn.type}) `

      dt.properties.push(dn)
    })
  }

  static getDocTreeByRef($ref: string) {
    const k = $ref.replace('#/definitions/', '')
    return this.extracted(k)[0].properties
  }
}
