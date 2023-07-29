import { WatchEventService } from '@main/watch/watch.event.service'
import { WatchKubectlService } from '@main/watch/watch.kubectl.service'
import { WatchNodeService } from '@main/watch/watch.node.service'
import { WatchNsService } from '@main/watch/watch.ns.service'
import { WatchPodService } from '@main/watch/watch.pod.service'
import { WatchService } from '@main/watch/watch.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  providers: [
    WatchService, WatchPodService, WatchNsService, WatchNodeService, WatchEventService, WatchKubectlService,
  ],
  exports: [WatchService, WatchPodService],
})
export class WatchModule {}
