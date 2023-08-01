import { K8sService } from '@main/k8s/k8s.service'
import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'

@Controller('k8s/pod')
export class PodController {
  constructor(
    private watchService: K8sService,
  ) {}

  @Get('/list')
  async pods() {
    return await this.watchService.podService.k8sPods()
  }

  @Get('/:ns')
  async podsByNs(@Param('ns') ns) {
    return await this.watchService.podService.k8sPods(ns)
  }

  @Get('/:ns/:name')
  async getPodByNsName(@Param('ns') ns, @Param('name') name) {
    return await this.watchService.podService.getPod(ns, name)
  }

  @Post('/delete')
  async delPods(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.watchService.podService.deletePods(name, ns)
    })
    return {}
  }
}
