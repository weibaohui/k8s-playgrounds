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
 * ObjectFieldSelector selects an APIVersioned field of an object.
 */
export class V1ObjectFieldSelector {
  /**
   * Version of the schema the FieldPath is written in terms of, defaults to \"v1\".
   */
  apiVersion?: string
  /**
   * Path of the field to select in the specified API version.
   */
  fieldPath: string
}
