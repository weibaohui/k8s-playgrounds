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
 * FlowDistinguisherMethod specifies the method of a flow distinguisher.
 */
export interface IoK8sApiFlowcontrolV1beta3FlowDistinguisherMethod {
  /**
     * `type` is the type of flow distinguisher method The supported types are \"ByUser\" and \"ByNamespace\". Required.
     */
  type: string
}