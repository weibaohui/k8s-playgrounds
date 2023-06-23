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
const pod = ref()
const podList = ref()
async function getK8s() {
  const x = await get<V1Pod[]>('http://127.0.0.1:3007/cats/k8s')
  const data = x[0].metadata.name
  podname.value = data
  pod.value = x[0]
  podList.value = x
  console.log(data)
  console.log('sss')
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
  <NCard v-for="p in podList" :title="p.metadata.name">
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
