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
 * NodeAddress contains information for the node's address.
 */
export class V1NodeAddress {
  /**
   * The node address.
   */
  address: string
  /**
   * Node address type, one of Hostname, ExternalIP or InternalIP.
   */
  type: string
}
