import { EventsGateway } from '@main/events/events.gateway'
import { Injectable, Logger } from '@nestjs/common'
import * as k8s from '@kubernetes/client-node'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class WatchService {
  private readonly logger = new Logger(WatchService.name)

  constructor(
    private configService: ConfigService,
    private eventsGateway: EventsGateway,
  ) {
  }

  private kc = new k8s.KubeConfig()

  async PodWatcher() {
    this.watch('pod')
  }

  async NsWatcher() {
    this.watch('ns')
  }

  private watch(resType: string) {
    const watchAPI = this.getResourceWatchPath(resType)
    const kc = this.getKubeConfig()
    const watch = new k8s.Watch(kc)
    watch.watch(`${watchAPI}`,
      // optional query parameters can go here.
      {
        allowWatchBookmarks: true,
      },
      // callback is called for each received object.
      (type, apiObj, watchObj) => {
        if (type === 'ADDED') {
          // tslint:disable-next-line:no-console
          // console.log('new object:')
        }
        else if (type === 'MODIFIED') {
          // tslint:disable-next-line:no-console
          // console.log('changed object:')
        }
        else if (type === 'DELETED') {
          // tslint:disable-next-line:no-console
          // console.log('deleted object:')
        }
        else if (type === 'BOOKMARK') {
          // tslint:disable-next-line:no-console
          // console.log(`bookmark: ${watchObj.metadata.resourceVersion}`)
        }
        else {
          // tslint:disable-next-line:no-console
          // console.log(`unknown type: ${type}`)
        }
        this.eventsGateway.sendPod(watchObj)
      },
      // done callback is called if the watch terminates normally
      (err) => {
        // tslint:disable-next-line:no-console
        console.log(err)
      }).then(() => {
    })
  }

  /**
   * 获取监控资源的访问地址
   * @private
   * @param resType
   */
  private getResourceWatchPath(resType: String) {
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
      default:
        resType = 'pods'
    }
    return `/api/v1/${resType}`
  }

  public getKubeConfig() {
    const home = process.env.HOME || process.env.USERPROFILE
    this.kc.loadFromFile(`${home}/.kube/config`)
    return this.kc
  }

  async k8sPods(ns?: string) {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
    if (!ns || ns === 'null') {
      const podAllResp = await k8sApi.listPodForAllNamespaces()
      return podAllResp.body.items
    }
    const podResp = await k8sApi.listNamespacedPod(ns)
    return podResp.body.items
  }

  async k8sNs() {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
    const res = await k8sApi.listNamespace()
    return res.body.items
  }

  async events(ns?: string) {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)

    if (!ns || ns === 'null') {
      const eventsAll = await k8sApi.listEventForAllNamespaces()
      return eventsAll.body.items
    }
    const events = await k8sApi.listNamespacedEvent(ns)
    return events.body.items
  }
}
