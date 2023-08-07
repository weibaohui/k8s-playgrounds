import { Module } from '@nestjs/common'
import { EventHubGateway } from '../eventHub/eventHub.gateway'
import { K8sModule } from '../k8s/k8s.module'

@Module({
  imports: [K8sModule],
  providers: [EventHubGateway],
})
export class EventHubModule {}
