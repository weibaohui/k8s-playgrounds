<script setup lang="ts">
import type { V1Endpoints } from '@backend/k8s/model/V1Endpoints'
import { V1Service } from '@backend/k8s/model/V1Service'
import { ResType } from '@backend/k8s/watch/watch.model'
import EpSubsetIPTagView from '@frontend/components/endpoint/EpSubsetIPTagView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NTable } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  svc: V1Service,
})
const items = ref<V1Endpoints[]>()

async function getEndpoints() {
  items.value = await K8sService.playService.endpointControllerListByNsName({
    ns: props.svc.metadata.namespace,
    name: props.svc.metadata.name,
  })
}

getEndpoints()
const drawer = useDrawerService()

function showEndpointView(ep: V1Endpoints) {
  DrawerHelper.instance.drawer(drawer).showResourceEditor({
    resType: ResType.Endpoint,
    ns: ep.metadata.namespace,
    name: ep.metadata.name,
  })
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
          <span @click="showEndpointView(ep)">
            {{ ep.metadata.name }}
          </span>
        </td>
        <td>
          <EpSubsetIPTagView :ep="ep" />
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
