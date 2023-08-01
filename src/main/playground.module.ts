import { EventHubModule } from '@main/eventHub/eventHub.module'
import { K8sModule } from '@main/k8s/k8s.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [EventHubModule, K8sModule],
})
export class PlaygroundModule {}
