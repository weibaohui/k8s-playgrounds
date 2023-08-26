import {
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/node')
export class NodeController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.nodeService.List()
  }

  @Get('/:name')
  async GetOneByName(@Param('name') name: string) {
    return await this.k8sService.nodeService.GetOneByName(name)
  }

  @Post('/delete/:name')
  async Delete(@Param('name') name: string) {
    return await this.k8sService.nodeService.Delete(name)
  }

  @Get('/cordon/:name')
  async Cordon(@Param('name') name: string) {
    return await this.k8sService.nodeService.Cordon(name)
  }

  @Get('/unCordon/:name')
  async UnCordon(@Param('name') name: string) {
    return await this.k8sService.nodeService.UnCordon(name)
  }
}
