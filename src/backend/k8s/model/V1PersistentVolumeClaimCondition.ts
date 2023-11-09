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
 * PersistentVolumeClaimCondition contains details about state of pvc
 */
export class V1PersistentVolumeClaimCondition {
  /**
   * lastProbeTime is the time we probed the condition.
   */
  lastProbeTime?: V1Time
  /**
   * lastTransitionTime is the time the condition transitioned from one status to another.
   */
  lastTransitionTime?: V1Time
  /**
   * message is the human-readable message indicating details about last transition.
   */
  message?: string
  /**
   * reason is a unique, this should be a short, machine understandable string that gives the reason for condition's last transition. If it reports \"ResizeStarted\" that means the underlying persistent volume is being resized.
   */
  reason?: string
  status: string
  type: string
}
