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
 * ReplicationControllerCondition describes the state of a replication controller at a certain point.
 */
export class V1ReplicationControllerCondition {
  /**
   * The last time the condition transitioned from one status to another.
   */
  lastTransitionTime?: V1Time
  /**
   * A human readable message indicating details about the transition.
   */
  message?: string
  /**
   * The reason for the condition's last transition.
   */
  reason?: string
  /**
   * Status of the condition, one of True, False, Unknown.
   */
  status: string
  /**
   * Type of replication controller condition.
   */
  type: string
}
