import {
  Controller, Delete,
  Get,
  Param,
} from '@nestjs/common'
import { K8sService } from '../../k8s/k8s.service'

@Controller('k8s/node')
export class NodeController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async getNodes() {
    return await this.k8sService.nodeService.getNodes()
  }

  @Get('/:name')
  async getNode(@Param('name') name) {
    return await this.k8sService.nodeService.getNode(name)
  }

  @Delete ('/:name')
  async deleteNode(@Param('name') name) {
    return await this.k8sService.nodeService.deleteNode(name)
  }

  @Get('/cordon/:name')
  async cordonNode(@Param('name') name) {
    return await this.k8sService.nodeService.cordonNode(name)
  }

  @Get('/unCordon/:name')
  async unCordonNode(@Param('name') name) {
    return await this.k8sService.nodeService.unCordonNode(name)
  }
}