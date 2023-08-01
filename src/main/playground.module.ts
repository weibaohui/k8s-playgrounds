import { EventsModule } from '@main/events/events.module'
import { WatchModule } from '@main/watch/watch.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [EventsModule, WatchModule],
})
export class PlaygroundModule {}
