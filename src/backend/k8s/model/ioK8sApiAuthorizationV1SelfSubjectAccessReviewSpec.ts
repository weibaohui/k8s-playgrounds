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
import type { IoK8sApiAuthorizationV1NonResourceAttributes } from './ioK8sApiAuthorizationV1NonResourceAttributes'
import type { IoK8sApiAuthorizationV1ResourceAttributes } from './ioK8sApiAuthorizationV1ResourceAttributes'

/**
 * SelfSubjectAccessReviewSpec is a description of the access request.  Exactly one of ResourceAuthorizationAttributes and NonResourceAuthorizationAttributes must be set
 */
export class IoK8sApiAuthorizationV1SelfSubjectAccessReviewSpec {
  /**
   * NonResourceAttributes describes information for a non-resource access request
   */
  nonResourceAttributes?: IoK8sApiAuthorizationV1NonResourceAttributes
  /**
   * ResourceAuthorizationAttributes describes information for a resource access request
   */
  resourceAttributes?: IoK8sApiAuthorizationV1ResourceAttributes
}
