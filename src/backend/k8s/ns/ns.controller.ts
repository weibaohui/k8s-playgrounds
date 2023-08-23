import {
  Body,
  Controller,
  Get, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/ns')
export class NsController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async getNamespaceList() {
    return await this.k8sService.nsService.getNsList()
  }

  @Post('/delete')
  async deleteNs(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const name = nsname[1]
      this.k8sService.nsService.deleteNs(name)
    })
    return {}
  }
}
