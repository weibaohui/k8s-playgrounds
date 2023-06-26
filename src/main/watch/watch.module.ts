import { EventsModule } from '@main/events/events.module'
import { WatchService } from '@main/watch/watch.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [EventsModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    WatchService,
  ],
  exports: [WatchService],
})
export class WatchModule {}
