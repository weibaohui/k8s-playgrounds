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
  async getReplicaSets() {
    return await this.k8sService.replicasetService.getReplicaSets()
  }

  @Get('/ns/:ns')
  async getReplicaSetsByNs(@Param('ns') ns: string) {
    return await this.k8sService.replicasetService.getReplicaSets(ns)
  }

  @Post('/delete')
  async deleteReplicaSet(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.replicasetService.deleteReplicaSet(name, ns)
    })
    return {}
  }

  @Get('/ns/:ns/name/:name')
  async getReplicaSetByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.replicasetService.getReplicaSetByName(ns, name)
  }
}
