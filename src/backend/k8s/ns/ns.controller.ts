import {
  Body,
  Controller,
  Get, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/Namespace')
export class NsController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.nsService.List()
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const name = nsname[1]
      this.k8sService.nsService.Delete(name)
    })
    return {}
  }
}
