<script setup lang="ts">
import SearchFilter from '@render/components/common/SearchFilter.vue'
import EventInvolvedClickAction from '@render/components/event/EventInvolvedClickAction.vue'
import EventLastSeen from '@render/components/event/EventLastSeen.vue'
import EventMessageView from '@render/components/event/EventMessageView.vue'
import NsSelect from '@render/components/ns/NsSelect.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NFormItemGi, NGrid, NSpace } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Event } from '../../../model/V1Event'
import type { V1Namespace } from '../../../model/V1Namespace'
import type { V1Pod } from '../../../model/V1Pod'

const drawer = useDrawerService()
const nsSelectRef = ref<InstanceType<typeof NsSelect>>()
const selectedNs = ref('default')

const columns = createColumns()
const eventList = ref<V1Event[]>()

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
      render(row) {
        return h(EventMessageView, { event: row as V1Event })
      },
    },
    {
      title: 'Namespace',
      key: 'metadata.namespace',
      render(row) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              selectedNs.value = (row as V1Pod).metadata.namespace
              getEventList()
              nsSelectRef.value.setNsSelected(selectedNs.value)
            },
          },
          { default: () => (row as V1Pod).metadata.namespace },
        )
      },
    },
    {
      title: 'Involved',
      key: 'Involved',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
      render(row) {
        return h(
          EventInvolvedClickAction,
          {
            event: row as V1Event,
          },
        )
      },
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
          EventLastSeen,
          {
            event: row as V1Event,
          },
        )
      },
    },

  ]
}

async function getEventList() {
  eventList.value = await K8sService.eventService.getEventsList(selectedNs.value)
}

function onTextChanged(text: string) {
  if (_.isEmpty(text)) {
    getEventList()
    return
  }
  eventList.value = eventList.value.filter(r => r.message.includes(text))
}

function onNsChanged(ns: string) {
  selectedNs.value = ns
  getEventList()
}

function rowKey(row: V1Event) {
  return `${row.metadata.namespace}/${row.metadata.name}`
}
getEventList()
setTimeout(() => {
  K8sService.watchService.watchChange(eventList, 'event', selectedNs)
}, 2000)
</script>

<template>
  <NGrid :cols="24" :x-gap="24">
    <NFormItemGi :span="1" />
    <NFormItemGi :span="11">
      <NsSelect ref="nsSelectRef" @on-ns-changed="onNsChanged" />
    </NFormItemGi>
    <NFormItemGi :span="11">
      <SearchFilter placeholder="搜索Message" @on-text-changed="onTextChanged" />
    </NFormItemGi>
    <NFormItemGi :span="1" />
  </NGrid>
  <NDataTable
    :columns="columns"
    :data="eventList"
    :pagination="false"
    :bordered="false"
    :row-key="rowKey"
  />
</template>

<style scoped>

</style>
