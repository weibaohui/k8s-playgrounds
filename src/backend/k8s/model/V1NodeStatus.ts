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
import type { V1AttachedVolume } from './V1AttachedVolume'
import type { V1ContainerImage } from './V1ContainerImage'
import type { V1NodeAddress } from './V1NodeAddress'
import type { V1NodeCondition } from './V1NodeCondition'
import type { V1NodeConfigStatus } from './V1NodeConfigStatus'
import type { V1NodeDaemonEndpoints } from './V1NodeDaemonEndpoints'
import type { V1NodeSystemInfo } from './V1NodeSystemInfo'
import type { ResourceQuantity } from './resourceQuantity'

/**
 * NodeStatus is information about the current status of a node.
 */
export class V1NodeStatus {
  /**
   * List of addresses reachable to the node. Queried from cloud provider, if available. More info: https://kubernetes.io/docs/concepts/nodes/node/#addresses Note: This field is declared as mergeable, but the merge key is not sufficiently unique, which can cause data corruption when it is merged. Callers should instead use a full-replacement patch. See https://pr.k8s.io/79391 for an example. Consumers should assume that addresses can change during the lifetime of a Node. However, there are some exceptions where this may not be possible, such as Pods that inherit a Node's address in its own status or consumers of the downward API (status.hostIP).
   */
  addresses?: Array<V1NodeAddress>
  /**
   * Allocatable represents the resources of a node that are available for scheduling. Defaults to Capacity.
   */
  allocatable?: { [key: string]: ResourceQuantity }
  /**
   * Capacity represents the total resources of a node. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
   */
  capacity?: { [key: string]: ResourceQuantity }
  /**
   * Conditions is an array of current observed node conditions. More info: https://kubernetes.io/docs/concepts/nodes/node/#condition
   */
  conditions?: Array<V1NodeCondition>
  /**
   * Status of the config assigned to the node via the dynamic Kubelet config feature.
   */
  config?: V1NodeConfigStatus
  /**
   * Endpoints of daemons running on the Node.
   */
  daemonEndpoints?: V1NodeDaemonEndpoints
  /**
   * List of container images on this node
   */
  images?: Array<V1ContainerImage>
  /**
   * Set of ids/uuids to uniquely identify the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#info
   */
  nodeInfo?: V1NodeSystemInfo
  /**
   * NodePhase is the recently observed lifecycle phase of the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#phase The field is never populated, and now is deprecated.
   */
  phase?: string
  /**
   * List of volumes that are attached to the node.
   */
  volumesAttached?: Array<V1AttachedVolume>
  /**
   * List of attachable volumes in use (mounted) by the node.
   */
  volumesInUse?: Array<string>
}
