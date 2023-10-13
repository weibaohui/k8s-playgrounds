import {
  Body,
  Controller,
  Get,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/EndpointSlice')
export class EndpointSliceController {
  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.endpointSliceService.List()
  }

  @Get('/ns/:ns')
  async ListByNs(@Param('ns') ns: string) {
    return await this.k8sService.endpointSliceService.List(ns)
  }

  @Get('/list/ns/:ns/name/:name')
  async ListByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.endpointSliceService.ListByNsName(ns, name)
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.endpointSliceService.Delete(name, ns)
    })
    return {}
  }

  @Get('/ns/:ns/name/:name')
  async GetOneByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.endpointSliceService.GetOneByNsName(ns, name)
  }
}
