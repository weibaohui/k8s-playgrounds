<script lang="ts" setup>
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { ResType } from '@backend/k8s/watch/watch.model'
import { TimerUtils } from '@backend/utils/TimerUtils'
import ControlledByView from '@frontend/components/common/ControlledByView.vue'
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
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NText, useDialog } from 'naive-ui'
import { h, ref } from 'vue'

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
      render(row: V1Pod) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              selectedNs.value = row.metadata.namespace
              workloadListViewRef.value.setNsSelected(selectedNs.value)
              getItemList()
            },
          },
          { default: () => row.metadata.namespace },
        )
      },
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1Pod) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`${ResType.Pod}:${row.metadata.name}`, PodView, { pod: row })
            },
          },
          [
            h(NText, row.metadata.name),
            h(PodWarnIcon, { pod: row }),
          ],
        )
      },
    },
    {
      title: 'Ready',
      key: 'Ready',
      render(row: V1Pod) {
        return h(ContainerReadyCount,
          {
            pod: row,
          },
        )
      },
    },
    {
      title: 'Restarts',
      key: 'Restarts',
      render(row: V1Pod) {
        return h(ContainerRestartCount,
          {
            pod: row,
          },
        )
      },
    },
    {
      title: 'ControlledBy',
      key: 'ControlledBy',
      render(row: V1Pod) {
        return h(ControlledByView,
          {
            item: row.metadata,
            simple: true,
          },
        )
      },
    },
    {
      title: 'Status',
      key: 'status.phase',
      render(row: V1Pod) {
        return h(ContainerStatusText,
          {
            pod: row,
          },
        )
      },
    },
    {
      title: 'IP',
      key: 'status.podIP',
      minWidth: '100',
    },
    {
      title: 'Node',
      key: 'spec.nodeName',
      render(row: V1Pod) {
        return h(
          NButton,
          {
            text: true,
            onClick: async () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`Node:${row.spec.nodeName}`, NodeView, { node: await K8sService.playService.nodeControllerGetOneByName({ name: row.spec.nodeName }) })
            },
          },
          { default: () => row.spec.nodeName },
        )
      },
    },

    {
      title: 'QoS',
      key: 'status.qosClass',
      minWidth: '100',
    },
    {
      title: 'Containers',
      key: 'Containers',
      render(row: V1Pod) {
        return h(ContainerStatusIcon,
          {
            pod: row,
          },
        )
      },
    },
    {
      title: 'Age',
      key: 'age',
      minWidth: '80',
      render(row: V1Pod) {
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
  itemList.value = await K8sService.playService.podControllerListByNs({ ns: selectedNs.value })
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
    await K8sService.playService.podControllerDelete({ requestBody: keys })
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
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.Pod, selectedNs))
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    name="Pods"
    @on-ns-changed="onNsChanged"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>
