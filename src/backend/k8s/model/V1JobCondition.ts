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
 * JobCondition describes current state of a job.
 */
export class V1JobCondition {
  /**
   * Last time the condition was checked.
   */
  lastProbeTime?: V1Time
  /**
   * Last time the condition transit from one status to another.
   */
  lastTransitionTime?: V1Time
  /**
   * Human readable message indicating details about last transition.
   */
  message?: string
  /**
   * (brief) reason for the condition's last transition.
   */
  reason?: string
  /**
   * Status of the condition, one of True, False, Unknown.
   */
  status: string
  /**
   * Type of job condition, Complete or Failed.
   */
  type: string
}
