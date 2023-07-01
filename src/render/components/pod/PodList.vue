<script lang="ts" setup>
import { get } from '@main/utils/axios/api'
import ContainerRestartCount from '@render/components/container/ContainerRestartCount.vue'
import ContainerStatusIcon from '@render/components/container/ContainerStatusIcon.vue'
import ContainerStatusText from '@render/components/container/ContainerStatusText.vue'
import PodAge from '@render/components/pod/PodAge.vue'
import PodView from '@render/components/pod/PodView.vue'
import type { DataTableColumns, SelectOption } from 'naive-ui'
import { NButton, NDataTable, NDrawer, NDrawerContent, NFormItemGi, NGrid, NSelect, useMessage } from 'naive-ui'
import { io } from 'socket.io-client'
import { h, ref } from 'vue'
import type { V1Namespace } from '../../../model/V1Namespace'
import type { V1Pod } from '../../../model/V1Pod'
import '../../../extension'

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
      title: 'Namespace',
      key: 'metadata.namespace',
      render(row) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              selectedNs.value = (row as V1Pod).metadata.namespace
              getK8sPodList()
            },
          },
          { default: () => (row as V1Pod).metadata.namespace },
        )
      },
    },
    {
      title: 'Name',
      key: 'metadata.name',
    },

    {
      title: 'Restarts',
      key: 'Restarts',
      render(row, index) {
        return h(ContainerRestartCount,
          {
            pod: row as V1Pod,
          },
        )
      },
    },
    {
      title: 'Status',
      key: 'status.phase',
      render(row) {
        return h(ContainerStatusText,
          {
            pod: row as V1Pod,
          },
        )
      },
    },
    {
      title: 'IP',
      key: 'status.podIP',

    },
    {
      title: 'Node',
      key: 'spec.nodeName',
    },
    {
      title: 'Age',
      key: 'age',
      render(row) {
        return h(PodAge,
          {
            pod: row as V1Pod,
          },
        )
      },
    },
    {
      title: 'QoS',
      key: 'status.qosClass',
    },
    {
      title: 'Containers',
      key: 'Containers',
      render(row) {
        return h(ContainerStatusIcon,
          {
            pod: row as V1Pod,
          },
        )
      },
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
  podList.value = await get<V1Pod[]>(`/watch/pods/${selectedNs.value}`)
  podList.value.sort((a, b) => {
    if (a.status.startTime > b.status.startTime)
      return -1
    if (a.status.startTime < b.status.startTime)
      return 1
    return 0
  })
}

async function startK8sWatch() {
  await get('/watch/init')
}
async function getK8sNsList() {
  const ns = await get<V1Namespace[]>('/watch/ns')
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
  console.log('socket-io', socket.active)
  socket.on('events', (data) => {
    // 处理接收到的数据

    const item = data.object as V1Pod
    if (selectedNs.value != null && item.metadata.namespace !== selectedNs.value) {
      // console.log('跳过', selectedNs.value, item.metadata.namespace)
      return
    }

    const pods = podList.value
    const index = pods.findIndex(r => r.metadata.name === item.metadata.name)

    switch (data.type) {
      case 'MODIFIED':
        for (let i = 0; i < pods.length; i++) {
          if (pods[i].metadata.name === item.metadata.name) {
            // console.log('111找到修改的pod了', item.metadata.name)
            pods[i] = item
          }
        }
        break
      case 'ADDED':
        if (index === -1) {
          // 不存在，真新增
          // console.log('真新增', item.metadata.name)
          pods.push(item)
        }
        else {
          for (let i = 0; i < pods.length; i++) {
            if (pods[i].metadata.name === item.metadata.name) {
              // console.log('222找到修改的pod了', item.metadata.name)
              pods[i] = item
            }
          }
        }
        break
      case 'DELETED':
        // console.log('删除', index)
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
    startK8sWatch()
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
  <NDrawer v-model:show="show" :width="800">
    <NDrawerContent :title="item.metadata.name" closable>
      <PodView :item="item" />
    </NDrawerContent>
  </NDrawer>
</template>
