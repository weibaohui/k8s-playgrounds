import { ResType } from '@backend/k8s/watch/watch.model'
import { Play } from '@frontend/generated'
import { WatchService } from '@frontend/service/k8s/WatchService'

export class K8sService {
  static watchService = new WatchService()
  static playService = new Play({ BASE: 'http://127.0.0.1:3007' }).default

  static async getResource({
    resType,
                                 ns,
                                 name,
  }: {
    resType: string
    ns: string
    name: string
  }) {
    switch (resType) {
      case 'ReplicaSet':
        return K8sService.playService.replicaSetControllerGetOneByNsName({
          ns,
          name,
        })
      case 'Deployment':
        return K8sService.playService.deploymentControllerGetOneByNsName({
          ns,
          name,
        })
      case 'Node':
        return K8sService.playService.nodeControllerGetOneByName({ name })
      case 'DaemonSet':
        return K8sService.playService.daemonSetControllerGetOneByNsName({
          ns,
          name,
        })
      case 'ReplicationController':
        return K8sService.playService.replicationControllerGetOneByNsName({
          ns,
          name,
        })
      case 'StatefulSet':
        return K8sService.playService.statefulSetControllerGetOneByNsName({
          ns,
          name,
        })
      case 'Pod':
        return K8sService.playService.podControllerGetOneByNsName({
          ns,
          name,
        })
      case 'Job':
        return K8sService.playService.jobControllerGetOneByNsName({
          ns,
          name,
        })
      case 'CronJob':
        return K8sService.playService.cronJobControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.ConfigMap:
      case ResType.Secret:
      case ResType.PriorityClass:
      case ResType.Event:
      case ResType.Namespace:
    }
  }
}
