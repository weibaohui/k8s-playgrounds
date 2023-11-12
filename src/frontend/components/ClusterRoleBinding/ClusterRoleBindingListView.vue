<script setup lang="ts">
import type { V1ClusterRoleBinding } from '@backend/k8s/model/V1ClusterRoleBinding'
import { ResType } from '@backend/k8s/watch/watch.model'
import { TimerUtils } from '@backend/utils/TimerUtils'
import ClusterRoleBindingActionView from '@frontend/components/ClusterRoleBinding/ClusterRoleBindingActionView.vue'
import ClusterRoleBindingView from '@frontend/components/ClusterRoleBinding/ClusterRoleBindingView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, useDialog } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'

const drawer = useDrawerService()
const dialog = useDialog()

const itemList = ref<V1ClusterRoleBinding[]>()
const searchText = ref('')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V1ClusterRoleBinding> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1ClusterRoleBinding) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`${ResType.ClusterRoleBinding}:${row.metadata.name}`, ClusterRoleBindingView, { clusterRoleBinding: row })
            },
          },
          { default: () => row.metadata.name },
        )
      },
    },

    {
      title: 'Value',
      key: 'value',
    },
    {
      title: 'Age',
      key: 'age',
      render(row) {
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
      render(row: V1ClusterRoleBinding) {
        return h(ClusterRoleBindingActionView,
          {
            clusterRoleBinding: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.clusterRoleBindingControllerList()
  if (!_.isEmpty(searchText.value))
    itemList.value = itemList.value.filter(r => r.metadata.name.includes(searchText.value))
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.clusterRoleBindingControllerDelete({ requestBody: keys })
  })
}

function onTextChanged(text: string) {
  searchText.value = text
  if (!_.isEmpty(searchText.value))
    itemList.value = itemList.value.filter(r => r.metadata.name.includes(searchText.value))
}
onMounted(() => {
  TimerUtils.runOnceThenDelayTwoSeconds(getItemList,
    () => K8sService.watchService.watchChange(itemList, ResType.ClusterRoleBinding),
  )
})
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="false"
    name="Cluster Role Bindings"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>

<style scoped>

</style>
