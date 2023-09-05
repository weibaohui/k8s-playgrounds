/**
 * Kubernetes
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: unversioned
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import type { IoK8sApiAutoscalingV2ContainerResourceMetricStatus } from './ioK8sApiAutoscalingV2ContainerResourceMetricStatus'
import type { V2ExternalMetricStatus } from './v2ExternalMetricStatus'
import type { IoK8sApiAutoscalingV2ObjectMetricStatus } from './ioK8sApiAutoscalingV2ObjectMetricStatus'
import type { IoK8sApiAutoscalingV2PodsMetricStatus } from './ioK8sApiAutoscalingV2PodsMetricStatus'
import type { IoK8sApiAutoscalingV2ResourceMetricStatus } from './ioK8sApiAutoscalingV2ResourceMetricStatus'

/**
 * MetricStatus describes the last-read state of a single metric.
 */
export interface V2MetricStatus {
  /**
     * container resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing a single container in each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the \"pods\" source.
     */
  containerResource?: IoK8sApiAutoscalingV2ContainerResourceMetricStatus
  /**
     * external refers to a global metric that is not associated with any Kubernetes object. It allows autoscaling based on information coming from components running outside of cluster (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).
     */
  external?: V2ExternalMetricStatus
  /**
     * object refers to a metric describing a single kubernetes object (for example, hits-per-second on an Ingress object).
     */
  object?: IoK8sApiAutoscalingV2ObjectMetricStatus
  /**
     * pods refers to a metric describing each pod in the current scale target (for example, transactions-processed-per-second).  The values will be averaged together before being compared to the target value.
     */
  pods?: IoK8sApiAutoscalingV2PodsMetricStatus
  /**
     * resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the \"pods\" source.
     */
  resource?: IoK8sApiAutoscalingV2ResourceMetricStatus
  /**
     * type is the type of metric source.  It will be one of \"ContainerResource\", \"External\", \"Object\", \"Pods\" or \"Resource\", each corresponds to a matching field in the object. Note: \"ContainerResource\" type is available on when the feature-gate HPAContainerMetrics is enabled
     */
  type: string
}