import {
  Body,
  Controller,
  Get, Logger,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/PriorityClass')
export class PriorityClassController {
  private readonly logger = new Logger(PriorityClassController.name)

  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.priorityClassService.List()
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const name = nsname[1]
      this.k8sService.priorityClassService.Delete(name)
    })
    return {}
  }

  @Get('/name/:name')
  async GetOneByName(@Param('name') name: string) {
    return await this.k8sService.priorityClassService.GetOneByName(name)
  }

  @Get('/SetUniqueDefault/name/:name')
  async SetUniqueDefault(@Param('name') name: string) {
    return await this.k8sService.priorityClassService.SetUniqueDefault(name)
  }
}
