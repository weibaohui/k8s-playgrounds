<script setup lang="ts">
import { TimerUtils } from '@main/utils/TimerUtils'
import WorkloadListView from '@render/components/common/ResourceListView.vue'
import EventInvolvedClickAction from '@render/components/event/EventInvolvedClickAction.vue'
import EventLastSeen from '@render/components/event/EventLastSeen.vue'
import EventMessageView from '@render/components/event/EventMessageView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NSpace } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Event } from '../../../model/V1Event'
import type { V1Namespace } from '../../../model/V1Namespace'
import type { V1Pod } from '../../../model/V1Pod'

const drawer = useDrawerService()
const itemList = ref<V1Event[]>()
const selectedNs = ref('default')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

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
              getItemList()
              workloadListViewRef.value.setNsSelected(selectedNs.value)
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

async function getItemList() {
  itemList.value = await K8sService.eventService.getEventList(selectedNs.value)
}

async function onRemoveBtnClicked(keys: string[]) {

}

function onNsChanged(ns: string) {
  selectedNs.value = ns
  getItemList()
}
function onTextChanged(text: string) {
  if (_.isEmpty(text)) {
    getItemList()
    return
  }
  itemList.value = itemList.value.filter(r => r.message.includes(text))
}
getItemList()
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, 'event', selectedNs))
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    @on-ns-changed="onNsChanged"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>

<style scoped>

</style>
