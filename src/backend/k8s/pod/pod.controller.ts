import {
  Body,
  Controller,
  Get,
  Param, Post, StreamableFile,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/pod')
export class PodController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async pods() {
    return await this.k8sService.podService.k8sPods()
  }

  @Get('/:ns')
  async podsByNs(@Param('ns') ns) {
    return await this.k8sService.podService.k8sPods(ns)
  }

  @Get('/:ns/:name')
  async getPodByNsName(@Param('ns') ns, @Param('name') name) {
    return await this.k8sService.podService.getPod(ns, name)
  }

  @Post('/delete')
  async delPods(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.podService.deletePods(name, ns)
    })
    return {}
  }

  @Get('/log/file/:ns/:podName/:containerName')
  getPodContainerLogs(@Param('ns') ns,
                      @Param('podName') podName,
                      @Param('containerName') containerName): StreamableFile {
    const file = this.k8sService.podService.getPodContainerLogs(ns, podName, containerName)
    return new StreamableFile(file)
  }
}
