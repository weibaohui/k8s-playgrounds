import { K8sService } from '@main/k8s/k8s.service'
import {
  Controller,
  Get,
} from '@nestjs/common'

@Controller('k8s/ns')
export class NsController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async ns() {
    return await this.k8sService.nsService.getNsList()
  }
}
