import { K8sService } from '@backend/k8s/k8s.service'
import { V1Pod } from '@kubernetes/client-node'
import { Body, Controller, Get, Param, Post, StreamableFile } from '@nestjs/common'

@Controller('k8s/pod')
export class PodController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List(): Promise<V1Pod[]> {
    return await this.k8sService.podService.List()
  }

  @Get('/list/ns/:ns')
  async ListByNs(@Param('ns') ns: string): Promise<V1Pod[]> {
    return await this.k8sService.podService.List(ns)
  }

  @Get('/ns/:ns/name/:name')
  async GetOneByNsName(@Param('ns') ns: string, @Param('name') name: string): Promise<V1Pod> {
    return await this.k8sService.podService.GetOne(ns, name)
  }

  @Get('/list/node/:name')
  async ListByNodeName(@Param('name') name: string) {
    return await this.k8sService.podService.ListByNodeName(name)
  }

  @Get('/list/LabelSelector/:selector')
  async ListByLabelSelector(@Param('selector') selector: string) {
    return await this.k8sService.podService.ListByLabelSelector(selector)
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>): Promise<string> {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.podService.Delete(name, ns)
    })
    return 'ok'
  }

  @Get('/log/file/:ns/:podName/:containerName')
  GetContainerLogs(@Param('ns') ns: string,
                      @Param('podName') podName: string,
                      @Param('containerName') containerName: string): StreamableFile {
    const file = this.k8sService.podService.GetContainerLogs(ns, podName, containerName)
    return new StreamableFile(file)
  }
}
