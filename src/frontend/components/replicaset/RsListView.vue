<script setup lang="ts">
import type { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import { ResType } from '@backend/k8s/watch/watch.model'
import { TimerUtils } from '@backend/utils/TimerUtils'
import RsActionView from '@frontend/components/replicaset/RsActionView.vue'
import RsView from '@frontend/components/replicaset/RsView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, useDialog } from 'naive-ui'
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'

const drawer = useDrawerService()
const dialog = useDialog()

const selectedNs = ref('default')
const itemList = ref<V1ReplicaSet[]>()
const searchText = ref('')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V1ReplicaSet> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1ReplicaSet) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`${ResType.ReplicaSet}:${row.metadata.name}`, RsView, { rs: row })
            },
          },
          { default: () => row.metadata.name },
        )
      },
    },
    {
      title: 'Namespace',
      key: 'metadata.namespace',
      render(row: V1ReplicaSet) {
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
      title: 'Current',
      key: 'status.availableReplicas',
      render(row: V1ReplicaSet) {
        return row.status.availableReplicas ? row.status.availableReplicas : 0
      },
    },
    {
      title: 'Ready',
      key: 'status.readyReplicas',
      render(row: V1ReplicaSet) {
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
      render(row: V1ReplicaSet) {
        return h(RsActionView,
          {
            rs: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.replicaSetControllerListByNs({ ns: selectedNs.value })
  if (!_.isEmpty(searchText.value))
    itemList.value = itemList.value.filter(r => r.metadata.name.includes(searchText.value))
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.replicaSetControllerDelete({ requestBody: keys })
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

let intervalId: number
onBeforeUnmount(() => {
  clearInterval(intervalId)
})

onMounted(() => {
  if (localStorage.selectedNs)
    selectedNs.value = localStorage.selectedNs

  getItemList()
  intervalId = TimerUtils.everyTwoSeconds(() => {
    getItemList()
  })
})
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    name="Replica Sets"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
    @on-ns-changed="onNsChanged"
  />
</template>

<style scoped>

</style>
