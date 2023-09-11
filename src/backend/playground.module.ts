import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { EventHubModule } from './eventHub/eventHub.module'
import { K8sModule } from './k8s/k8s.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    EventHubModule, K8sModule],
})
export class PlaygroundModule {}
