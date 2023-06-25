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
import type { IoK8sApiBatchV1PodFailurePolicyOnExitCodesRequirement } from './ioK8sApiBatchV1PodFailurePolicyOnExitCodesRequirement'
import type { IoK8sApiBatchV1PodFailurePolicyOnPodConditionsPattern } from './ioK8sApiBatchV1PodFailurePolicyOnPodConditionsPattern'

/**
 * PodFailurePolicyRule describes how a pod failure is handled when the requirements are met. One of onExitCodes and onPodConditions, but not both, can be used in each rule.
 */
export interface IoK8sApiBatchV1PodFailurePolicyRule {
  /**
     * Specifies the action taken on a pod failure when the requirements are satisfied. Possible values are:  - FailJob: indicates that the pod's job is marked as Failed and all   running pods are terminated. - Ignore: indicates that the counter towards the .backoffLimit is not   incremented and a replacement pod is created. - Count: indicates that the pod is handled in the default way - the   counter towards the .backoffLimit is incremented. Additional values are considered to be added in the future. Clients should react to an unknown action by skipping the rule.
     */
  action: string
  /**
     * Represents the requirement on the container exit codes.
     */
  onExitCodes?: IoK8sApiBatchV1PodFailurePolicyOnExitCodesRequirement
  /**
     * Represents the requirement on the pod conditions. The requirement is represented as a list of pod condition patterns. The requirement is satisfied if at least one pattern matches an actual pod condition. At most 20 elements are allowed.
     */
  onPodConditions: Array<IoK8sApiBatchV1PodFailurePolicyOnPodConditionsPattern>
}