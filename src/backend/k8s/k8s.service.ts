import * as k8s from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'
import { ReplicasetService } from './replicaset/replicaset.service'
import { EventService } from './event/event.service'
import { NodeService } from './node/node.service'
import { ClientService } from './client/client.service'
import { NsService } from './ns/ns.service'
import { PodService } from './pod/pod.service'

@Injectable()
export class K8sService {
  private readonly logger = new Logger(K8sService.name)

  constructor(
    public podService: PodService,
    public nodeService: NodeService,
    public nsService: NsService,
    public eventService: EventService,
    public clientService: ClientService,
    public replicasetService: ReplicasetService,
  ) {
  }

  public watch(resType: string, cb?: (d: any) => void) {
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
  private getResourceWatchPath(resType: string) {
    let watchPath = ''
    switch (resType) {
      case 'pod' || 'pods' :
        watchPath = '/api/v1/pods'
        break
      case 'deploy' || 'deployments' || 'deployment':
        watchPath = '/api/v1/deployments'
        break
      case 'ns' || 'namespaces' || 'namespace':
        watchPath = '/api/v1/namespaces'
        break
      case 'node' || 'nodes' :
        watchPath = '/api/v1/nodes'
        break
      case 'event' || 'events' :
        watchPath = '/api/v1/events'
        break
      case 'rs' || 'replicaset' || 'replicasets' :
        watchPath = '/apis/apps/v1/replicasets'
        break
      default:
        watchPath = '/api/v1/pods'
    }
    return watchPath
  }
}
