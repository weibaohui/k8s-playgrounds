import { WatchService } from '@main/watch/watch.service'
import {
  Body,
  Controller, Delete,
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

  @Get('/pods')
  async pods() {
    return await this.watchService.podService.k8sPods()
  }

  @Get('/pods/:ns')
  async podsByNs(@Param('ns') ns) {
    return await this.watchService.podService.k8sPods(ns)
  }

  @Get('/pod/:ns/:name')
  async getPodByNsName(@Param('ns') ns, @Param('name') name) {
    return await this.watchService.podService.getPod(ns, name)
  }

  @Post('/pods/delete')
  async delPods(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.watchService.podService.deletePods(name, ns)
    })
    return {}
  }

  @Get('/nodes')
  async getNodes() {
    return await this.watchService.nodeService.getNodes()
  }

  @Get('/node/:name')
  async getNode(@Param('name') name) {
    return await this.watchService.nodeService.getNode(name)
  }

  @Delete ('/node/:name')
  async deleteNode(@Param('name') name) {
    return await this.watchService.nodeService.deleteNode(name)
  }

  @Get('/node/cordon/:name')
  async cordonNode(@Param('name') name) {
    return await this.watchService.nodeService.cordonNode(name)
  }

  @Get('/node/unCordon/:name')
  async unCordonNode(@Param('name') name) {
    return await this.watchService.nodeService.unCordonNode(name)
  }

  @Get('/events/:ns')
  async eventsByNs(@Param('ns') ns) {
    return await this.watchService.eventService.events(ns)
  }

  @Get('/ns')
  async ns() {
    return await this.watchService.nsService.k8sNs()
  }
}
