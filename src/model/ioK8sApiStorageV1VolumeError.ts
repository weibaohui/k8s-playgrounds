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
import type { IoK8sApimachineryPkgApisMetaV1Time } from './ioK8sApimachineryPkgApisMetaV1Time'

/**
 * VolumeError captures an error encountered during a volume operation.
 */
export interface IoK8sApiStorageV1VolumeError {
  /**
     * message represents the error encountered during Attach or Detach operation. This string may be logged, so it should not contain sensitive information.
     */
  message?: string
  /**
     * time represents the time the error was encountered.
     */
  time?: IoK8sApimachineryPkgApisMetaV1Time
}