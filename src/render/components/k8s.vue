<script setup lang="ts">
import type { V1Pod } from '@kubernetes/client-node'
import { get } from '@main/utils/axios/api'
import { NButton, NCard, NGradientText } from 'naive-ui'
import { io } from 'socket.io-client'
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
async function socketio() {
  const socket = io('http://127.0.0.1:3007', {
    transports: ['websocket'], // 指定传输方式，如WebSocket
    autoConnect: true, // 是否自动连接
    reconnection: true, // 是否自动重新连接
    reconnectionAttempts: 3, // 重新连接尝试次数
    reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
    query: { token: 'your-token' }, // 自定义查询参数
    // 其他可选参数...
  })
  socket.on('events', (data) => {
    // 处理接收到的数据
    console.log(data)
  })
  socket.emit('events', 'xxxxxx')
}
socketio()
</script>

<template>
  <div>k8s:{{ props.name }}</div>

  <NButton type="primary" @click="socketio">
    socketio
  </NButton>
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
