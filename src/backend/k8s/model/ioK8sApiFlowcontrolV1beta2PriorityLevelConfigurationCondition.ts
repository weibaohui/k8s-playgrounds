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
import type { V1Time } from './V1Time'

/**
 * PriorityLevelConfigurationCondition defines the condition of priority level.
 */
export class IoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationCondition {
  /**
   * `lastTransitionTime` is the last time the condition transitioned from one status to another.
   */
  lastTransitionTime?: V1Time
  /**
   * `message` is a human-readable message indicating details about last transition.
   */
  message?: string
  /**
   * `reason` is a unique, one-word, CamelCase reason for the condition's last transition.
   */
  reason?: string
  /**
   * `status` is the status of the condition. Can be True, False, Unknown. Required.
   */
  status?: string
  /**
   * `type` is the type of the condition. Required.
   */
  type?: string
}
