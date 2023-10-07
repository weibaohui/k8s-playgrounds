import { CounterService } from '@backend/k8s/Counter/counter.service'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('k8s/Counter')
export class CounterController {
  constructor(
    private readonly counterService: CounterService,
  ) { }

  @Get('/counter/')
  async ListAllCounter() {
    const counter = this.counterService.getAllCounter()
    return Object.fromEntries(counter)
  }

  @Get('/counterLine/')
  async ListAllCounterLine() {
    const counter = this.counterService.getAllCounterLine()
    return Object.fromEntries(counter)
  }

  @Get('/counter/:key')
  async ListCounterByKey(@Param('key') key: string) {
    return this.counterService.getCounterByKey(key)
  }

  @Get('/counterLine/:key')
  async ListCounterLineByKey(@Param('key') key: string) {
    return this.counterService.getCounterLineByKey(key)
  }
}
