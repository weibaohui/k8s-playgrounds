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
 * EventSource contains information for an event.
 */
export class V1EventSource {
  /**
   * Component from which the event is generated.
   */
  component?: string
  /**
   * Node name on which the event is generated.
   */
  host?: string
}
