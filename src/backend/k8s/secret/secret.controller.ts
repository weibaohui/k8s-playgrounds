import { JsonDataWrap } from '@backend/model/JsonDataWrap'
import {
  Body,
  Controller,
  Get, Logger,
  Param, Post,
} from '@nestjs/common'
import { K8sService } from '@backend/k8s/k8s.service'

@Controller('k8s/Secret')
export class SecretController {
  private readonly logger = new Logger(SecretController.name)

  constructor(
    private k8sService: K8sService,
  ) {}

  @Get('/list')
  async List() {
    return await this.k8sService.secretService.List()
  }

  @Get('/list/ns/:ns')
  async ListByNs(@Param('ns') ns: string) {
    return await this.k8sService.secretService.List(ns)
  }

  @Post('/delete')
  async Delete(@Body() nsn: Array<string>) {
    nsn.forEach((r) => {
      const nsname = r.split('/')
      const ns = nsname[0]
      const name = nsname[1]
      this.k8sService.secretService.Delete(ns, name)
    })
    return {}
  }

  @Post('/update/ns/:ns/name/:name/key/:key')
  async Update(@Body() data: JsonDataWrap<string>, @Param('ns') ns: string, @Param('name') name: string, @Param('key') key: string) {
    return await this.k8sService.secretService.Update(ns, name, key, data)
  }

  @Get('/ns/:ns/name/:name')
  async GetOneByNsName(@Param('ns') ns: string, @Param('name') name: string) {
    return await this.k8sService.secretService.GetOneByNsName(ns, name)
  }
}
