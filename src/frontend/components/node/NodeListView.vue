<script setup lang="ts">
import { ResType } from '@backend/k8s/watch/watch.model'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NSpace, useDialog } from 'naive-ui'
import { h, ref } from 'vue'
import { TimerUtils } from '@backend/utils/TimerUtils'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'
import NodeActionView from '@frontend/components/node/NodeActionView.vue'
import NodeReadyView from '@frontend/components/node/NodeReadyView.vue'
import NodeRoleView from '@frontend/components/node/NodeRoleView.vue'
import NodeView from '@frontend/components/node/NodeView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import type { V1Node } from '@backend/k8s/model/V1Node'

const drawer = useDrawerService()
const dialog = useDialog()

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
  DialogHelper.instance.Dialog(dialog).Confirm('删除', async () => {
    keys.forEach((n) => {
      K8sService.nodeService.deleteNode(n)
    })
  })
}

function onTextChanged(text: string) {
  if (_.isEmpty(text)) {
    getItemList()
    return
  }
  itemList.value = itemList.value.filter(r => r.metadata.name.includes(text))
}

getItemList()
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.Nodes))
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
