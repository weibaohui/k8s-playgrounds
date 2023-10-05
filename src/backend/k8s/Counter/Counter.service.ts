import { ResType } from '@backend/k8s/watch/watch.model'
import { WatchService } from '@backend/k8s/watch/watch.service'
import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class CounterService {
  private readonly logger = new Logger(CounterService.name)
  private counter: Map<string, number> = new Map<string, number>()
  private counterLine: Map<string, Array<number>> = new Map<string, Array<number>>()
  constructor(
    public clientService: ClientService,
    public watchService: WatchService,
  ) {
    this.startCounter()
  }

  private startCounter() {
    for (const key in ResType) {
      const k = ResType[key]
      this.watchService.watch(k, (d) => {
        const v = this.counter.get(k) ? this.counter.get(k) : 0
        switch (d.type) {
          case 'ADDED':
            this.counter.set(k, v + 1)
            break
          case 'DELETED':
            this.counter.set(k, v - 1)
            break
        }
      })
    }
  }

  @Cron(CronExpression.EVERY_SECOND)
  printCounter() {
    this.counterLine.forEach((v, k) => {
      this.logger.debug(`${k}=${v}`)
    })
  }

  @Cron(CronExpression.EVERY_SECOND)
  captureCounter() {
    this.counter.forEach((v, k) => {
      const array = this.counterLine.get(k) ? this.counterLine.get(k) : []
      array.push(v)
      if (array.length > 10)
        array.shift()

      this.counterLine.set(k, array)
    })
  }
}
