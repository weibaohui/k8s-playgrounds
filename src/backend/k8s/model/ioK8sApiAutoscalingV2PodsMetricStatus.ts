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
import type { V2MetricIdentifier } from './v2MetricIdentifier'
import type { V2MetricValueStatus } from './v2MetricValueStatus'

/**
 * PodsMetricStatus indicates the current value of a metric describing each pod in the current scale target (for example, transactions-processed-per-second).
 */
export class IoK8sApiAutoscalingV2PodsMetricStatus {
  /**
   * current contains the current value for the given metric
   */
  current: V2MetricValueStatus
  /**
   * metric identifies the target metric by name and selector
   */
  metric: V2MetricIdentifier
}
