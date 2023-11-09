<script setup lang="ts">
import { V1Service } from '@backend/k8s/model/V1Service'
import type { V1ServicePort } from '@backend/k8s/model/V1ServicePort'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import * as _ from 'lodash'
import { NButton, NSpace, NTable, NTag, useMessage } from 'naive-ui'

const props = defineProps({
  svc: V1Service,
})

const message = useMessage()

async function forward(svc: V1Service, p: V1ServicePort) {
  const randomInt = _.random(30000, 60000)
  await K8sService.playService.shellControllerForwardService({
    ns: svc.metadata.namespace,
    localPort: randomInt,
    svcPort: `${p.port}`,
    svcName: svc.metadata.name,
  })
  message.success('转发成功')
}
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Cluster IP
        </td>
        <td>{{ props.svc.spec.clusterIP }}</td>
      </tr>
      <tr>
        <td>
          Cluster IPs
        </td>
        <td>
          <NSpace vertical>
            <NTag v-for="ip in props.svc.spec.clusterIPs" :key="ip" :color="{ color: ColorHelper.randomColor(), textColor: '#fff' }">
              {{ ip }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr>
        <td>
          IP Families
        </td>
        <td>
          <NSpace vertical>
            <NTag v-for="ip in props.svc.spec.ipFamilies" :key="ip" :color="{ color: ColorHelper.randomColor(), textColor: '#fff' }">
              {{ ip }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr>
        <td>
          IP Family Policy
        </td>
        <td>{{ props.svc.spec.ipFamilyPolicy }}</td>
      </tr>
      <tr>
        <td>
          Ports
        </td>
        <td>
          <p v-for="port in props.svc.spec.ports" :key="port">
            {{ port.port }}:{{ port.nodePort ? port.nodePort : port.targetPort }}/{{ port.protocol }}
            <NButton type="success" @click="forward(props.svc, port)">
              Forward
            </NButton>
          </p>
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
