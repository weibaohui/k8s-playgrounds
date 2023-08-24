import {
  Body,
  Controller,
  Get, Logger,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/daemonset')
export class DaemonSetController {
  private readonly logger = new Logger(DaemonSetController.name)

  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async getDaemonSetList() {
    return await this.k8sService.daemonSetService.getDaemonSets()
  }

  @Get('/ns/:ns')
  async getDaemonSetListByNs(@Param('ns') ns: string) {
    return await this.k8sService.daemonSetService.getDaemonSets(ns)
  }

  @Post('/delete')
  async deleteDaemonSet(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.daemonSetService.deleteDaemonSet(ns, name)
    })
    return {}
  }

  @Get('/restart/ns/:ns/name/:name')
  async restartDaemonSet(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.daemonSetService.restartDaemonSet(ns, name)
  }

  @Get('/ns/:ns/name/:name')
  async getDaemonSetByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.daemonSetService.getDaemonSetByName(ns, name)
  }
}
