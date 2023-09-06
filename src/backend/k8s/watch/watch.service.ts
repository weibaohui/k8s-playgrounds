import { ResType } from '@backend/k8s/watch/watch.model'
import * as k8s from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class WatchService {
  private readonly logger = new Logger(WatchService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  public watch(resType: ResType, cb?: (d: any) => void) {
    const watchAPI = this.getResourceWatchPath(resType)
    const kc = this.clientService.getKubeConfig()
    const watch = new k8s.Watch(kc)
    watch.watch(`${watchAPI}`,
      {
        allowWatchBookmarks: true,
      },
      (type, apiObj, watchObj) => {
        cb(watchObj)
      },
      (err) => {
        // tslint:disable-next-line:no-console
        this.logger.error(`watch-${resType}`, err)
      }).then(() => {
      this.logger.log(`watching:${resType}`)
    })
  }

  /**
     * 获取监控资源的访问地址
     * @private
     * @param resType
     */
  private getResourceWatchPath(resType: ResType) {
    let watchPath = ''
    switch (resType) {
      case ResType.Pod:
        watchPath = '/api/v1/pods'
        break
      case ResType.Namespace:
        watchPath = '/api/v1/namespaces'
        break
      case ResType.Node :
        watchPath = '/api/v1/nodes'
        break
      case ResType.Event:
        watchPath = '/api/v1/events'
        break
      case ResType.ConfigMap:
        watchPath = '/api/v1/configmaps'
        break
      case ResType.Secret:
        watchPath = '/api/v1/secrets'
        break
      case ResType.ReplicationController:
        watchPath = '/api/v1/replicationcontrollers'
        break
      case ResType.ResourceQuota:
        watchPath = '/api/v1/resourcequotas'
        break
      case ResType.LimitRange:
        watchPath = '/api/v1/limitranges'
        break
      case ResType.Endpoint:
        watchPath = '/api/v1/endpoints'
        break
      case ResType.Service:
        watchPath = '/api/v1/services'
        break
      case ResType.Deployment:
        watchPath = '/apis/apps/v1/deployments'
        break
      case ResType.ReplicaSet:
        watchPath = '/apis/apps/v1/replicasets'
        break
      case ResType.DaemonSet:
        watchPath = '/apis/apps/v1/daemonsets'
        break
      case ResType.StatefulSet:
        watchPath = '/apis/apps/v1/statefulsets'
        break
      case ResType.Job:
        watchPath = '/apis/batch/v1/jobs'
        break
      case ResType.CronJob:
        watchPath = '/apis/batch/v1/cronjobs'
        break
      case ResType.PodDisruptionBudget:
        watchPath = '/apis/policy/v1/poddisruptionbudgets'
        break
      case ResType.PriorityClass:
        watchPath = '/apis/scheduling.k8s.io/v1/priorityclasses'
        break
      case ResType.Ingress:
        watchPath = '/apis/networking.k8s.io/v1/ingresses'
        break
      case ResType.NetworkPolicy:
        watchPath = '/apis/networking.k8s.io/v1/networkpolicies'
        break
      case ResType.IngressClass:
        watchPath = '/apis/networking.k8s.io/v1/ingressclasses'
        break
      case ResType.HorizontalPodAutoscaler:
        watchPath = '/apis/autoscaling/v2/horizontalpodautoscalers'
        break
      default:
        watchPath = '/api/v1/pods'
    }
    return watchPath
  }
}
