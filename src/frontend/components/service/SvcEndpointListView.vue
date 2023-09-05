<script setup lang="ts">
import type { V1Endpoints } from '@backend/k8s/model/V1Endpoints'
import { V1Service } from '@backend/k8s/model/V1Service'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NTable } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  svc: V1Service,
})
const items = ref<V1Endpoints[]>()
async function getEndpoints() {
  items.value = await K8sService.playService.endpointControllerListByNsName({ ns: props.svc.metadata.namespace, name: props.svc.metadata.name })
}
getEndpoints()
function getIps(ep: V1Endpoints) {
  const ips = new Array<string>()
  ep.subsets?.filter(r => r.addresses !== undefined)
    .forEach((subset) => {
      subset.ports.forEach((p) => {
        subset.addresses.forEach((ip) => {
          ips.push(`${ip.ip}:${p.port}`)
        })
      })
    })
  return ips
}
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr>
        <th>Name</th>
        <th>Endpoints</th>
      </tr>
      <tr v-for="ep in items" :key="ep">
        <td class="left">
          {{ ep.metadata.name }}
        </td>
        <td>
          {{ getIps(ep).join(', ') }}
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
