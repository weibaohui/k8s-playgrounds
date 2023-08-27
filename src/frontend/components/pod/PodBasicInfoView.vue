<script setup lang="ts">
import ResourceConditionView from '@frontend/components/common/ResourceConditionView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import PodSpecView from '@frontend/components/pod/PodSpecView.vue'
import { NTable, NTag } from 'naive-ui'
import ContainerStatusText from '@frontend/components/container/ContainerStatusText.vue'
import { V1Pod } from '@backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
</script>

<template>
  <ResourceMetadataView :item="props.pod.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Status
        </td>
        <td>
          <ContainerStatusText :pod="props.pod" />
        </td>
      </tr>

      <tr>
        <td>Pod IP</td>
        <td>{{ props.pod.status.podIP }}</td>
      </tr>
      <tr>
        <td>Pod IPs</td>
        <td>
          <NTag v-for="p in props.pod.status.podIPs" :key="p.ip">
            {{ p.ip }}
          </NTag>
        </td>
      </tr>
      <tr>
        <td>QoS Class</td>
        <td>{{ props.pod.status.qosClass }}</td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td><ResourceConditionView :items="props.pod.status.conditions" /></td>
      </tr>
    </tbody>
  </NTable>
  <PodSpecView :spec="props.pod.spec" />
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
