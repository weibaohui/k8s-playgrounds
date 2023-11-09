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
import type { IoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookConversion } from './ioK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookConversion'

/**
 * CustomResourceConversion describes how to convert different versions of a CR.
 */
export class IoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceConversion {
  /**
   * strategy specifies how custom resources are converted between versions. Allowed values are: - `\"None\"`: The converter only change the apiVersion and would not touch any other field in the custom resource. - `\"Webhook\"`: API Server will call to an external webhook to do the conversion. Additional information   is needed for this option. This requires spec.preserveUnknownFields to be false, and spec.conversion.webhook to be set.
   */
  strategy: string
  /**
   * webhook describes how to call the conversion webhook. Required when `strategy` is set to `\"Webhook\"`.
   */
  webhook?: IoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookConversion
}
