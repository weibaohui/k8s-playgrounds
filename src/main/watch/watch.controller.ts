import stream from 'node:stream'
import { LogOptions } from '@kubernetes/client-node/dist/log'
import { WatchService } from '@main/watch/watch.service'
import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('watch')
export class WatchController {
  constructor(
    private watchService: WatchService,
    private configService: ConfigService,
  ) {}

  @Get('/init')
  async watch() {
    await this.watchService.PodWatcher()
    await this.watchService.NsWatcher()
    return { status: 'ok' }
  }

  @Get('/pods')
  async pods() {
    return await this.watchService.k8sPods()
  }

  @Get('/nodes')
  async getNodes() {
    return await this.watchService.getNodes()
  }

  @Get('/node/:name')
  async getNode(@Param('name') name) {
    return await this.watchService.getNode(name)
  }

  @Get('/pods/:ns')
  async podsByNs(@Param('ns') ns) {
    return await this.watchService.k8sPods(ns)
  }

  @Get('/pod/:ns/:name')
  async getPodByNsName(@Param('ns') ns, @Param('name') name) {
    return await this.watchService.getPod(ns, name)
  }

  @Get('/events/:ns')
  async eventsByNs(@Param('ns') ns) {
    return await this.watchService.events(ns)
  }

  @Get('/ns')
  async ns() {
    return await this.watchService.k8sNs()
  }

  @Post('/pods/delete')
  async delPods(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.watchService.deletePods(name, ns)
    })
    return {}
  }

  /**
   * http://127.0.0.1:3007/watch/pod/log/default/forwhile-745849b656-4kvcm/forwhile
   * @param ns
   * @param podName
   * @param containerName
   */
  @Get('/pod/log/:ns/:podName/:containerName')
  async getPodLog(@Param('ns') ns,
                  @Param('podName') podName,
                  @Param('containerName') containerName,
  ) {
    const opt: LogOptions = {
      follow: true,
      tailLines: 10,
    }

    await this.watchService.logPods(ns, podName, containerName, opt)
    return { aaaa: opt }
  }

  @Get('/pod/exec/:ns/:podName/:containerName')
  async execPod(@Param('ns') ns,
                  @Param('podName') podName,
                  @Param('containerName') containerName,
  ) {
    console.log(ns, podName, containerName)
    const duplexStream = new stream.PassThrough()
    duplexStream.on('data', (res) => {
      console.log('duplexStream on data')
      console.log(res.toString())
    })

    const stdin = process.stdin
    await this.watchService.execPod('default', 'forwhile-745849b656-4kvcm', 'forwhile', 'date', duplexStream, duplexStream, stdin, true)
    return { ok: 'ok' }
  }
}
