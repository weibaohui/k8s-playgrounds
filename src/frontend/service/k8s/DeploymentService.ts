import type { V1Deployment } from '@backend/k8s/model/V1Deployment'
import { HttpClient } from '@backend/utils/axios/HttpClient'
import type { V1Scale } from '@kubernetes/client-node'

export class DeploymentService {
  async getDeploymentList(ns: string): Promise<V1Deployment[]> {
    return await HttpClient.inst.get<V1Deployment[]>(`/k8s/deployment/ns/${ns}`)
  }

  async getDeployment(ns: string, name: string): Promise<V1Deployment> {
    return await HttpClient.inst.get<V1Deployment>(`/k8s/deployment/ns/${ns}/name/${name}`)
  }

  async restartDeployment(ns: string, name: string): Promise<V1Deployment> {
    return await HttpClient.inst.get<V1Deployment>(`/k8s/deployment/restart/ns/${ns}/name/${name}`)
  }

  async scaleDeployment(ns: string, name: string, replicas: number): Promise<V1Scale> {
    return await HttpClient.inst.post<V1Scale>(`/k8s/deployment/scale/ns/${ns}/name/${name}/replicas/${replicas}`)
  }

  async deleteDeployments(nsName: string[]) {
    await HttpClient.inst.post('/k8s/deployment/delete/', nsName)
  }
}
