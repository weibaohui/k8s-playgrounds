import {
  Body,
  Controller,
  Get, Logger,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/DaemonSet')
export class DaemonSetController {
  private readonly logger = new Logger(DaemonSetController.name)

  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.daemonSetService.List()
  }

  @Get('/list/ns/:ns')
  async ListByNs(@Param('ns') ns: string) {
    return await this.k8sService.daemonSetService.List(ns)
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.daemonSetService.Delete(ns, name)
    })
    return {}
  }

  @Get('/restart/ns/:ns/name/:name')
  async Restart(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.daemonSetService.Restart(ns, name)
  }

  @Get('/ns/:ns/name/:name')
  async GetOneByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.daemonSetService.GetOneByNsName(ns, name)
  }
}
