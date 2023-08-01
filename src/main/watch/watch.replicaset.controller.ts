import { WatchService } from '@main/watch/watch.service'
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('watch/replicaset')
export class WatchReplicasetController {
  constructor(
    private watchService: WatchService,
    private configService: ConfigService,
  ) {}

  @Get('/')
  async list() {
    return await this.watchService.replicasetService.getReplicaSets()
  }

  @Get('/:ns')
  async listByNs(@Param('ns') ns) {
    return await this.watchService.replicasetService.getReplicaSets(ns)
  }
}
