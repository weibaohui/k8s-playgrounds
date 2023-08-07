import { Module } from '@nestjs/common'
import { EventHubModule } from './eventHub/eventHub.module'
import { K8sModule } from './k8s/k8s.module'

@Module({
  imports: [EventHubModule, K8sModule],
})
export class PlaygroundModule {}
