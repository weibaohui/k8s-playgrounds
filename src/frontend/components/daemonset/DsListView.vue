<script setup lang="ts">
import type { V1DaemonSet } from '@backend/k8s/model/V1DaemonSet'
import { ResType } from '@backend/k8s/watch/watch.model'
import { TimerUtils } from '@backend/utils/TimerUtils'
import DsActionView from '@frontend/components/daemonset/DsActionView.vue'
import DsView from '@frontend/components/daemonset/DsView.vue'
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
const itemList = ref<V1DaemonSet[]>()
const searchText = ref('')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V1DaemonSet> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1DaemonSet) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`${ResType.DaemonSet}:${row.metadata.name}`, DsView, { ds: row })
            },
          },
          { default: () => row.metadata.name },
        )
      },
    },
    {
      title: 'Namespace',
      key: 'metadata.namespace',
      render(row: V1DaemonSet) {
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
      key: 'status.replicas',
    },
    {
      title: 'Desire',
      key: 'status.desiredNumberScheduled',
      render(row: V1DaemonSet) {
        return row.status.desiredNumberScheduled ? row.status.desiredNumberScheduled : 0
      },
    },
    {
      title: 'Current',
      key: 'status.currentNumberScheduled',
      render(row: V1DaemonSet) {
        return row.status.currentNumberScheduled ? row.status.currentNumberScheduled : 0
      },
    },
    {
      title: 'Updated',
      key: 'status.updatedNumberScheduled',
      render(row: V1DaemonSet) {
        return row.status.updatedNumberScheduled ? row.status.updatedNumberScheduled : 0
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
      render(row: V1DaemonSet) {
        return h(DsActionView,
          {
            ds: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.daemonSetControllerListByNs({ ns: selectedNs.value })
  if (!_.isEmpty(searchText.value))
    itemList.value = itemList.value.filter(r => r.metadata.name.includes(searchText.value))
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.daemonSetControllerDelete({ requestBody: keys })
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

  TimerUtils.runOnceThenDelayTwoSeconds(getItemList,
    () => K8sService.watchService.watchChange(itemList, ResType.DaemonSet, selectedNs))
})
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    name="Daemon Sets"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
    @on-ns-changed="onNsChanged"
  />
</template>

<style scoped>

</style>
