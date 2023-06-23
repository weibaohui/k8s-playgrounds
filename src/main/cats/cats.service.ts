import { Injectable, Logger } from '@nestjs/common'
import * as k8s from '@kubernetes/client-node'
import { Cat } from './interfaces/cat.interface'
import { CreateCatDto } from './dto/create-cat.dto'

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name)

  private readonly cats: Cat[] = []

  init() {
    const dto = new CreateCatDto()
    dto.name = 'x'
    dto.age = 6
    dto.breed = 'xxxx'
    this.cats.push(dto)
    this.logger.log('init')
  }

  create(cat: Cat) {
    this.cats.push(cat)
  }

  findAll(): Cat[] {
    return this.cats
  }

  async k8s() {
    const kc = new k8s.KubeConfig()
    kc.loadFromFile('/Users/weibh/.kube/config')

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
    return await k8sApi.listNamespacedPod('default').then((res) => {
      return res.body.items.map((v) => {
        return v.metadata.name
      })
    })
  }

  async k8sPods() {
    const kc = new k8s.KubeConfig()
    kc.loadFromFile('/Users/weibh/.kube/config')

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
    return await k8sApi.listNamespacedPod('default').then((res) => {
      return res.body.items
    })
  }
}
