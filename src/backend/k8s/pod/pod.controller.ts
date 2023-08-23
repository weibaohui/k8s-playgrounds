import { K8sService } from '@backend/k8s/k8s.service'
import { V1Pod } from '@kubernetes/client-node'
import { Body, Controller, Get, Param, Post, StreamableFile } from '@nestjs/common'

@Controller('k8s/pod')
export class PodController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async pods(): Promise<V1Pod[]> {
    return await this.k8sService.podService.k8sPods()
  }

  @Get('/:ns')
  async podsByNs(@Param('ns') ns: string): Promise<V1Pod[]> {
    return await this.k8sService.podService.k8sPods(ns)
  }

  @Get('/:ns/:name')
  async getPodByNsName(@Param('ns') ns: string, @Param('name') name: string): Promise<V1Pod> {
    return await this.k8sService.podService.getPod(ns, name)
  }

  @Post('/delete')
  async delPods(@Body() nsn: Array<string>): Promise<string> {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.podService.deletePods(name, ns)
    })
    return 'ok'
  }

  @Get('/log/file/:ns/:podName/:containerName')
  getPodContainerLogs(@Param('ns') ns: string,
                      @Param('podName') podName: string,
                      @Param('containerName') containerName: string): StreamableFile {
    const file = this.k8sService.podService.getPodContainerLogs(ns, podName, containerName)
    return new StreamableFile(file)
  }
}
