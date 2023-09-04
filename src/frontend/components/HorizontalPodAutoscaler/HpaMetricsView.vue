<script setup lang="ts">
import { V2HorizontalPodAutoscaler } from '@backend/k8s/model/v2HorizontalPodAutoscaler'
import type { V2MetricSpec } from '@backend/k8s/model/v2MetricSpec'
import { NTable } from 'naive-ui'

const props = defineProps({
  hpa: V2HorizontalPodAutoscaler,
})
function getName(metric: V2MetricSpec) {
  switch (metric.type) {
    case 'External':
      return `${metric.external.metric.name} on ${JSON.stringify(metric.external.metric.selector)}`
    case 'Resource':
      return `Resource  ${metric.resource.name} on Pods`
    case 'ContainerResource':
      return `${metric.pods.metric.name} on Pods`
    case 'Pods':
      return `${metric.pods.metric.name} on Pods`
    case 'Object':
      return `${metric.object.metric.name} on ${metric.object.describedObject.kind}/${metric.object.describedObject.name}`
  }
  return ''
}
</script>

<template>
  <NTable :single-line="false">
    <thead>
      <tr>
        <th class="left">
          Name
        </th>
        <th>
          Current/Target
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="m in props.hpa.spec.metrics" :key="m">
        <td>
          {{ getName(m) }}
        </td>
        <td>
          <span v-if="m.resource && m.resource.target.type === 'Utilization'">
            {{ m.resource.target.averageUtilization }}
          </span>
          <span v-if="m.resource && m.resource.target.type === 'AverageValue'">
            {{ m.resource.target.averageValue }}
          </span>
          <span v-if="m.resource && m.resource.target.type === 'Value'">
            {{ m.resource.target.value }}
          </span>
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 200px;
}
</style>
