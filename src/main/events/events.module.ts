import { EventsGateway } from '@main/events/events.gateway'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
