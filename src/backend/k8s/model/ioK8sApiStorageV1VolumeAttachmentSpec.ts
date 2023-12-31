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
import type { IoK8sApiStorageV1VolumeAttachmentSource } from './ioK8sApiStorageV1VolumeAttachmentSource'

/**
 * VolumeAttachmentSpec is the specification of a VolumeAttachment request.
 */
export class IoK8sApiStorageV1VolumeAttachmentSpec {
  /**
   * attacher indicates the name of the volume driver that MUST handle this request. This is the name returned by GetPluginName().
   */
  attacher: string
  /**
   * nodeName represents the node that the volume should be attached to.
   */
  nodeName: string
  /**
   * source represents the volume that should be attached.
   */
  source: IoK8sApiStorageV1VolumeAttachmentSource
}
