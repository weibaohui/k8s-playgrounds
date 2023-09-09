<script setup lang="ts">
import { V1ServiceAccount } from '@backend/k8s/model/V1ServiceAccount'
import { ResType } from '@backend/k8s/watch/watch.model'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import SecretView from '@frontend/components/secret/SecretView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NButton, NTable } from 'naive-ui'

const props = defineProps({
  sa: V1ServiceAccount,
  showTitle: Boolean,
})
const drawer = useDrawerService()

async function onImagePullSecretsNameClick(ns: string, name: string) {
  const resource = await K8sService.getResource({
    resType: ResType.Secret,
    ns,
    name,
  })
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`${ResType.Secret}:${name}`, SecretView, { secret: resource })
}
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.sa.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          AutoMount
        </td>
        <td>{{ props.sa.automountServiceAccountToken }}</td>
      </tr>
      <tr v-if="props.sa.imagePullSecrets">
        <td>
          imagePullSecrets
        </td>
        <td>
          <NButton
            v-for="sn in props.sa.imagePullSecrets"
            :key="sn"
            @click="onImagePullSecretsNameClick(props.sa.metadata.namespace, sn.name)"
          >
            {{ sn.name }}
          </NButton>
        </td>
      </tr>

      <tr v-if="props.sa.secrets">
        <td>
          secrets
        </td>
        <td>
          <NButton
            v-for="sn in props.sa.secrets"
            :key="sn"
            @click="onImagePullSecretsNameClick(sn.namespace, sn.name)"
          >
            {{ sn.name }}
          </NButton>
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
