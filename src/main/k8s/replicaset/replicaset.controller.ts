import { K8sService } from '@main/k8s/k8s.service'
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('k8s/replicaset')
export class ReplicasetController {
  constructor(
    private watchService: K8sService,
    private configService: ConfigService,
  ) {}

  @Get('/list')
  async list() {
    return await this.watchService.replicasetService.getReplicaSets()
  }

  @Get('/:ns')
  async listByNs(@Param('ns') ns) {
    return await this.watchService.replicasetService.getReplicaSets(ns)
  }
}
