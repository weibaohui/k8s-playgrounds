import {
  Controller,
  Get,
  Param,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/replicaset')
export class ReplicasetController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async list() {
    return await this.k8sService.replicasetService.getReplicaSets()
  }

  @Get('/:ns')
  async listByNs(@Param('ns') ns) {
    return await this.k8sService.replicasetService.getReplicaSets(ns)
  }
}
