import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/deployment')
export class DeploymentController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.deploymentService.List()
  }

  @Get('/list/ns/:ns')
  async ListByNs(@Param('ns') ns: string) {
    return await this.k8sService.deploymentService.List(ns)
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.deploymentService.Delete(ns, name)
    })
    return {}
  }

  @Get('/restart/ns/:ns/name/:name')
  async Restart(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.deploymentService.Restart(ns, name)
  }

  @Post('/scale/ns/:ns/name/:name/replicas/:replicas')
  async Scale(@Param('ns') ns: string, @Param('name') name: string, @Param('replicas') replicas: string) {
    return await this.k8sService.deploymentService.Scale(ns, name, replicas)
  }

  @Get('/ns/:ns/name/:name')
  async GetOneByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.deploymentService.GetOneByNsName(ns, name)
  }
}
