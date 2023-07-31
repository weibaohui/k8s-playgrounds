<script setup lang="ts">
import { TimeAge } from '@main/utils/timeAge'
import { TimerUtils } from '@main/utils/TimerUtils'
import NsLabelsView from '@render/components/ns/NsLabelsView.vue'
import NsView from '@render/components/ns/NsView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NSpace } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Namespace } from '../../../model/V1Namespace'

const drawer = useDrawerService()

const columns = createColumns()
const nsList = ref<V1Namespace[]>()

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

async function getNsList() {
  nsList.value = await K8sService.namespaceService.getNamespaceList()
}

function rowKey(row: V1Namespace) {
  return `${row.metadata.name}`
}
getNsList()
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(nsList, 'ns'))
</script>

<template>
  <NDataTable
    :columns="columns"
    :data="nsList"
    :pagination="false"
    :bordered="false"
    :row-key="rowKey"
  />
</template>

<style scoped>

</style>
