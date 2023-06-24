<script setup lang="ts">
import type { V1Pod } from '@kubernetes/client-node'
import { get } from '@main/utils/axios/api'
import { NButton, NCard, NGradientText } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'docker-desktop',
  },
})
const podname = ref('pn')
const pod = ref<V1Pod>()
const podList = ref<V1Pod[]>()
async function getK8s() {
  const x = await get<V1Pod[]>('/cats/k8s')
  podname.value = x[0].metadata.name
  pod.value = x[0]
  podList.value = x
}
</script>

<template>
  <div>k8s:{{ props.name }}</div>

  <NButton type="primary" @click="getK8s">
    getK8s
  </NButton>

  <NCard title="卡片">
    {{ podname }}
    {{ !pod ? "" : pod.metadata.name }}
  </NCard>
  <NCard v-for="p in podList" :key="p.metadata.name" :title="p.metadata.name">
    <NGradientText type="danger" :size="34">
      {{ p.metadata.name }}
    </NGradientText>
  </NCard>
</template>

<style scoped>
.NCard {
  max-width: 300px;
}
</style>
