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
import type { V2MetricValueStatus } from './v2MetricValueStatus'

/**
 * ResourceMetricStatus indicates the current value of a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the \"pods\" source.
 */
export class IoK8sApiAutoscalingV2ResourceMetricStatus {
  /**
   * current contains the current value for the given metric
   */
  current: V2MetricValueStatus
  /**
   * name is the name of the resource in question.
   */
  name: string
}
