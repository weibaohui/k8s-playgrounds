<script setup lang="ts">
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NSpace } from 'naive-ui'
import { h, ref } from 'vue'
import { TimerUtils } from '../../../backend/utils/TimerUtils'
import ResourceAgeView from '../../components/common/ResourceAgeView.vue'
import WorkloadListView from '../../components/common/ResourceListView.vue'
import NodeActionView from '../../components/node/NodeActionView.vue'
import NodeReadyView from '../../components/node/NodeReadyView.vue'
import NodeRoleView from '../../components/node/NodeRoleView.vue'
import NodeView from '../../components/node/NodeView.vue'
import { useDrawerService } from '../../service/drawer-service/use-drawer'
import { K8sService } from '../../service/k8s/K8sService'
import { DrawerHelper } from '../../service/page/DrawerHelper'
import type { V1Node } from '../../../model/V1Node'

const drawer = useDrawerService()

const itemList = ref<V1Node[]>()
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()
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
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(row.metadata.name, NodeView, { node: row })
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
        return h(ResourceAgeView,
          {
            item: row,
          },
        )
      },
    },
    {
      title: 'Action',
      key: 'Action',
      render(row) {
        return h(NodeActionView,
          {
            node: row as V1Node,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.nodeService.getNodeList()
}

async function onRemoveBtnClicked(keys: string[]) {
}

function onTextChanged(text: string) {
  if (_.isEmpty(text)) {
    getItemList()
    return
  }
  itemList.value = itemList.value.filter(r => r.metadata.name.includes(text))
}

getItemList()
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, 'node'))
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="false"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>

<style scoped>

</style>
