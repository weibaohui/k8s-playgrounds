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
import type { IoK8sApiFlowcontrolV1beta2GroupSubject } from './ioK8sApiFlowcontrolV1beta2GroupSubject'
import type { IoK8sApiFlowcontrolV1beta2ServiceAccountSubject } from './ioK8sApiFlowcontrolV1beta2ServiceAccountSubject'
import type { IoK8sApiFlowcontrolV1beta2UserSubject } from './ioK8sApiFlowcontrolV1beta2UserSubject'

/**
 * Subject matches the originator of a request, as identified by the request authentication system. There are three ways of matching an originator; by user, group, or service account.
 */
export class IoK8sApiFlowcontrolV1beta2Subject {
  /**
   * `group` matches based on user group name.
   */
  group?: IoK8sApiFlowcontrolV1beta2GroupSubject
  /**
   * `kind` indicates which one of the other fields is non-empty. Required
   */
  kind: string
  /**
   * `serviceAccount` matches ServiceAccounts.
   */
  serviceAccount?: IoK8sApiFlowcontrolV1beta2ServiceAccountSubject
  /**
   * `user` matches based on username.
   */
  user?: IoK8sApiFlowcontrolV1beta2UserSubject
}
