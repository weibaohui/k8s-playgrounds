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
 * AttachedVolume describes a volume attached to a node
 */
export class V1AttachedVolume {
  /**
   * DevicePath represents the device path where the volume should be available
   */
  devicePath: string
  /**
   * Name of the attached volume
   */
  name: string
}
