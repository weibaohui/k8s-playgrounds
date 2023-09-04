export enum ResType {
  Pod = 'Pod',
  Namespace = 'Namespace',
  Deployment = 'Deployment',
  Node = 'Node',
  ReplicaSet = 'ReplicaSet',
  Event = 'Event',
  DaemonSet = 'DaemonSet',
  StatefulSet = 'StatefulSet',
  ReplicationController = 'ReplicationController',
  Job = 'Job',
  CronJob = 'CronJob',
  ConfigMap = 'ConfigMap',
  Secret = 'Secret',
  PriorityClass = 'PriorityClass',
  ResourceQuota = 'ResourceQuota',
  LimitRange = 'LimitRange',
  HorizontalPodAutoscaler = 'HorizontalPodAutoscaler',
  PodDisruptionBudget = 'PodDisruptionBudget',
}
