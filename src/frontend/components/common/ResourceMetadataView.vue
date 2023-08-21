<script setup lang="ts">
import type { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import DeployView from '@frontend/components/deployment/DeployView.vue'
import RsView from '@frontend/components/replicaset/RsView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import moment from 'moment/moment'
import { NButton, NSpace, NTable, NTag } from 'naive-ui'
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'

const props = defineProps({
  item: V1ObjectMeta,
})

const drawer = useDrawerService()

async function showView(ns: string, item: V1OwnerReference) {
  switch (item.kind) {
    case 'ReplicaSet':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`ReplicaSet:${item.name}`, RsView, { rs: await K8sService.replicasetService.getReplicaSet(ns, item.name) })
      break
    case 'Deployment':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Deployment:${item.name}`, DeployView, { deploy: await K8sService.deploymentService.getDeployment(ns, item.name) })
      break
  }
}
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr v-if="item.creationTimestamp">
        <td class="left">
          Created
        </td>
        <td>
          {{ moment(item.creationTimestamp).format('yyyy-MM-DD H:mm:s Z') }}
          {{ moment(item.creationTimestamp).fromNow() }}
        </td>
      </tr>
      <tr v-if="props.item.name">
        <td>Name</td>
        <td>{{ props.item.name }}</td>
      </tr>
      <tr v-if="props.item.namespace">
        <td>Namespace</td>
        <td>{{ props.item.namespace }}</td>
      </tr>
      <tr v-if="props.item.labels">
        <td>Labels</td>
        <td>
          <NSpace v-for="(v, k) in props.item.labels" :key="k">
            <NTag>
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr v-if="props.item.annotations">
        <td>Annotations</td>
        <td>
          <NSpace v-for="(v, k) in props.item.annotations" :key="k">
            <NTag v-if="!k.endsWith('last-applied-configuration')">
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr v-if="props.item.ownerReferences">
        <td>Controlled By</td>
        <td>
          <span v-for="r in props.item.ownerReferences" :key="r.uid">
            {{ r.kind }}
            <NButton quaternary type="success" @click="showView(props.item.namespace, r)">
              {{ r.name }}
            </NButton>
          </span>
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
