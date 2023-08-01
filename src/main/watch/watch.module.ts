import { WatchController } from '@main/watch/watch.controller'
import { WatchEventService } from '@main/watch/watch.event.service'
import { WatchKubectlService } from '@main/watch/watch.kubectl.service'
import { WatchNodeService } from '@main/watch/watch.node.service'
import { WatchNsService } from '@main/watch/watch.ns.service'
import { WatchPodService } from '@main/watch/watch.pod.service'
import { WatchReplicasetController } from '@main/watch/watch.replicaset.controller'
import { WatchReplicasetService } from '@main/watch/watch.replicaset.service'
import { WatchService } from '@main/watch/watch.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  controllers: [WatchController, WatchReplicasetController],
  providers: [
    WatchService, WatchPodService, WatchNsService, WatchNodeService, WatchEventService, WatchKubectlService, WatchReplicasetService,
  ],
  exports: [WatchService],
})
export class WatchModule {}
