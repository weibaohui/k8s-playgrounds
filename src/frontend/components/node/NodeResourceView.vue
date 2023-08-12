<script setup lang="ts">
import { NTable } from 'naive-ui'
import { V1Node } from '@backend/k8s/model/V1Node'

const props = defineProps({
  node: V1Node,
})
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr>
        <th>kind</th>
        <th>capacity</th>
        <th>allocatable</th>
      </tr>
      <tr>
        <td class="left">
          cpu
        </td>
        <td>
          {{ node.status.capacity.cpu }}
        </td>
        <td>
          {{ node.status.allocatable.cpu }}
        </td>
      </tr>
      <tr>
        <td>
          ephemeral-storage
        </td>
        <td>
          {{ node.status.capacity['ephemeral-storage'] }}
        </td>
        <td>
          {{ node.status.allocatable['ephemeral-storage'] }}
        </td>
      </tr><tr>
        <td>
          hugepages-1Gi
        </td>
        <td>
          {{ node.status.capacity['hugepages-1Gi'] }}
        </td>
        <td>
          {{ node.status.allocatable['hugepages-1Gi'] }}
        </td>
      </tr>
      <tr>
        <td>
          hugepages-2Mi
        </td>
        <td>
          {{ node.status.capacity['hugepages-2Mi'] }}
        </td>
        <td>
          {{ node.status.allocatable['hugepages-2Mi'] }}
        </td>
      </tr>
      <tr>
        <td>
          hugepages-32Mi
        </td>
        <td>
          {{ node.status.capacity['hugepages-32Mi'] }}
        </td>
        <td>
          {{ node.status.allocatable['hugepages-32Mi'] }}
        </td>
      </tr>
      <tr>
        <td>
          hugepages-64Ki
        </td>
        <td>
          {{ node.status.capacity['hugepages-64Ki'] }}
        </td>
        <td>
          {{ node.status.allocatable['hugepages-64Ki'] }}
        </td>
      </tr>
      <tr>
        <td>
          memory
        </td>
        <td>
          {{ node.status.capacity.memory }}
        </td>
        <td>
          {{ node.status.allocatable.memory }}
        </td>
      </tr>
      <tr>
        <td>
          pods
        </td>
        <td>
          {{ node.status.capacity.pods }}
        </td>
        <td>
          {{ node.status.allocatable.pods }}
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
