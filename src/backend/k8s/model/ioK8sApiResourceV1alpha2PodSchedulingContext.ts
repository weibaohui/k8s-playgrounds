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
import type { IoK8sApiResourceV1alpha2PodSchedulingContextSpec } from './ioK8sApiResourceV1alpha2PodSchedulingContextSpec'
import type { IoK8sApiResourceV1alpha2PodSchedulingContextStatus } from './ioK8sApiResourceV1alpha2PodSchedulingContextStatus'
import type { V1ObjectMeta } from './V1ObjectMeta'

/**
 * PodSchedulingContext objects hold information that is needed to schedule a Pod with ResourceClaims that use \"WaitForFirstConsumer\" allocation mode.  This is an alpha type and requires enabling the DynamicResourceAllocation feature gate.
 */
export class IoK8sApiResourceV1alpha2PodSchedulingContext {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: string
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: string
  /**
   * Standard object metadata
   */
  metadata?: V1ObjectMeta
  /**
   * Spec describes where resources for the Pod are needed.
   */
  spec: IoK8sApiResourceV1alpha2PodSchedulingContextSpec
  /**
   * Status describes where resources for the Pod can be allocated.
   */
  status?: IoK8sApiResourceV1alpha2PodSchedulingContextStatus
}
