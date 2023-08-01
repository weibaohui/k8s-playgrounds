import { K8sService } from '@main/k8s/k8s.service'
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common'

@Controller('k8s/event')
export class EventController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/:ns')
  async eventsByNs(@Param('ns') ns) {
    return await this.k8sService.eventService.events(ns)
  }
}
