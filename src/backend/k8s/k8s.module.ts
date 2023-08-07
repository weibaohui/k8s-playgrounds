import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { EventController } from '../k8s/event/event.controller'
import { EventService } from '../k8s/event/event.service'
import { ClientService } from '../k8s/client/client.service'
import { NodeController } from '../k8s/node/node.controller'
import { NodeService } from '../k8s/node/node.service'
import { NsController } from '../k8s/ns/ns.controller'
import { NsService } from '../k8s/ns/ns.service'
import { PodController } from '../k8s/pod/pod.controller'
import { PodService } from '../k8s/pod/pod.service'
import { ReplicasetController } from '../k8s/replicaset/replicaset.controller'
import { ReplicasetService } from '../k8s/replicaset/replicaset.service'
import { K8sService } from '../k8s/k8s.service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  controllers: [EventController, NodeController, NsController, PodController, ReplicasetController],
  providers: [
    K8sService, PodService, NsService, NodeService, EventService, ClientService, ReplicasetService,
  ],
  exports: [K8sService],
})
export class K8sModule {}
