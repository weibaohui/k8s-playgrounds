import { WatchService } from '@main/watch/watch.service'
import {
  Controller,
  Get,
  Param,
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

  @Get('/pods/:ns')
  async podsByNs(@Param('ns') ns) {
    return await this.watchService.k8sPods(ns)
  }

  @Get('/ns')
  async ns() {
    return await this.watchService.k8sNs()
  }
}
