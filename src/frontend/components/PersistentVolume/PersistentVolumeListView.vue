<script setup lang="ts">
import { ResType } from '@backend/k8s/watch/watch.model'
import PersistentVolumeActionView from '@frontend/components/PersistentVolume/PersistentVolumeActionView.vue'
import PersistentVolumeView from '@frontend/components/PersistentVolume/PersistentVolumeView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, useDialog } from 'naive-ui'
import { h, ref } from 'vue'
import { TimerUtils } from '@backend/utils/TimerUtils'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import type { V1PersistentVolume } from '@backend/k8s/model/V1PersistentVolume'

const drawer = useDrawerService()
const dialog = useDialog()
const itemList = ref<V1PersistentVolume[]>()

const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V1PersistentVolume> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1PersistentVolume) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`${ResType.PersistentVolume}:${row.metadata.name}`, PersistentVolumeView, { persistentVolume: row })
            },
          },
          { default: () => row.metadata.name },
        )
      },
    },

    {
      title: 'StorageClass',
      key: 'StorageClass',
      render(row: V1PersistentVolume) {
        return row.spec.storageClassName
      },
    },
    {
      title: 'Reclaim Policy',
      key: 'reclaimPolicy',
      render(row: V1PersistentVolume) {
        return row.spec.claimRef ? `${row.spec.claimRef.namespace}/${row.spec.claimRef.name}` : ''
      },
    },
    {
      title: 'Status',
      key: 'status',
      render(row: V1PersistentVolume) {
        return row.status.phase
      },
    },
    {
      title: 'Age',
      key: 'age',
      render(row: V1PersistentVolume) {
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
      render(row: V1PersistentVolume) {
        return h(PersistentVolumeActionView,
          {
            persistentVolume: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.persistentVolumeControllerList()
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.persistentVolumeControllerDelete({ requestBody: keys })
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
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.PersistentVolume))
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="false"
    name="Persistent Volume"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>

<style scoped>

</style>
