import { K8sService } from '@backend/k8s/k8s.service'
import {
  Body,
  Controller,
  Get, Param, Post,
} from '@nestjs/common'

@Controller('k8s/shell')
export class ShellController {
  constructor(
    private k8sService: K8sService,
  ) {
  }

  @Get('/list')
  async List() {
    return this.k8sService.shellService.list()
  }

  @Post('/kill')
  async Kill(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.shellService.Kill(ns, name)
    })
    return {}
  }

  @Post('/ns/:ns/pod/:podName/localPort/:localPort/podPort/:podPort')
  async ForwardPod(@Param('ns') ns: string, @Param('localPort') localPort: number, @Param('podPort') podPort: string, @Param('podName') podName: string) {
    await this.k8sService.shellService.forwardPod(localPort, podName, podPort, ns)
  }

  @Post('/ns/:ns/deploy/:deployName/localPort/:localPort/deployPort/:deployPort')
  async ForwardDeployment(@Param('ns') ns: string, @Param('localPort') localPort: number, @Param('deployPort') deployPort: string, @Param('deployName') deployName: string) {
    await this.k8sService.shellService.forwardDeployment(localPort, deployName, deployPort, ns)
  }

  @Post('/ns/:ns/svc/:svcName/localPort/:localPort/svcPort/:svcPort')
  async ForwardService(@Param('ns') ns: string, @Param('localPort') localPort: number, @Param('svcPort') svcPort: string, @Param('svcName') svcName: string) {
    await this.k8sService.shellService.forwardSvc(localPort, svcName, svcPort, ns)
  }
}
