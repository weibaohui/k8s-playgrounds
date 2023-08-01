import { K8sService } from '@main/k8s/k8s.service'
import {
  Controller,
  Get,
} from '@nestjs/common'

@Controller('k8s/ns')
export class NsController {
  constructor(
    private watchService: K8sService,
  ) {}

  @Get('/list')
  async ns() {
    return await this.watchService.nsService.k8sNs()
  }
}
