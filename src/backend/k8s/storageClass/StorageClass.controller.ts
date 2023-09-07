import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/StorageClass')
export class StorageClassController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.storageClassService.List()
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const name = nsname[1]
      this.k8sService.storageClassService.Delete(name)
    })
    return {}
  }

  @Get('/name/:name')
  async GetOneByName(@Param('name') name: string) {
    return await this.k8sService.storageClassService.GetOneByName(name)
  }

  @Get('/SetUniqueDefault/name/:name')
  async SetUniqueDefault(@Param('name') name: string) {
    return await this.k8sService.storageClassService.SetUniqueDefault(name)
  }
}
