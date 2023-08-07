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
import type { IoK8sApiAppsV1StatefulSetSpec } from './ioK8sApiAppsV1StatefulSetSpec'
import type { IoK8sApiAppsV1StatefulSetStatus } from './ioK8sApiAppsV1StatefulSetStatus'
import type { V1ObjectMeta } from './V1ObjectMeta'

/**
 * StatefulSet represents a set of pods with consistent identities. Identities are defined as:   - Network: A single stable DNS and hostname.   - Storage: As many VolumeClaims as requested.  The StatefulSet guarantees that a given network identity will always map to the same storage identity.
 */
export interface IoK8sApiAppsV1StatefulSet {
  /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
  apiVersion?: string
  /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
  kind?: string
  /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
  metadata?: V1ObjectMeta
  /**
     * Spec defines the desired identities of pods in this set.
     */
  spec?: IoK8sApiAppsV1StatefulSetSpec
  /**
     * Status is the current status of Pods in this StatefulSet. This data may be out of date by some window of time.
     */
  status?: IoK8sApiAppsV1StatefulSetStatus
}