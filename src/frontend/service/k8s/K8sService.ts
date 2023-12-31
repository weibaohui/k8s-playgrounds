import { ResType } from '@backend/k8s/watch/watch.model'
import { Play } from '@frontend/generated'
import { BackEndUrl } from '@frontend/service/k8s/BackEndUrl'
import { WatchService } from '@frontend/service/k8s/WatchService'

export class K8sService {
  static watchService = new WatchService()
  static playService = new Play({ BASE: BackEndUrl.getUrl() }).default

  static async getResource({
    resType,
                                 ns,
                                 name,
  }: {
    resType: string
    ns: string
    name: string
  }) {
    switch (resType) {
      case ResType.ReplicaSet:
        return K8sService.playService.replicaSetControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Deployment:
        return K8sService.playService.deploymentControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Node:
        return K8sService.playService.nodeControllerGetOneByName({ name })
      case ResType.DaemonSet:
        return K8sService.playService.daemonSetControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.ReplicationController:
        return K8sService.playService.replicationControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.StatefulSet:
        return K8sService.playService.statefulSetControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Pod:
        return K8sService.playService.podControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Job:
        return K8sService.playService.jobControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.CronJob:
        return K8sService.playService.cronJobControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.ConfigMap:
        return K8sService.playService.configmapControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Secret:
        return K8sService.playService.secretControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.PriorityClass:
        return K8sService.playService.priorityClassControllerGetOneByName({
          name,
        })
      case ResType.Event:
        return K8sService.playService.eventControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.ResourceQuota:
        return K8sService.playService.resourceQuotaControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Namespace:
        return K8sService.playService.nsControllerGetOneByName({
          name,
        })
      case ResType.IngressClass:
        return K8sService.playService.ingressClassControllerGetOneByName({
          name,
        })
      case ResType.PersistentVolume:
        return K8sService.playService.persistentVolumeControllerGetOneByName({
          name,
        })
      case ResType.StorageClass:
        return K8sService.playService.storageClassControllerGetOneByName({
          name,
        })
      case ResType.ClusterRoleBinding:
        return K8sService.playService.clusterRoleBindingControllerGetOneByName({
          name,
        })
      case ResType.ClusterRole:
        return K8sService.playService.clusterRoleControllerGetOneByName({
          name,
        })
      case ResType.MutatingWebhookConfiguration:
        return K8sService.playService.mutatingWebhookControllerGetOneByName({
          name,
        })
      case ResType.ValidatingWebhookConfiguration:
        return K8sService.playService.validatingWebhookControllerGetOneByName({
          name,
        })
      case ResType.LimitRange:
        return K8sService.playService.limitRangeControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.HorizontalPodAutoscaler:
        return K8sService.playService.horizontalPodAutoscalerControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.PodDisruptionBudget:
        return K8sService.playService.podDisruptionBudgetControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Endpoint:
        return K8sService.playService.endpointControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.EndpointSlice:
        return K8sService.playService.endpointSliceControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Service:
        return K8sService.playService.networkSvcControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Ingress:
        return K8sService.playService.ingressControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.NetworkPolicy:
        return K8sService.playService.networkPolicyControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.PersistentVolumeClaim:
        return K8sService.playService.persistentVolumeClaimControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.Role:
        return K8sService.playService.roleControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.RoleBinding:
        return K8sService.playService.roleBindingControllerGetOneByNsName({
          ns,
          name,
        })
      case ResType.ServiceAccount:
        return K8sService.playService.serviceAccountControllerGetOneByNsName({
          ns,
          name,
        })
    }
  }
}
