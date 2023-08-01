import { K8sService } from '@main/k8s/k8s.service'
import {
  Controller, Delete,
  Get,
  Param,
} from '@nestjs/common'

@Controller('k8s/node')
export class NodeController {
  constructor(
    private watchService: K8sService,
  ) {}

  @Get('/list')
  async getNodes() {
    return await this.watchService.nodeService.getNodes()
  }

  @Get('/:name')
  async getNode(@Param('name') name) {
    return await this.watchService.nodeService.getNode(name)
  }

  @Delete ('/:name')
  async deleteNode(@Param('name') name) {
    return await this.watchService.nodeService.deleteNode(name)
  }

  @Get('/cordon/:name')
  async cordonNode(@Param('name') name) {
    return await this.watchService.nodeService.cordonNode(name)
  }

  @Get('/unCordon/:name')
  async unCordonNode(@Param('name') name) {
    return await this.watchService.nodeService.unCordonNode(name)
  }
}
