import { EventsGateway } from '@main/events/events.gateway'
import { WatchModule } from '@main/watch/watch.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [WatchModule],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
