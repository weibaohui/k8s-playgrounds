import {
  Body,
  Controller,
  Get,
  Param, Post,
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

  @Post('/delete')
  async delPods(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.replicasetService.deleteReplicaSet(name, ns)
    })
    return {}
  }
}
