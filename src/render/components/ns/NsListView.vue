<script setup lang="ts">
import { TimeAge } from '@main/utils/timeAge'
import { TimerUtils } from '@main/utils/TimerUtils'
import WorkloadListView from '@render/components/common/WorkloadListView.vue'
import NsLabelsView from '@render/components/ns/NsLabelsView.vue'
import NsView from '@render/components/ns/NsView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NSpace } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Namespace } from '../../../model/V1Namespace'

const drawer = useDrawerService()

const itemList = ref<V1Namespace[]>()

const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V1Namespace> {
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
                .show(row.metadata.name, NsView, { ns: row })
            },
          },
          { default: () => (row as V1Namespace).metadata.name },
        )
      },
    },
    {
      title: 'Labels',
      key: 'Labels',
      render(row) {
        return h(
          NsLabelsView, { ns: row },
        )
      },
    },
    {
      title: 'Age',
      key: 'age',
      render(row) {
        return h(
          NSpace,
          () => TimeAge.getK8sAge((row as V1Namespace).metadata.creationTimestamp),
        )
      },
    },
    {
      title: 'status',
      key: 'status.phase',
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.namespaceService.getNamespaceList()
}

async function onRemoveBtnClicked(keys: string[]) {
  await K8sService.podService.deletePods(keys)
}

function onTextChanged(text: string) {
  if (_.isEmpty(text)) {
    getItemList()
    return
  }
  itemList.value = itemList.value.filter(r => r.metadata.name.includes(text))
}

getItemList()
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, 'ns'))
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
