<script setup lang="ts">
import { NSpace, NTable, NTag } from 'naive-ui'
import moment from 'moment/moment'
import { V1Namespace } from '../../../backend/k8s/model/V1Namespace'

const props = defineProps({
  ns: V1Namespace,
})
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Created
        </td>
        <td>
          {{ moment(ns.metadata.creationTimestamp).format('yyyy-MM-DD H:mm:s Z') }}
          {{ moment(ns.metadata.creationTimestamp).fromNow() }}
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ props.ns.metadata.name }}</td>
      </tr>

      <tr v-if="props.ns.metadata.labels">
        <td>Labels</td>
        <td>
          <NSpace v-for="(v, k) in props.ns.metadata.labels" :key="k">
            <NTag type="success">
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr v-if="props.ns.metadata.annotations">
        <td>Annotations</td>
        <td>
          <NSpace v-for="(v, k) in props.ns.metadata.annotations" :key="k">
            <NTag v-if="!k.endsWith('last-applied-configuration')">
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr>
        <td>Finalizers</td>
        <td>
          <NSpace v-for="f in props.ns.spec.finalizers" :key="f">
            <NTag type="success">
              {{ f }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{{ props.ns.status.phase }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
