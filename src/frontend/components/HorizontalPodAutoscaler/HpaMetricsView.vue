<script setup lang="ts">
import { V2HorizontalPodAutoscaler } from '@backend/k8s/model/v2HorizontalPodAutoscaler'
import type { V2MetricSpec } from '@backend/k8s/model/v2MetricSpec'
import type { V2MetricStatus } from '@backend/k8s/model/v2MetricStatus'
import type { V2MetricTarget } from '@backend/k8s/model/v2MetricTarget'
import type { V2MetricValueStatus } from '@backend/k8s/model/v2MetricValueStatus'
import { NTable } from 'naive-ui'

const props = defineProps({
  hpa: V2HorizontalPodAutoscaler,
})
function getTargetValue(t: V2MetricTarget) {
  switch (t.type) {
    case 'Utilization':
      return `${t.averageUtilization}(avg)`
    case 'Value':
      return t.value
    case 'AverageValue':
      return `${t.averageValue}(avg)`
  }
}
function getCurrentMetricValue(t: V2MetricValueStatus, type: string) {
  if (t === undefined || t === null)
    return 'unknown'
  switch (type) {
    case 'Utilization':
      return `${t.averageUtilization}`
    case 'Value':
      return `${t.value}`
    case 'AverageValue':
      return `${t.averageValue}`
  }
}
function getMetric(metric: V2MetricSpec, currentStatus?: Array<V2MetricStatus>) {
  let name = ''
  let target = ''
  let current = ''

  switch (metric.type) {
    case 'External':
      name = `${metric.external.metric.name} on ${JSON.stringify(metric.external.metric.selector)}`
      target = getTargetValue(metric.external.target)
      current = getCurrentMetricValue(currentStatus?.filter(r => r.external.metric.name === metric.external.metric.name).pop().external.current, metric.external.target.type)
      break
    case 'Resource':
      name = `Resource  ${metric.resource.name} on Pods`
      target = getTargetValue(metric.resource.target)
      current = getCurrentMetricValue(currentStatus?.filter(r => r.resource.name === metric.resource.name).pop().resource.current, metric.resource.target.type)
      break
    case 'ContainerResource':
      name = `${metric.containerResource.name} on ${metric.containerResource.container} `
      target = getTargetValue(metric.containerResource.target)
      current = getCurrentMetricValue(currentStatus?.filter(r => r.containerResource.name === metric.containerResource.name).pop().containerResource.current, metric.containerResource.target.type)
      break
    case 'Pods':
      name = `${metric.pods.metric.name} on Pods`
      target = getTargetValue(metric.pods.target)
      current = getCurrentMetricValue(currentStatus?.filter(r => r.pods.metric.name === metric.pods.metric.name).pop().pods.current, metric.pods.target.type)
      break
    case 'Object':
      name = `${metric.object.metric.name} on ${metric.object.describedObject.kind}/${metric.object.describedObject.name}`
      target = getTargetValue(metric.object.target)
      current = getCurrentMetricValue(currentStatus?.filter(r => r.object.metric.name === metric.object.metric.name).pop().pods.current, metric.object.target.type)
      break
  }
  return { name, target, current }
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
          {{ getMetric(m, props.hpa.status.currentMetrics).name }}
        </td>
        <td>
          {{ getMetric(m, props.hpa.status.currentMetrics).current }} /  {{ getMetric(m, props.hpa.status.currentMetrics).target }}
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 50%;
}
</style>
