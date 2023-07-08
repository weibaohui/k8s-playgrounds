<script setup lang="ts">
import { TimeAge } from '@main/utils/timeAge'
import EventMessageView from '@render/components/event/EventMessageView.vue'
import EventView from '@render/components/event/EventView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NSpace } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Event } from '../../../model/V1Event'
import type { V1Namespace } from '../../../model/V1Namespace'

const drawer = useDrawerService()

async function showEventView(x: V1Event) {
  drawer.showDrawer({
    title: x.metadata.name,
    width: 800,
  },
  h(EventView, { event: x }),
  )
}

const columns = createColumns()
const eventList = ref<V1Event[]>()
const checkedRowKeysRef = ref<string[]>([])

function createColumns(): DataTableColumns<V1Namespace> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Type',
      key: 'type',
      width: 80,
    },
    {
      title: 'Message',
      key: 'message',
      width: 300,
      ellipsis: {
        tooltip: true,
      },
      render(row) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              showEventView(row)
            },
          },
          () => h(EventMessageView, { item: row as V1Event }),
        )
      },
    },
    {
      title: 'Namespace',
      key: 'metadata.namespace',
    },
    {
      title: 'Source',
      key: 'Source',
      render(row) {
        return h(
          NSpace,
          () => `${(row as V1Event).source.component} ${(row as V1Event).source.host}`,
        )
      },
    },
    {
      title: 'Count',
      key: 'count',
    },
    {
      title: 'LastSeen',
      key: 'LastSeen',
      render(row) {
        return h(
          NSpace,
          () => TimeAge.getK8sAge((row as V1Event).lastTimestamp),
        )
      },
    },

  ]
}

async function getEventList() {
  eventList.value = await K8sService.eventService.getEventsList('null')
}
getEventList()
</script>

<template>
  <NDataTable
    :columns="columns"
    :data="eventList"
    :pagination="false"
    :bordered="false"
  />
</template>

<style scoped>

</style>
