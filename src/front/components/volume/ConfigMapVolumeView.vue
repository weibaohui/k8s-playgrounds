<script setup lang="ts">
import { NAlert, NTable } from 'naive-ui'
import { V1Volume } from '../../../model/V1Volume'

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
      <td>ConfigMap</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>{{ props.v.configMap.name }}</td>
    </tr>
    <tr v-if="props.v.configMap.items">
      <td>Items</td>
      <td>
        <NAlert type="success" :show-icon="false">
          {{ props.v.configMap.items.map(r => `${r.key}->${r.path}`).join() }}
        </NAlert>
      </td>
    </tr>
    <tr v-if="props.v.configMap.defaultMode">
      <td>Default  Mode</td>
      <td>{{ props.v.configMap.defaultMode }}</td>
    </tr>
    <tr v-if="props.v.configMap.optional">
      <td>optional</td>
      <td>{{ props.v.configMap.optional }}</td>
    </tr>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
