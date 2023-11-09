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
import type { V1ScopeSelector } from './V1ScopeSelector'
import type { ResourceQuantity } from './resourceQuantity'

/**
 * ResourceQuotaSpec defines the desired hard limits to enforce for Quota.
 */
export class V1ResourceQuotaSpec {
  /**
   * hard is the set of desired hard limits for each named resource. More info: https://kubernetes.io/docs/concepts/policy/resource-quotas/
   */
  hard?: { [key: string]: ResourceQuantity }
  /**
   * scopeSelector is also a collection of filters like scopes that must match each object tracked by a quota but expressed using ScopeSelectorOperator in combination with possible values. For a resource to match, both scopes AND scopeSelector (if specified in spec), must be matched.
   */
  scopeSelector?: V1ScopeSelector
  /**
   * A collection of filters that must match each object tracked by a quota. If not specified, the quota matches all objects.
   */
  scopes?: Array<string>
}
