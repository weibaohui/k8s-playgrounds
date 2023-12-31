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
 * IP address information for entries in the (plural) PodIPs field. Each entry includes:   IP: An IP address allocated to the pod. Routable at least within the cluster.
 */
export class V1PodIP {
  /**
   * ip is an IP address (IPv4 or IPv6) assigned to the pod
   */
  ip?: string
}
