import { LoggerMiddleware } from '@main/common/logger.middleware'
import { EventsModule } from '@main/events/events.module'
import { WatchModule } from '@main/watch/watch.module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from '../common/http-exception.filter'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Module({
  imports: [EventsModule, CatsModule, WatchModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController)
  }
}
