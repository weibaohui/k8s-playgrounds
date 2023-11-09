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
import type { V1IngressPortStatus } from './V1IngressPortStatus'

/**
 * IngressLoadBalancerIngress represents the status of a load-balancer ingress point.
 */
export class IoK8sApiNetworkingV1IngressLoadBalancerIngress {
  /**
   * hostname is set for load-balancer ingress points that are DNS based.
   */
  hostname?: string
  /**
   * ip is set for load-balancer ingress points that are IP based.
   */
  ip?: string
  /**
   * ports provides information about the ports exposed by this LoadBalancer.
   */
  ports?: Array<V1IngressPortStatus>
}
