<script setup lang="ts">
import { TimeAge } from '@main/utils/timeAge'
import NodeReadyView from '@render/components/node/NodeReadyView.vue'
import NodeRoleView from '@render/components/node/NodeRoleView.vue'
import NodeView from '@render/components/node/NodeView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NSpace } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Node } from '../../../model/V1Node'

const drawer = useDrawerService()

async function showNodeView(x: V1Node) {
  drawer.showDrawer({
    title: x.metadata.name,
    width: 800,
  },
  h(NodeView, { node: x }),
  )
}

const columns = createColumns()
const nodeList = ref<V1Node[]>()

function createColumns(): DataTableColumns<V1Node> {
  return [
    {
      type: 'selection',
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
              showNodeView(row)
            },

          },
          { default: () => (row as V1Node).metadata.name },
        )
      },
    },
    {
      title: 'Taints',
      key: 'Taints',
      render(row) {
        return h(
          NSpace,
          () => (row as V1Node).spec.taints ? (row as V1Node).spec.taints.length : 0,
        )
      },
    },
    {
      title: 'Role',
      key: 'Role',
      render(row) {
        return h(
          NodeRoleView,
          { node: (row as V1Node) },
        )
      },
    },
    {
      title: 'Version',
      key: 'Version',
      render(row) {
        return h(
          NSpace,
          () => (row as V1Node).status.nodeInfo.kubeletVersion,
        )
      },
    },
    {
      title: 'Conditions',
      key: 'Conditions',
      render(row) {
        return h(
          NodeReadyView,
          { node: (row as V1Node) },
        )
      },
    },

    {
      title: 'Age',
      key: 'age',
      render(row) {
        return h(
          NSpace,
          () => TimeAge.getK8sAge((row as V1Node).metadata.creationTimestamp),
        )
      },
    },

  ]
}

async function getNodeList() {
  nodeList.value = await K8sService.nodeService.getNodeList()
}

function rowKey(row: V1Node) {
  return `${row.metadata.name}`
}

getNodeList()
setTimeout(() => {
  K8sService.watchService.watchChange(nodeList, 'node')
}, 2000)
</script>

<template>
  <NDataTable
    :columns="columns"
    :data="nodeList"
    :pagination="false"
    :bordered="false"
    :row-key="rowKey"
  />
</template>

<style scoped>

</style>
