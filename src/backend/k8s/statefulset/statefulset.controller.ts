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
  async getStatefulSets() {
    return await this.k8sService.statefulSetService.getStatefulSets()
  }

  @Get('/ns/:ns')
  async getStatefulSetsByNs(@Param('ns') ns: string) {
    return await this.k8sService.statefulSetService.getStatefulSets(ns)
  }

  @Post('/delete')
  async deleteStatefulSet(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.statefulSetService.deleteStatefulSet(name, ns)
    })
    return {}
  }

  @Get('/ns/:ns/name/:name')
  async getStatefulSetByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.statefulSetService.getStatefulSetByName(ns, name)
  }
}
