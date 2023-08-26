<script setup lang="ts">
import type { V1StatefulSet } from '@backend/k8s/model/V1StatefulSet'
import { ResType } from '@backend/k8s/watch/watch.model'
import { TimerUtils } from '@backend/utils/TimerUtils'
import StsActionView from '@frontend/components/statefulset/StsActionView.vue'
import StsView from '@frontend/components/statefulset/StsView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, useDialog } from 'naive-ui'
import { h, ref } from 'vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'

const drawer = useDrawerService()
const dialog = useDialog()

const selectedNs = ref('default')
const itemList = ref<V1StatefulSet[]>()
const searchText = ref('')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V1StatefulSet> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1StatefulSet) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`StatefulSet:${row.metadata.name}`, StsView, { sts: row })
            },
          },
          { default: () => row.metadata.name },
        )
      },
    },
    {
      title: 'Namespace',
      key: 'metadata.namespace',
      render(row: V1StatefulSet) {
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
      title: 'Desire',
      key: 'spec.replicas',
    },
    {
      title: 'Current',
      key: 'status.availableReplicas',
      render(row: V1StatefulSet) {
        return row.status.availableReplicas ? row.status.availableReplicas : 0
      },
    },
    {
      title: 'Ready',
      key: 'status.readyReplicas',
      render(row: V1StatefulSet) {
        return row.status.readyReplicas ? row.status.readyReplicas : 0
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
      render(row: V1StatefulSet) {
        return h(StsActionView,
          {
            sts: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.statefulSetControllerListByNs({ ns: selectedNs.value })
  if (!_.isEmpty(searchText.value))
    itemList.value = itemList.value.filter(r => r.metadata.name.includes(searchText.value))
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.statefulSetControllerDelete({ requestBody: keys })
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

getItemList()

TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.StatefulSets, selectedNs))
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    name="Stateful Sets"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
    @on-ns-changed="onNsChanged"
  />
</template>

<style scoped>

</style>
