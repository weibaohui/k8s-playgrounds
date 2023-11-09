<script setup lang="ts">
import type { PortForward } from '@backend/model/PortForward'
import { TimerUtils } from '@backend/utils/TimerUtils'
import PortForwardActionView from '@frontend/components/PortFoward/PortForwardActionView.vue'
import PortForwardStatusText from '@frontend/components/PortFoward/PortForwardStatusText.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import moment from 'moment/moment'
import type { DataTableColumns } from 'naive-ui'
import { useDialog } from 'naive-ui'
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'

const drawer = useDrawerService()
const dialog = useDialog()

const selectedNs = ref('default')
const itemList = ref<PortForward[]>()
const searchText = ref('')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<PortForward> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'type',
      key: 'type',
    }, {
      title: 'Namespace',
      key: 'metadata.namespace',
    },
    {
      title: 'Name',
      key: 'metadata.name',
    },
    {
      title: 'KubePort',
      key: 'kubePort',
    }, {
      title: 'LocalPort',
      key: 'localPort',
    },
    {
      title: 'Status',
      key: 'status',
      render(row: PortForward) {
        return h(PortForwardStatusText,
          {
            pf: row,
          },
        )
      },
    },
    {
      title: 'LastProbe',
      key: 'statusTimestamp',
      render(row: PortForward) {
        return moment(row.statusTimestamp).fromNow()
      },
    },
    {
      title: 'Age',
      key: 'age',
      render(row: PortForward) {
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
      render(row: PortForward) {
        return h(PortForwardActionView,
          {
            pdb: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.shellControllerList()
  if (!_.isEmpty(searchText.value))
    itemList.value = itemList.value.filter(r => r.metadata.name.includes(searchText.value))
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.shellControllerKill({ requestBody: keys })
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

getItemList()

let timerId = 0
onMounted(async () => {
  timerId = TimerUtils.everyTwoSeconds(async () => {
    await getItemList()
  })
})

onBeforeUnmount(() => {
  clearInterval(timerId)
})
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    name="Port Forwards"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
    @on-ns-changed="onNsChanged"
  />
</template>

<style scoped>

</style>
