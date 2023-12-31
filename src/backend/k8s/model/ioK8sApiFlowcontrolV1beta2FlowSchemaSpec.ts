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
import type { IoK8sApiFlowcontrolV1beta2FlowDistinguisherMethod } from './ioK8sApiFlowcontrolV1beta2FlowDistinguisherMethod'
import type { IoK8sApiFlowcontrolV1beta2PolicyRulesWithSubjects } from './ioK8sApiFlowcontrolV1beta2PolicyRulesWithSubjects'
import type { IoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationReference } from './ioK8sApiFlowcontrolV1beta2PriorityLevelConfigurationReference'

/**
 * FlowSchemaSpec describes how the FlowSchema's specification looks like.
 */
export class IoK8sApiFlowcontrolV1beta2FlowSchemaSpec {
  /**
   * `distinguisherMethod` defines how to compute the flow distinguisher for requests that match this schema. `nil` specifies that the distinguisher is disabled and thus will always be the empty string.
   */
  distinguisherMethod?: IoK8sApiFlowcontrolV1beta2FlowDistinguisherMethod
  /**
   * `matchingPrecedence` is used to choose among the FlowSchemas that match a given request. The chosen FlowSchema is among those with the numerically lowest (which we take to be logically highest) MatchingPrecedence.  Each MatchingPrecedence value must be ranged in [1,10000]. Note that if the precedence is not specified, it will be set to 1000 as default.
   */
  matchingPrecedence?: number
  /**
   * `priorityLevelConfiguration` should reference a PriorityLevelConfiguration in the cluster. If the reference cannot be resolved, the FlowSchema will be ignored and marked as invalid in its status. Required.
   */
  priorityLevelConfiguration: IoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationReference
  /**
   * `rules` describes which requests will match this flow schema. This FlowSchema matches a request if and only if at least one member of rules matches the request. if it is an empty slice, there will be no requests matching the FlowSchema.
   */
  rules?: Array<IoK8sApiFlowcontrolV1beta2PolicyRulesWithSubjects>
}
