import { Stream } from 'node:stream'
import * as stream from 'node:stream'
import { LogOptions } from '@kubernetes/client-node/dist/log'
import { V1Status } from '@kubernetes/client-node/dist/api'
import { Injectable, Logger } from '@nestjs/common'
import * as k8s from '@kubernetes/client-node'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class WatchService {
  private readonly logger = new Logger(WatchService.name)

  constructor(
    private configService: ConfigService,
  ) {
  }

  private kc = new k8s.KubeConfig()

  async PodWatcher(cb?: (d: any) => void) {
    this.watch('pod', cb)
  }

  async NsWatcher(cb?: (d: any) => void) {
    this.watch('ns', cb)
  }

  private watch(resType: string, cb?: (d: any) => void) {
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

  async getPod(ns: string, name: string) {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
    const podResp = await k8sApi.readNamespacedPod(name, ns)
    return podResp.body
  }

  async getNodes() {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
    const podResp = await k8sApi.listNode()
    return podResp.body.items
  }

  async getNode(name: string) {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
    const podResp = await k8sApi.readNode(name)
    return podResp.body
  }

  async k8sNs() {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
    const res = await k8sApi.listNamespace()
    return res.body.items
  }

  async events(ns?: string) {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
    if (!ns || ns === 'null' || ns === 'undefined') {
      const eventsAll = await k8sApi.listEventForAllNamespaces()
      return eventsAll.body.items
    }
    const events = await k8sApi.listNamespacedEvent(ns)
    return events.body.items
  }

  async deletePods(name: string, ns: string) {
    const k8sApi = this.getKubeConfig().makeApiClient(k8s.CoreV1Api)
    const r = await k8sApi.deleteNamespacedPod(name, ns)
    return r.body
  }

  async logPods(namespace: string, podName: string, containerName: string, options?: LogOptions) {
    const log = new k8s.Log(this.getKubeConfig())
    const logStream = new Stream.PassThrough()

    logStream.on('data', (chunk) => {
      // use write rather than console.log to prevent double line feed
      process.stdout.write(chunk)
      // this.eventsGateway.sendLog(`${namespace}/${podName}`, chunk)
    })
    await log.log(namespace, podName, containerName, logStream, options)
  }

  async execPod(namespace: string, podName: string, containerName: string, command: string | string[], stdout: stream.Writable | null, stderr: stream.Writable | null, stdin: stream.Readable | null, tty: boolean, statusCallback?: (status: V1Status) => void) {
    const exec = new k8s.Exec(this.getKubeConfig())

    const ws = await exec.exec(namespace, podName, containerName, command, stdout, stderr, stdin, tty, statusCallback)

    return ws
  }
}
