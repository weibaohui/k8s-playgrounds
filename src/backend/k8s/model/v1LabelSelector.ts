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
import type { IoK8sApimachineryPkgApisMetaV1LabelSelectorRequirement } from './ioK8sApimachineryPkgApisMetaV1LabelSelectorRequirement'

/**
 * A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.
 */
export interface V1LabelSelector {
  /**
     * matchExpressions is a list of label selector requirements. The requirements are ANDed.
     */
  matchExpressions?: Array<IoK8sApimachineryPkgApisMetaV1LabelSelectorRequirement>
  /**
     * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is \"key\", the operator is \"In\", and the values array contains only \"value\". The requirements are ANDed.
     */
  matchLabels?: { [key: string]: string }
}