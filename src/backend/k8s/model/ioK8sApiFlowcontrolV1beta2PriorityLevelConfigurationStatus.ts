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
import type { IoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationCondition } from './ioK8sApiFlowcontrolV1beta2PriorityLevelConfigurationCondition'

/**
 * PriorityLevelConfigurationStatus represents the current state of a \"request-priority\".
 */
export class IoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationStatus {
  /**
   * `conditions` is the current state of \"request-priority\".
   */
  conditions?: Array<IoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationCondition>
}
