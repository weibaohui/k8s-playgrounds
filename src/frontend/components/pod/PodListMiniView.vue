<script lang="ts" setup>
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'
import ContainerReadyCount from '@frontend/components/container/ContainerReadyCount.vue'
import ContainerRestartCount from '@frontend/components/container/ContainerRestartCount.vue'
import ContainerStatusIcon from '@frontend/components/container/ContainerStatusIcon.vue'
import ContainerStatusText from '@frontend/components/container/ContainerStatusText.vue'
import PodView from '@frontend/components/pod/PodView.vue'
import PodWarnIcon from '@frontend/components/pod/PodWarnIcon.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NText } from 'naive-ui'
import { h, ref } from 'vue'

const props = defineProps({
  podList: Array<V1Pod>,
})

const drawer = useDrawerService()
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()
function createColumns(): DataTableColumns<V1Pod> {
  return [

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
                .show(`Pod:${row.metadata.name}`, PodView, { pod: row })
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
      title: 'Namespace',
      key: 'metadata.namespace',
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

  ]
}
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="props.podList"
    :mini-style="true"
    :show-ns-select="false"
    name="Pods"
  />
</template>
