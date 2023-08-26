import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/StatefulSet')
export class StatefulSetController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.statefulSetService.List()
  }

  @Get('/ns/:ns')
  async ListByNs(@Param('ns') ns: string) {
    return await this.k8sService.statefulSetService.List(ns)
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.statefulSetService.Delete(name, ns)
    })
    return {}
  }

  @Get('/ns/:ns/name/:name')
  async GetOneByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.statefulSetService.GetOneByNsName(ns, name)
  }

  @Post('/scale/ns/:ns/name/:name/replicas/:replicas')
  async Scale(@Param('ns') ns: string, @Param('name') name: string, @Param('replicas') replicas: number) {
    return await this.k8sService.statefulSetService.Scale(ns, name, replicas)
  }

  @Get('/restart/ns/:ns/name/:name')
  async restartStatefulSet(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.statefulSetService.restartStatefulSet(ns, name)
  }
}
