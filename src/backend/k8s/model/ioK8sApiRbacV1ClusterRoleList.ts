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
import type { IoK8sApiRbacV1ClusterRole } from './ioK8sApiRbacV1ClusterRole'
import type { V1ListMeta } from './V1ListMeta'

/**
 * ClusterRoleList is a collection of ClusterRoles
 */
export interface IoK8sApiRbacV1ClusterRoleList {
  /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
  apiVersion?: string
  /**
     * Items is a list of ClusterRoles
     */
  items: Array<IoK8sApiRbacV1ClusterRole>
  /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
  kind?: string
  /**
     * Standard object's metadata.
     */
  metadata?: V1ListMeta
}