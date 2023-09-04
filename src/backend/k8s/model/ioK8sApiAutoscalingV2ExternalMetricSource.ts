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
import type { IoK8sApiAutoscalingV2MetricIdentifier } from './ioK8sApiAutoscalingV2MetricIdentifier'
import type { V2MetricTarget } from './v2MetricTarget'

/**
 * ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).
 */
export interface IoK8sApiAutoscalingV2ExternalMetricSource {
  /**
     * metric identifies the target metric by name and selector
     */
  metric: IoK8sApiAutoscalingV2MetricIdentifier
  /**
     * target specifies the target value for the given metric
     */
  target: V2MetricTarget
}
