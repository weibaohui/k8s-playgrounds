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
 * volumeDevice describes a mapping of a raw block device within a container.
 */
export interface V1VolumeDevice {
  /**
     * devicePath is the path inside of the container that the device will be mapped to.
     */
  devicePath: string
  /**
     * name must match the name of a persistentVolumeClaim in the pod
     */
  name: string
}