import type { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import type { V1Time } from '@backend/k8s/model/V1Time'

export class PortForward {
// Listen on port 8888 on all addresses, forwarding to 5000 in the pod
//  kubectl port-forward --address 0.0.0.0 pod/mypod 8888:5000
// deployment svc pod
  localPort: number
  kubePort: string | number
  type: string
  metadata?: V1ObjectMeta
  // refused succeeded
  status: string
  statusTimestamp: V1Time
}
