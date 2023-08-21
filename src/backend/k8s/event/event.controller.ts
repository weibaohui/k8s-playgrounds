import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/event')
export class EventController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/:ns')
  async eventsByNs(@Param('ns') ns) {
    return await this.k8sService.eventService.events(ns)
  }

  @Get('/:ns/:selector')
  async eventsByNsSelector(@Param('ns') ns, @Param('selector') selector) {
    return await this.k8sService.eventService.events(ns, selector)
  }

  @Post('/delete')
  async deleteEvents(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.eventService.deleteEvent(ns, name)
    })
    return {}
  }
}
