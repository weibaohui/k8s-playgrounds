import {
  Body,
  Controller,
  Get, Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/MutatingWebhook')
export class MutatingWebhookController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.mutatingWebhookService.List()
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const name = nsname[1]
      this.k8sService.mutatingWebhookService.Delete(name)
    })
    return {}
  }

  @Get('/:name')
  async GetOneByName(@Param('name') name: string) {
    return await this.k8sService.mutatingWebhookService.GetOneByName(name)
  }
}
