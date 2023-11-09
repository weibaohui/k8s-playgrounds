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
import type { IoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookClientConfig } from './ioK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookClientConfig'

/**
 * WebhookConversion describes how to call a conversion webhook
 */
export class IoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookConversion {
  /**
   * clientConfig is the instructions for how to call the webhook if strategy is `Webhook`.
   */
  clientConfig?: IoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookClientConfig
  /**
   * conversionReviewVersions is an ordered list of preferred `ConversionReview` versions the Webhook expects. The API server will use the first version in the list which it supports. If none of the versions specified in this list are supported by API server, conversion will fail for the custom resource. If a persisted Webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail.
   */
  conversionReviewVersions: Array<string>
}
