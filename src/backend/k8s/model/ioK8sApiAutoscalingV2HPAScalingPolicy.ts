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

/**
 * HPAScalingPolicy is a single policy which must hold true for a specified past interval.
 */
export class IoK8sApiAutoscalingV2HPAScalingPolicy {
  /**
   * periodSeconds specifies the window of time for which the policy should hold true. PeriodSeconds must be greater than zero and less than or equal to 1800 (30 min).
   */
  periodSeconds: number
  /**
   * type is used to specify the scaling policy.
   */
  type: string
  /**
   * value contains the amount of change which is permitted by the policy. It must be greater than zero
   */
  value: number
}
