import { EventController } from '@main/k8s/event/event.controller'
import { EventService } from '@main/k8s/event/event.service'
import { ClientService } from '@main/k8s/client/client.service'
import { NodeController } from '@main/k8s/node/node.controller'
import { NodeService } from '@main/k8s/node/node.service'
import { NsController } from '@main/k8s/ns/ns.controller'
import { NsService } from '@main/k8s/ns/ns.service'
import { PodController } from '@main/k8s/pod/pod.controller'
import { PodService } from '@main/k8s/pod/pod.service'
import { ReplicasetController } from '@main/k8s/replicaset/replicaset.controller'
import { ReplicasetService } from '@main/k8s/replicaset/replicaset.service'
import { K8sService } from '@main/k8s/k8s.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  controllers: [EventController, NodeController, NsController, PodController, ReplicasetController],
  providers: [
    K8sService, PodService, NsService, NodeService, EventService, ClientService, ReplicasetService,
  ],
  exports: [K8sService],
})
export class K8sModule {}
