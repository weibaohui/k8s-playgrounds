<script setup lang="ts">
import { NTable } from 'naive-ui'
import { V1Volume } from '@backend/k8s/model/V1Volume'

const props = defineProps({
  v: V1Volume,
})
</script>

<template>
  <NTable bordered :single-line="false">
    <tr>
      <td class="left">
        Kind
      </td>
      <td>HostPath</td>
    </tr>
    <tr>
      <td>Node's Host Filesystem Path</td>
      <td>{{ props.v.hostPath.path }}</td>
    </tr>
    <tr v-if="props.v.hostPath.type">
      <td>Check Behaviour</td>
      <td>{{ props.v.hostPath.type }}</td>
    </tr>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
