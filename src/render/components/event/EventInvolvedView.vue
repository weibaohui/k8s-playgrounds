<script setup lang="ts">
import { NTable } from 'naive-ui'
import { V1Event } from '../../../model/V1Event'

const props = defineProps({
  event: V1Event,
})
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Name
        </td>
        <td>{{ props.event.involvedObject.name }}</td>
      </tr>
      <tr>
        <td>Namespace</td>
        <td>{{ props.event.involvedObject.namespace }}</td>
      </tr>
      <tr>
        <td>kind</td>
        <td>{{ props.event.involvedObject.kind }}</td>
      </tr>
      <tr>
        <td>fieldPath</td>
        <td>{{ props.event.involvedObject.fieldPath }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
