<script setup lang="ts">
import { ResType } from '@backend/k8s/watch/watch.model'
import StorageClassActionView from '@frontend/components/StorageClass/StorageClassActionView.vue'
import StorageClassIsDefaultView from '@frontend/components/StorageClass/StorageClassIsDefaultView.vue'
import StorageClassView from '@frontend/components/StorageClass/StorageClassView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, useDialog } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import { TimerUtils } from '@backend/utils/TimerUtils'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import type { V1StorageClass } from '@backend/k8s/model/V1StorageClass'

const drawer = useDrawerService()
const dialog = useDialog()
const itemList = ref<V1StorageClass[]>()

const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V1StorageClass> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1StorageClass) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`${ResType.StorageClass}:${row.metadata.name}`, StorageClassView, { storageClass: row })
            },
          },
          { default: () => row.metadata.name },
        )
      },
    },
    {
      title: 'Default',
      key: 'Default',
      render(row: V1StorageClass) {
        return h(StorageClassIsDefaultView,
          {
            storageClass: row,
          },
        )
      },
    },
    {
      title: 'Provisioner',
      key: 'provisioner',
      render(row: V1StorageClass) {
        return row.provisioner
      },
    },
    {
      title: 'Reclaim Policy',
      key: 'reclaimPolicy',
      render(row: V1StorageClass) {
        return row.reclaimPolicy
      },
    },
    {
      title: 'Age',
      key: 'age',
      render(row: V1StorageClass) {
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
      render(row: V1StorageClass) {
        return h(StorageClassActionView,
          {
            storageClass: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.storageClassControllerList()
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.storageClassControllerDelete({ requestBody: keys })
  })
}

function onTextChanged(text: string) {
  if (_.isEmpty(text)) {
    getItemList()
    return
  }
  itemList.value = itemList.value.filter(r => r.metadata.name.includes(text))
}
onMounted(() => {
  TimerUtils.runOnceThenDelayTwoSeconds(getItemList,
    () => K8sService.watchService.watchChange(itemList, ResType.StorageClass))
})
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="false"
    name="Storage Classes"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>

<style scoped>

</style>
