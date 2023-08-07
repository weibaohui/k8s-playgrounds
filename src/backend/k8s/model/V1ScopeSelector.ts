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
import type { V1ScopedResourceSelectorRequirement } from './V1ScopedResourceSelectorRequirement'

/**
 * A scope selector represents the AND of the selectors represented by the scoped-resource selector requirements.
 */
export interface V1ScopeSelector {
  /**
     * A list of scope selector requirements by scope of the resources.
     */
  matchExpressions?: Array<V1ScopedResourceSelectorRequirement>
}