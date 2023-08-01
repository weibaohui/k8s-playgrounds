import { EventService } from '@main/k8s/event/event.service'
import { NodeService } from '@main/k8s/node/node.service'
import { ClientService } from '@main/k8s/client/client.service'
import { NsService } from '@main/k8s/ns/ns.service'
import { PodService } from '@main/k8s/pod/pod.service'
import * as k8s from '@kubernetes/client-node'
import { ReplicasetService } from '@main/k8s/replicaset/replicaset.service'
import { Injectable, Logger } from '@nestjs/common'

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
      // optional query parameters can go here.
      {
        allowWatchBookmarks: true,
      },
      // callback is called for each received object.
      (type, apiObj, watchObj) => {
        cb(watchObj)
        // if (type === 'ADDED') {
        //   // tslint:disable-next-line:no-console
        //   // console.log('new object:')
        // }
        // else if (type === 'MODIFIED') {
        //   // tslint:disable-next-line:no-console
        //   // console.log('changed object:')
        // }
        // else if (type === 'DELETED') {
        //   // tslint:disable-next-line:no-console
        //   // console.log('deleted object:')
        // }
        // else if (type === 'BOOKMARK') {
        //   // tslint:disable-next-line:no-console
        //   // console.log(`bookmark: ${watchObj.metadata.resourceVersion}`)
        // }
        // else {
        //   // tslint:disable-next-line:no-console
        //   // console.log(`unknown type: ${type}`)
        // }
        // this.eventsGateway.sendPod(watchObj)
      },
      // done callback is called if the watch terminates normally
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
    switch (resType) {
      case 'pod' || 'pods' :
        resType = 'pods'
        break
      case 'deploy' || 'deployments' || 'deployment':
        resType = 'deployments'
        break
      case 'ns' || 'namespaces' || 'namespace':
        resType = 'namespaces'
        break
      case 'node' || 'nodes' :
        resType = 'nodes'
        break
      case 'event' || 'events' :
        resType = 'events'
        break
      default:
        resType = 'pods'
    }
    return `/api/v1/${resType}`
  }
}
