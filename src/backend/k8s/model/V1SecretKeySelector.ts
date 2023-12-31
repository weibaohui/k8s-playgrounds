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
 * SecretKeySelector selects a key of a Secret.
 */
export class V1SecretKeySelector {
  /**
   * The key of the secret to select from.  Must be a valid secret key.
   */
  key: string
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string
  /**
   * Specify whether the Secret or its key must be defined
   */
  optional?: boolean
}
