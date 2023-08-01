import { EventHubGateway } from '@main/eventHub/eventHub.gateway'
import { K8sModule } from '@main/k8s/k8s.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [K8sModule],
  providers: [EventHubGateway],
})
export class EventHubModule {}
