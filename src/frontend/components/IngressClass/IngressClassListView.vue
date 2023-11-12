<script setup lang="ts">
import { ResType } from '@backend/k8s/watch/watch.model'
import IngressClassActionView from '@frontend/components/IngressClass/IngressClassActionView.vue'
import IngressClassIsDefaultView from '@frontend/components/IngressClass/IngressClassIsDefaultView.vue'
import IngressClassView from '@frontend/components/IngressClass/IngressClassView.vue'
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
import type { V1IngressClass } from '@backend/k8s/model/V1IngressClass'

const drawer = useDrawerService()
const dialog = useDialog()
const itemList = ref<V1IngressClass[]>()

const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()

function createColumns(): DataTableColumns<V1IngressClass> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1IngressClass) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`${ResType.IngressClass}:${row.metadata.name}`, IngressClassView, { ingressClass: row })
            },
          },
          { default: () => row.metadata.name },
        )
      },
    },
    {
      title: 'Default',
      key: 'Default',
      render(row: V1IngressClass) {
        return h(IngressClassIsDefaultView,
          {
            ingressClass: row,
          },
        )
      },
    },
    {
      title: 'Controller',
      key: 'Controller',
      render(row: V1IngressClass) {
        return row.spec.controller
      },
    },
    {
      title: 'ApiGroup',
      key: 'ApiGroup',
      render(row: V1IngressClass) {
        return row.spec.parameters?.apiGroup
      },
    },
    {
      title: 'Scope',
      key: 'Scope',
      render(row: V1IngressClass) {
        return row.spec.parameters?.scope
      },
    },
    {
      title: 'Kind',
      key: 'Kind',
      render(row: V1IngressClass) {
        return row.spec.parameters?.kind
      },
    },
    {
      title: 'Age',
      key: 'age',
      render(row: V1IngressClass) {
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
      render(row: V1IngressClass) {
        return h(IngressClassActionView,
          {
            ingressClass: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.ingressClassControllerList()
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.ingressClassControllerDelete({ requestBody: keys })
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
  getItemList()
  TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.IngressClass))
})
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="false"
    name="Ingress Classes"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>

<style scoped>

</style>
