import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/Event')
export class EventController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list/:ns')
  async ListByNs(@Param('ns') ns: string) {
    return await this.k8sService.eventService.List(ns)
  }

  @Get('/list/warning/:ns')
  async ListWarningEventByNs(@Param('ns') ns: string) {
    const fieldSelector = 'type=Warning'
    return await this.k8sService.eventService.List(ns, fieldSelector)
  }

  @Get('/ns/:ns/name/:name')
  async GetOneByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.eventService.GetOneByNsName(ns, name)
  }

  @Get('/list/ns/:ns/name/:name')
  async ListInvolvedEventByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    const fieldSelector = `involvedObject.name=${name},involvedObject.namespace=${ns}`
    return await this.k8sService.eventService.List(ns, fieldSelector)
  }

  @Get('/list/warning/ns/:ns/name/:name')
  async ListInvolvedWarningEventByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    const fieldSelector = `type=Warning,involvedObject.name=${name},involvedObject.namespace=${ns}`
    return await this.k8sService.eventService.List(ns, fieldSelector)
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.eventService.deleteEvent(ns, name)
    })
    return {}
  }
}
