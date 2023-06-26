<script lang="ts" setup>
import { get } from '@main/utils/axios/api'
import PodView from '@render/components/PodView.vue'
import type { DataTableColumns, SelectOption } from 'naive-ui'
import { NButton, NDataTable, NDrawer, NDrawerContent, NFormItemGi, NGrid, NSelect, useMessage } from 'naive-ui'
import { io } from 'socket.io-client'
import { h, ref } from 'vue'
import type { V1Namespace } from '../../model/V1Namespace'
import type { V1Pod } from '../../model/V1Pod'

const show = ref(false)
const item = ref<V1Pod>()
const message = useMessage()
const columns = createColumns({
  play(item: V1Pod) {
    message.success(`Play ${item.metadata.name}`)
  },
})
const podList = ref<V1Pod[]>()
const selectedNs = ref('default')
const options = ref<SelectOption[]>()
function createColumns({ play }: { play: (row: V1Pod) => void }): DataTableColumns<V1Pod> {
  return [
    {
      title: 'podName',
      key: 'metadata.name',
    },
    {
      title: 'ns',
      key: 'metadata.namespace',
    },
    {
      title: 'Length',
      key: 'status.phase',
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              play(row)
              item.value = row
              show.value = true
            },
          },
          { default: () => 'Play1' },
        )
      },
    },
  ]
}

async function getK8sPodList() {
  podList.value = await get<V1Pod[]>(`/cats/pods/${selectedNs.value}`)
}

async function getK8sNsList() {
  const ns = await get<V1Namespace[]>('/cats/ns')
  options.value = ns.map((r) => {
    return {
      label: r.metadata.name,
      value: r.metadata.name,
    }
  })
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

    const item = data.object as V1Pod
    const pods = podList.value
    const index = pods.findIndex(r => r.metadata.name === item.metadata.name)

    switch (data.type) {
      case 'MODIFIED':
        console.log('修改')
        for (let i = 0; i < pods.length; i++) {
          if (pods[i].metadata.name === item.metadata.name) {
            console.log('111找到修改的pod了', item.metadata.name)
            pods[i] = item
          }
        }
        break
      case 'ADDED':
        if (index === -1) {
          // 不存在，真新增
          console.log('真新增', item.metadata.name)
          pods.push(item)
        }
        else {
          for (let i = 0; i < pods.length; i++) {
            if (pods[i].metadata.name === item.metadata.name) {
              console.log('222找到修改的pod了', item.metadata.name)
              pods[i] = item
            }
          }
        }
        break
      case 'DELETED':
        console.log('删除', index)
        if (index !== -1)
          pods.splice(index, 1)
        break
    }
  })
}
getK8sNsList()
getK8sPodList()

setTimeout(
  () => {
    socketio()
  }, 5000)
</script>

<template>
  <NGrid :cols="24" :x-gap="24">
    <NFormItemGi :span="12">
      <NSelect
        v-model:value="selectedNs" :options="options"
        placeholder="请选择ns"
        clearable @update:value="getK8sPodList"
      />
    </NFormItemGi>
    <NFormItemGi :span="12">
      {{ selectedNs }}
    </NFormItemGi>
  </NGrid>
  <NDataTable
    :columns="columns"
    :data="podList"
    :pagination="false"
    :bordered="false"
  />
  <NDrawer v-model:show="show" :width="502">
    <NDrawerContent :title="item.metadata.name" closable>
      {{ item.metadata.name }}
      <PodView :item="item" />
    </NDrawerContent>
  </NDrawer>
</template>
