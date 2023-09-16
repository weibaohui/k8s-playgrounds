import { KubernetesObject } from '@kubernetes/client-node'
import {
  Body,
  Controller,
  Get, Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'
import YAML from 'yaml'

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

  @Post('/update')
  async Update(@Body() obj: Array<string>) {
    const data = obj.pop().replace('\\n', '\n')
    const ko = YAML.parse(data) as KubernetesObject
    return await this.k8sService.clientService.update(ko)
  }
}
