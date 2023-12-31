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
 * current status of a horizontal pod autoscaler
 */
export class IoK8sApiAutoscalingV1HorizontalPodAutoscalerStatus {
  /**
   * currentCPUUtilizationPercentage is the current average CPU utilization over all pods, represented as a percentage of requested CPU, e.g. 70 means that an average pod is using now 70% of its requested CPU.
   */
  currentCPUUtilizationPercentage?: number
  /**
   * currentReplicas is the current number of replicas of pods managed by this autoscaler.
   */
  currentReplicas: number
  /**
   * desiredReplicas is the  desired number of replicas of pods managed by this autoscaler.
   */
  desiredReplicas: number
  /**
   * lastScaleTime is the last time the HorizontalPodAutoscaler scaled the number of pods; used by the autoscaler to control how often the number of pods is changed.
   */
  lastScaleTime?: V1Time
  /**
   * observedGeneration is the most recent generation observed by this autoscaler.
   */
  observedGeneration?: number
}
