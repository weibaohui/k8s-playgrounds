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
import type { IoK8sApiNetworkingV1IngressLoadBalancerIngress } from './ioK8sApiNetworkingV1IngressLoadBalancerIngress'

/**
 * IngressLoadBalancerStatus represents the status of a load-balancer.
 */
export class IoK8sApiNetworkingV1IngressLoadBalancerStatus {
  /**
   * ingress is a list containing ingress points for the load-balancer.
   */
  ingress?: Array<IoK8sApiNetworkingV1IngressLoadBalancerIngress>
}
