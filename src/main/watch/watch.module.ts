import { WatchPodService } from '@main/watch/watch.pod.service'
import { WatchService } from '@main/watch/watch.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    WatchService, WatchPodService,
  ],
  exports: [WatchService, WatchPodService],
})
export class WatchModule {}
