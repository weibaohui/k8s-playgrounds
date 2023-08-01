import { EventHubGateway } from '@main/eventHub/eventHub.gateway'
import { WatchModule } from '@main/k8s/watch/watch.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [WatchModule],
  providers: [EventHubGateway],
})
export class EventHubModule {}
