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
 * Describes the state of the storageVersion at a certain point.
 */
export class IoK8sApiApiserverinternalV1alpha1StorageVersionCondition {
  /**
   * Last time the condition transitioned from one status to another.
   */
  lastTransitionTime?: V1Time
  /**
   * A human readable message indicating details about the transition.
   */
  message?: string
  /**
   * If set, this represents the .metadata.generation that the condition was set based upon.
   */
  observedGeneration?: number
  /**
   * The reason for the condition's last transition.
   */
  reason: string
  /**
   * Status of the condition, one of True, False, Unknown.
   */
  status: string
  /**
   * Type of the condition.
   */
  type: string
}
