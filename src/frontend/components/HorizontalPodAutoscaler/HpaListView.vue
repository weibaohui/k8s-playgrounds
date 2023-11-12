<script setup lang="ts">
import type { V2HorizontalPodAutoscaler } from '@backend/k8s/model/V2HorizontalPodAutoscaler'
import { ResType } from '@backend/k8s/watch/watch.model'
import { TimerUtils } from '@backend/utils/TimerUtils'
import ResourceConditionView from '@frontend/components/common/ResourceConditionView.vue'
import HpaActionView from '@frontend/components/HorizontalPodAutoscaler/HpaActionView.vue'
import HpaView from '@frontend/components/HorizontalPodAutoscaler/HpaView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, useDialog } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'

const drawer = useDrawerService()
const dialog = useDialog()

const selectedNs = ref('default')
const itemList = ref<V2HorizontalPodAutoscaler[]>()
const searchText = ref('')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V2HorizontalPodAutoscaler> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V2HorizontalPodAutoscaler) {
        return h(
          NButton,
          {
            text: true,
            onClick: async () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`${ResType.HorizontalPodAutoscaler}:${row.metadata.name}`, HpaView, { hpa: row })
            },
          },
          { default: () => row.metadata.name },
        )
      },
    },
    {
      title: 'Namespace',
      key: 'metadata.namespace',
      render(row: V2HorizontalPodAutoscaler) {
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
      title: 'Min Pods',
      key: 'minPods',
      render(row: V2HorizontalPodAutoscaler) {
        return row.spec.minReplicas ? row.spec.minReplicas : 0
      },
    },
    {
      title: 'Max Pods',
      key: 'maxPods',
      render(row: V2HorizontalPodAutoscaler) {
        return row.spec.maxReplicas ? row.spec.maxReplicas : 0
      },
    },
    {
      title: 'Current Pods',
      key: 'currentPods',
      render(row: V2HorizontalPodAutoscaler) {
        return row.status.currentReplicas ? row.status.currentReplicas : 0
      },
    },
    {
      title: 'status',
      key: 'status',
      render(row: V2HorizontalPodAutoscaler) {
        return h(
          ResourceConditionView,
          { items: (row.status.conditions) },
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
      render(row: V2HorizontalPodAutoscaler) {
        return h(HpaActionView,
          {
            hpa: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.horizontalPodAutoscalerControllerListByNs({ ns: selectedNs.value })
  if (!_.isEmpty(searchText.value))
    itemList.value = itemList.value.filter(r => r.metadata.name.includes(searchText.value))
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.horizontalPodAutoscalerControllerDelete({ requestBody: keys })
  })
}

function onNsChanged(ns: string) {
  selectedNs.value = ns
  getItemList()
}

function onTextChanged(text: string) {
  searchText.value = text
  if (!_.isEmpty(searchText.value))
    itemList.value = itemList.value.filter(r => r.metadata.name.includes(searchText.value))
}
onMounted(() => {
  if (localStorage.selectedNs)
    selectedNs.value = localStorage.selectedNs

  getItemList()
  TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.HorizontalPodAutoscaler, selectedNs))
})
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    name="Horizontal Pod Autoscalers"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
    @on-ns-changed="onNsChanged"
  />
</template>

<style scoped>

</style>
