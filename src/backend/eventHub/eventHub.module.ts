import { Module } from '@nestjs/common'
import { K8sModule } from '@backend/k8s/k8s.module'
import { EventHubGateway } from '@backend/eventHub/eventHub.gateway'

@Module({
  imports: [K8sModule],
  providers: [EventHubGateway],
})
export class EventHubModule {}
