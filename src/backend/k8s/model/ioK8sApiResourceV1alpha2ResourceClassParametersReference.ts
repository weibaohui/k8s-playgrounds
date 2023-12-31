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
 * ResourceClassParametersReference contains enough information to let you locate the parameters for a ResourceClass.
 */
export class IoK8sApiResourceV1alpha2ResourceClassParametersReference {
  /**
   * APIGroup is the group for the resource being referenced. It is empty for the core API. This matches the group in the APIVersion that is used when creating the resources.
   */
  apiGroup?: string
  /**
   * Kind is the type of resource being referenced. This is the same value as in the parameter object's metadata.
   */
  kind: string
  /**
   * Name is the name of resource being referenced.
   */
  name: string
  /**
   * Namespace that contains the referenced resource. Must be empty for cluster-scoped resources and non-empty for namespaced resources.
   */
  namespace?: string
}
