import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/ReplicationController')
export class ReplicationController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async list() {
    return await this.k8sService.replicationControllerService.getReplicationControllers()
  }

  @Get('/list/ns/:ns')
  async listByNs(@Param('ns') ns: string) {
    return await this.k8sService.replicationControllerService.getReplicationControllers(ns)
  }

  @Post('/delete')
  async delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.replicationControllerService.deleteReplicationController(name, ns)
    })
    return {}
  }

  @Get('/ns/:ns/name/:name')
  async getOneByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.replicationControllerService.getReplicationControllerByName(ns, name)
  }
}
