import { WatchEventService } from '@main/watch/watch.event.service'
import { WatchNodeService } from '@main/watch/watch.node.service'
import { WatchKubectlService } from '@main/watch/watch.kubectl.service'
import { WatchNsService } from '@main/watch/watch.ns.service'
import { WatchPodService } from '@main/watch/watch.pod.service'
import * as k8s from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class WatchService {
  private readonly logger = new Logger(WatchService.name)

  constructor(
    private configService: ConfigService,
    public podService: WatchPodService,
    public nodeService: WatchNodeService,
    public nsService: WatchNsService,
    public eventService: WatchEventService,
    public kubectlService: WatchKubectlService,

  ) {
  }

  public watch(resType: string, cb?: (d: any) => void) {
    const watchAPI = this.getResourceWatchPath(resType)
    const kc = this.kubectlService.getKubeConfig()
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
