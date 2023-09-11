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
import type { IoK8sApiAdmissionregistrationV1alpha1TypeChecking } from './ioK8sApiAdmissionregistrationV1alpha1TypeChecking'
import type { V1Condition } from './V1Condition'

/**
 * ValidatingAdmissionPolicyStatus represents the status of a ValidatingAdmissionPolicy.
 */
export class IoK8sApiAdmissionregistrationV1alpha1ValidatingAdmissionPolicyStatus {
  /**
     * The conditions represent the latest available observations of a policy's current state.
     */
  conditions?: Array<V1Condition>
  /**
     * The generation observed by the controller.
     */
  observedGeneration?: number
  /**
     * The results of type checking for each expression. Presence of this field indicates the completion of the type checking.
     */
  typeChecking?: IoK8sApiAdmissionregistrationV1alpha1TypeChecking
}
