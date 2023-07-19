import { WatchPodService } from '@main/watch/watch.pod.service'
import { WatchService } from '@main/watch/watch.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  providers: [
    WatchService, WatchPodService,
  ],
  exports: [WatchService, WatchPodService],
})
export class WatchModule {}
