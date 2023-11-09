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
import type { ResourceQuantity } from './resourceQuantity'

/**
 * Overhead structure represents the resource overhead associated with running a pod.
 */
export class IoK8sApiNodeV1Overhead {
  /**
   * podFixed represents the fixed resource overhead associated with running a pod.
   */
  podFixed?: { [key: string]: ResourceQuantity }
}
