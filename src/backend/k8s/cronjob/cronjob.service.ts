import { ClientService } from '@backend/k8s/client/client.service'
import { JobService } from '@backend/k8s/job/job.service'
import { V1Job } from '@kubernetes/client-node'
import { Injectable, Logger } from '@nestjs/common'
import randomstring from 'randomstring'

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name)

  constructor(
    public clientService: ClientService,
    public jobService: JobService,
  ) {
  }

  async List(ns?: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listCronJobForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedCronJob(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    const resp = await k8sApi.readNamespacedCronJob(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getBatchV1Api()
    const r = await k8sApi.deleteNamespacedCronJob(name, ns)
    return r.body
  }

  async Trigger(ns: string, name: string) {
    const cronJob = await this.GetOneByNsName(ns, name)
    const job: V1Job = {
      kind: 'Job',
      apiVersion: 'batch/v1',
      metadata: {
        name: `${cronJob.metadata.name}-manual-${randomstring.generate(7).toLowerCase()}`,
        annotations: {
          'cronjob.kubernetes.io/instantiate': 'manual',
        },
        ownerReferences: [
          {
            apiVersion: cronJob.apiVersion,
            kind: cronJob.kind,
            name: cronJob.metadata.name,
            uid: cronJob.metadata.uid,
          },
        ],
      },
      spec: {
        template: {
          metadata: cronJob.spec.jobTemplate.spec.template.metadata,
          spec: cronJob.spec.jobTemplate.spec.template.spec,
        },
      },
    }
    return await this.jobService.Create(ns, job)
  }

  async TriggerByNodePty(ns: string, name: string) {
    const pk = this.clientService.getNodePty()
    pk.onData((d) => {
      this.logger.debug(d)
    })
    setTimeout(() => {
      pk.write(`clear;kubectl create job -n ${ns} --from=cronjob/${name} ${name}-manual-${randomstring.generate(7).toLowerCase()} \r`)
    }, 1000)
  }

  async Suspend(ns: string, name: string) {
    return this.setSuspendStatus(ns, name, true)
  }

  async Resume(ns: string, name: string) {
    return this.setSuspendStatus(ns, name, false)
  }

  async setSuspendStatus(ns: string, name: string, status: boolean) {
    const k8sApi = this.clientService.getBatchV1Api()
    const resp = await k8sApi.patchNamespacedCronJob(name, ns,
      {
        spec: {
          suspend: status,
        },
      }, 'true', undefined,
      undefined, undefined, undefined,
      {
        headers: {
          'Content-Type': 'application/strategic-merge-patch+json',
          'Accept': 'application/json, */*',
        },
      })
    return resp.body
  }
}
