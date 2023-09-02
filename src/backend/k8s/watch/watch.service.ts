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
      case ResType.Pods:
        watchPath = '/api/v1/pods'
        break
      case ResType.Namespaces:
        watchPath = '/api/v1/namespaces'
        break
      case ResType.Nodes :
        watchPath = '/api/v1/nodes'
        break
      case ResType.Events:
        watchPath = '/api/v1/events'
        break
      case ResType.ConfigMaps:
        watchPath = '/api/v1/configmaps'
        break
      case ResType.Secrets:
        watchPath = '/api/v1/secrets'
        break
      case ResType.ReplicationControllers:
        watchPath = '/api/v1/replicationcontrollers'
        break
      case ResType.Deployments:
        watchPath = '/apis/apps/v1/deployments'
        break
      case ResType.ReplicaSets:
        watchPath = '/apis/apps/v1/replicasets'
        break
      case ResType.DaemonSets:
        watchPath = '/apis/apps/v1/daemonsets'
        break
      case ResType.StatefulSets:
        watchPath = '/apis/apps/v1/statefulsets'
        break
      case ResType.Jobs:
        watchPath = '/apis/batch/v1/jobs'
        break
      case ResType.CronJobs:
        watchPath = '/apis/batch/v1/cronjobs'
        break
      case ResType.PriorityClasses:
        watchPath = '/apis/scheduling.k8s.io/v1/priorityclasses'
        break
      default:
        watchPath = '/api/v1/pods'
    }
    return watchPath
  }
}
