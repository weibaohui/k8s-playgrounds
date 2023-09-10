import {
  Controller,
  Get, Param,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/Client')
export class ClientController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return this.k8sService.clientService.getKubeConfig().clusters
  }

  @Get('/CurrentCluster')
  async CurrentContext() {
    return this.k8sService.clientService.getCurrentContext()
  }

  @Get('/SetContext/:name')
  async SetContext(@Param('name') name: string) {
    return this.k8sService.clientService.setContext(name)
  }
}
