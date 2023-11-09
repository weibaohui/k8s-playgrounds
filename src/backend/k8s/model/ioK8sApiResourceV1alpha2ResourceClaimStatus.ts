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
import type { IoK8sApiResourceV1alpha2AllocationResult } from './ioK8sApiResourceV1alpha2AllocationResult'
import type { IoK8sApiResourceV1alpha2ResourceClaimConsumerReference } from './ioK8sApiResourceV1alpha2ResourceClaimConsumerReference'

/**
 * ResourceClaimStatus tracks whether the resource has been allocated and what the resulting attributes are.
 */
export class IoK8sApiResourceV1alpha2ResourceClaimStatus {
  /**
   * Allocation is set by the resource driver once a resource or set of resources has been allocated successfully. If this is not specified, the resources have not been allocated yet.
   */
  allocation?: IoK8sApiResourceV1alpha2AllocationResult
  /**
   * DeallocationRequested indicates that a ResourceClaim is to be deallocated.  The driver then must deallocate this claim and reset the field together with clearing the Allocation field.  While DeallocationRequested is set, no new consumers may be added to ReservedFor.
   */
  deallocationRequested?: boolean
  /**
   * DriverName is a copy of the driver name from the ResourceClass at the time when allocation started.
   */
  driverName?: string
  /**
   * ReservedFor indicates which entities are currently allowed to use the claim. A Pod which references a ResourceClaim which is not reserved for that Pod will not be started.  There can be at most 32 such reservations. This may get increased in the future, but not reduced.
   */
  reservedFor?: Array<IoK8sApiResourceV1alpha2ResourceClaimConsumerReference>
}
