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
  async list() {
    return await this.k8sService.deploymentService.getDeployments()
  }

  @Get('/:ns')
  async listByNs(@Param('ns') ns) {
    return await this.k8sService.deploymentService.getDeployments(ns)
  }

  @Post('/delete')
  async delReplicaSet(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.deploymentService.deleteDeployments(ns, name)
    })
    return {}
  }

  @Get('/restart/:ns/:name')
  async restartDeployment(@Param('ns') ns, @Param('name') name) {
    return await this.k8sService.deploymentService.restartDeployment(ns, name)
  }
}
