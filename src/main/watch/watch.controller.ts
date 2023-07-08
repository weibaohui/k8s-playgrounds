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
    console.log(nsn)
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.watchService.deletePods(name, ns)
    })
    return {}
    // return await this.watchService.deletePods()
  }
}
