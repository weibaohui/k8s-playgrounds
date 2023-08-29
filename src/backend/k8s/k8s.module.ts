import { ConfigmapController } from '@backend/k8s/configmap/configmap.controller'
import { ConfigMapService } from '@backend/k8s/configmap/configmap.service'
import { CronJobController } from '@backend/k8s/cronjob/cronjob.controller'
import { CronJobService } from '@backend/k8s/cronjob/cronjob.service'
import { DaemonSetController } from '@backend/k8s/daemonset/daemonset.controller'
import { DaemonSetService } from '@backend/k8s/daemonset/daemonset.service'
import { DeploymentController } from '@backend/k8s/deployment/deployment.controller'
import { DeploymentService } from '@backend/k8s/deployment/deployment.service'
import { JobController } from '@backend/k8s/job/job.controller'
import { JobService } from '@backend/k8s/job/job.service'
import { ReplicaSetService } from '@backend/k8s/replicaset/replicaset.service'
import { ReplicationController } from '@backend/k8s/replicationController/replication.controller'
import { ReplicationControllerService } from '@backend/k8s/replicationController/replication.service'
import { StatefulSetController } from '@backend/k8s/statefulset/statefulset.controller'
import { StatefulSetService } from '@backend/k8s/statefulset/statefulset.service'
import { WatchService } from '@backend/k8s/watch/watch.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { K8sService } from '@backend/k8s/k8s.service'
import { EventController } from '@backend/k8s/event/event.controller'
import { EventService } from '@backend/k8s/event/event.service'
import { ClientService } from '@backend/k8s/client/client.service'
import { NodeController } from '@backend/k8s/node/node.controller'
import { NodeService } from '@backend/k8s/node/node.service'
import { NsController } from '@backend/k8s/ns/ns.controller'
import { NsService } from '@backend/k8s/ns/ns.service'
import { PodController } from '@backend/k8s/pod/pod.controller'
import { PodService } from '@backend/k8s/pod/pod.service'
import { ReplicaSetController } from '@backend/k8s/replicaset/replicaset.controller'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  controllers: [
    EventController, NodeController, NsController,
    PodController, ReplicaSetController, DeploymentController,
    DaemonSetController, ReplicationController, StatefulSetController,
    JobController, CronJobController, ConfigmapController,

  ],
  providers: [
    K8sService, PodService, NsService,
    NodeService, EventService, ClientService,
    ReplicaSetService, WatchService,
    DeploymentService, DaemonSetService,
    ReplicationControllerService, StatefulSetService,
    JobService, CronJobService, ConfigMapService,
  ],
  exports: [K8sService],
})
export class K8sModule {}
