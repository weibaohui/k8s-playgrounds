<script setup lang="ts">
import { ResType } from '@backend/k8s/watch/watch.model'
import { TimeAge } from '@backend/utils/timeAge'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NSpace, NSwitch, useDialog } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Event } from '@backend/k8s/model/V1Event'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { TimerUtils } from '@backend/utils/TimerUtils'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'
import EventActionView from '@frontend/components/event/EventActionView.vue'
import EventInvolvedClickAction from '@frontend/components/event/EventInvolvedClickAction.vue'
import EventMessageView from '@frontend/components/event/EventMessageView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'

const dialog = useDialog()
const itemList = ref<V1Event[]>()
const selectedNs = ref('default')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()
const onlyWarning = ref(true)

function createColumns(): DataTableColumns<V1Event> {
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
      render(row: V1Event) {
        return h(EventMessageView, { event: row })
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
      minWidth: 200,

      render(row: V1Event) {
        return h(
          EventInvolvedClickAction,
          {
            event: row,
          },
        )
      },
    },
    {
      title: 'Source',
      key: 'Source',
      render(row: V1Event) {
        return h(
          NSpace,
          () => `${row.source.component} ${row.source.host}`,
        )
      },
    },
    {
      title: 'Count',
      key: 'count',
    },
    {
      title: 'Age',
      key: 'age',
      minWidth: '100px',
      render(row) {
        return h(ResourceAgeView,
          {
            item: row,
          },
        )
      },
    },
    {
      title: 'LastSeen',
      key: 'lastSeen',
      minWidth: '120px',
      render(row: V1Event) {
        return TimeAge.getK8sAge(row.lastTimestamp)
      },
    },
    {
      title: 'Action',
      key: 'Action',
      render(row: V1Event) {
        return h(EventActionView,
          {
            event: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  if (onlyWarning.value) {
    itemList.value = await K8sService.playService.eventControllerListWarningEventByNs({ ns: selectedNs.value })
    return
  }

  itemList.value = await K8sService.playService.eventControllerListByNs({ ns: selectedNs.value })
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.eventControllerDelete({ requestBody: keys })
  })
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
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.Event, selectedNs))
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    name="Events"
    @on-ns-changed="onNsChanged"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  >
    <template #tools>
      <NSwitch v-model:value="onlyWarning" @update:value="getItemList">
        <template #checked>
          warning
        </template>
        <template #unchecked>
          all
        </template>
      </NSwitch>
    </template>
  </WorkloadListView>
</template>

<style scoped>

</style>
