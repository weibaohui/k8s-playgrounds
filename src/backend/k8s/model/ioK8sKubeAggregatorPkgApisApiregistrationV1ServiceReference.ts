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
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export class IoK8sKubeAggregatorPkgApisApiregistrationV1ServiceReference {
  /**
   * Name is the name of the service
   */
  name?: string
  /**
   * Namespace is the namespace of the service
   */
  namespace?: string
  /**
   * If specified, the port on the service that hosting webhook. Default to 443 for backward compatibility. `port` should be a valid port number (1-65535, inclusive).
   */
  port?: number
}
