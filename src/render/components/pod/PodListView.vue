<script lang="ts" setup>
import { PodArray } from '@main/utils/podArray'
import ContainerReadyCount from '@render/components/container/ContainerReadyCount.vue'
import ContainerRestartCount from '@render/components/container/ContainerRestartCount.vue'
import ContainerStatusIcon from '@render/components/container/ContainerStatusIcon.vue'
import ContainerStatusText from '@render/components/container/ContainerStatusText.vue'
import NodeView from '@render/components/node/NodeView.vue'
import NsSelect from '@render/components/ns/NsSelect.vue'
import FloatRemoveButton from '@render/components/common/FloatRemoveButton.vue'
import PodAge from '@render/components/pod/PodAge.vue'
import PodExecView from '@render/components/pod/PodExecView.vue'
import PodView from '@render/components/pod/PodView.vue'
import SearchFilter from '@render/components/common/SearchFilter.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { SocketIOService } from '@render/service/k8s/SocketIOService'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NFormItemGi, NGrid } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Pod } from '../../../model/V1Pod'

const drawer = useDrawerService()

function showPodView(x: V1Pod) {
  drawer.showDrawer({
    title: x.metadata.name,
    width: 800,
  },
  h(PodView, { pod: x }),
  )
}
function showPodExecView(x: V1Pod) {
  drawer.showDrawer({
    title: x.metadata.name,
    width: 1000,
  },
  h(PodExecView, { pod: x }),
  )
}
async function showNodeView(x: V1Pod) {
  drawer.showDrawer({
    title: x.spec.nodeName,
    width: 800,
  },
  h(NodeView, { node: await K8sService.nodeService.getNode(x.spec.nodeName) }),
  )
}

const columns = createColumns()
const podList = ref<V1Pod[]>()
const selectedNs = ref('default')
const nsSelectRef = ref<InstanceType<typeof NsSelect>>()
const checkedRowKeysRef = ref<string[]>([])

function createColumns(): DataTableColumns<V1Pod> {
  return [
    {
      type: 'selection',
    },
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
              nsSelectRef.value.setNsSelected(selectedNs.value)
            },
          },
          { default: () => (row as V1Pod).metadata.namespace },
        )
      },
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              showPodView(row)
            },
          },
          { default: () => (row as V1Pod).metadata.name },
        )
      },
    },
    {
      title: 'Ready',
      key: 'Ready',
      render(row, index) {
        return h(ContainerReadyCount,
          {
            pod: row as V1Pod,
          },
        )
      },
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
      render(row) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              showNodeView(row)
            },
          },
          { default: () => (row as V1Pod).spec.nodeName },
        )
      },
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
              showPodExecView(row)
            },
          },
          { default: () => 'exec' },
        )
      },
    },
  ]
}

function handleCheck(keys: string[]) {
  checkedRowKeysRef.value = keys
  // 过滤掉不存在的pod,尤其是已经选中的但是被删掉的pod
  _.remove(checkedRowKeysRef.value, (n) => {
    // 找出不存在的
    return _.findIndex(podList.value.map(r => `${r.metadata.namespace}/${r.metadata.name}`), (m) => {
      // 当前的podlist 先变形ns/name,筛选出其中的选中的一致的。
      return m === n
    }) === -1
    // -1 代表最终没有匹配上，那么用remove删除没有匹配上的，也就是不在pod列表中的，不在是因为已经删除了
  })
}

function rowKey(row: V1Pod) {
  return `${row.metadata.namespace}/${row.metadata.name}`
}

async function getK8sPodList() {
  podList.value = await K8sService.podService.getPodList(selectedNs.value)
  podList.value.sort((a, b) => {
    if (a.status.startTime > b.status.startTime)
      return -1

    if (a.status.startTime < b.status.startTime)
      return 1

    return 0
  })
}

async function watchPodChange() {
  const socket = new SocketIOService().open()
  socket.emit('watch-init', 'init')
  console.log('socket-io', socket.active)
  socket.on('events-pod', (data) => {
    // 处理接收到的数据
    const p = data.object as V1Pod
    if (selectedNs.value != null && p.metadata.namespace !== selectedNs.value) {
      // console.log('跳过', selectedNs.value, item.metadata.namespace)
      return
    }

    const pa = new PodArray()
    switch (data.type) {
      case 'MODIFIED':
        pa.UpdatePods(podList.value, p)
        break
      case 'ADDED':
        pa.AddPods(podList.value, p)
        break
      case 'DELETED':
        pa.DeletePods(podList.value, p)
        break
    }
  })
}

function onTextChanged(text: String) {
  if (_.isEmpty(text)) {
    getK8sPodList()
    return
  }
  podList.value = podList.value.filter(r => r.metadata.name.includes(text))
}

async function onRemoveBtnClicked() {
  await K8sService.podService.deletePods(checkedRowKeysRef.value)
  checkedRowKeysRef.value = []
}

function onNsChanged(ns: String) {
  selectedNs.value = ns
  getK8sPodList()
}

getK8sPodList()
setTimeout(
  () => {
    watchPodChange()
  }, 5000)
</script>

<template>
  <NGrid :cols="24" :x-gap="24">
    <NFormItemGi :span="1" />
    <NFormItemGi :span="11">
      <NsSelect ref="nsSelectRef" @on-ns-changed="onNsChanged" />
    </NFormItemGi>
    <NFormItemGi :span="11">
      <SearchFilter @on-text-changed="onTextChanged" />
    </NFormItemGi>
    <NFormItemGi :span="1" />
  </NGrid>
  <FloatRemoveButton :items="checkedRowKeysRef" @on-clicked="onRemoveBtnClicked" />

  <NDataTable
    :columns="columns"
    :data="podList"
    :pagination="false"
    :bordered="false"
    :row-key="rowKey"
    @update:checked-row-keys="handleCheck"
  />
</template>
