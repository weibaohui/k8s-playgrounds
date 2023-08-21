<script lang="ts" setup>
import { ResType } from '@backend/k8s/watch/watch.model'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NText, useDialog } from 'naive-ui'
import { h, ref } from 'vue'
import { TimerUtils } from '@backend/utils/TimerUtils'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'
import ContainerReadyCount from '@frontend/components/container/ContainerReadyCount.vue'
import ContainerRestartCount from '@frontend/components/container/ContainerRestartCount.vue'
import ContainerStatusIcon from '@frontend/components/container/ContainerStatusIcon.vue'
import ContainerStatusText from '@frontend/components/container/ContainerStatusText.vue'
import NodeView from '@frontend/components/node/NodeView.vue'
import PodActionView from '@frontend/components/pod/PodActionView.vue'
import PodView from '@frontend/components/pod/PodView.vue'
import PodWarnIcon from '@frontend/components/pod/PodWarnIcon.vue'

const drawer = useDrawerService()
const dialog = useDialog()

const itemList = ref<V1Pod[]>()
const selectedNs = ref('default')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()
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
              workloadListViewRef.value.setNsSelected(selectedNs.value)
              getItemList()
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
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`Pod:${row.metadata.name}`, PodView, { pod: row })
            },
          },
          [
            h(NText, (row as V1Pod).metadata.name),
            h(PodWarnIcon, { pod: row as V1Pod }),
          ],
        )
      },
    },
    {
      title: 'Ready',
      key: 'Ready',
      render(row) {
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
      render(row) {
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
            onClick: async () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`Node:${row.spec.nodeName}`, NodeView, { node: await K8sService.nodeService.getNode(row.spec.nodeName) })
            },
          },
          { default: () => (row as V1Pod).spec.nodeName },
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
        return h(PodActionView,
          {
            pod: row as V1Pod,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.podService.getPodList(selectedNs.value)
  itemList.value.sort((a, b) => {
    if (a.status.startTime > b.status.startTime)
      return -1

    if (a.status.startTime < b.status.startTime)
      return 1

    return 0
  })
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.podService.deletePods(keys)
  })
}

function onNsChanged(ns: string) {
  selectedNs.value = ns
  getItemList()
}
function onTextChanged(text: string) {
  if (_.isEmpty(text)) {
    getItemList()
    return
  }
  itemList.value = itemList.value.filter(r => r.metadata.name.includes(text))
}

getItemList()
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.Pods, selectedNs))
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    @on-ns-changed="onNsChanged"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>
