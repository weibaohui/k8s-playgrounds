<script lang="ts" setup>
import type { V1Deployment } from '@backend/k8s/model/V1Deployment'
import { ResType } from '@backend/k8s/watch/watch.model'
import ResourceAgeView from '@frontend/components/common/ResourceAgeView.vue'
import DeployActionView from '@frontend/components/deployment/DeployActionView.vue'
import DeployConditionView from '@frontend/components/deployment/DeployConditionView.vue'
import DeployView from '@frontend/components/deployment/DeployView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import _ from 'lodash'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NText, useDialog } from 'naive-ui'
import { h, ref } from 'vue'
import { TimerUtils } from '@backend/utils/TimerUtils'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import WorkloadListView from '@frontend/components/common/ResourceListView.vue'
import PodWarnIcon from '@frontend/components/pod/PodWarnIcon.vue'

const drawer = useDrawerService()
const dialog = useDialog()
const itemList = ref<V1Deployment[]>()
const selectedNs = ref('default')
const workloadListViewRef = ref<InstanceType<typeof WorkloadListView>>()
function createColumns(): DataTableColumns<V1Deployment> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Namespace',
      key: 'metadata.namespace',
      render(row: V1Deployment) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              selectedNs.value = row.metadata.namespace
              workloadListViewRef.value.setNsSelected(selectedNs.value)
              getItemList()
            },
          },
          { default: () => row.metadata.namespace },
        )
      },
    },
    {
      title: 'Name',
      key: 'metadata.name',
      render(row: V1Deployment) {
        return h(
          NButton,
          {
            text: true,
            onClick: () => {
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(`Deployment:${row.metadata.name}`, DeployView, { deploy: row })
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
      title: 'Pods',
      key: 'Pods',
      render(row: V1Deployment) {
        return `${row.status.availableReplicas ? row.status.availableReplicas : 0}/${row.status.replicas ? row.status.replicas : 0}`
      },
    },
    {
      title: 'Replicas',
      key: 'Replicas',
      render(row: V1Deployment) {
        return row.status.replicas ? row.status.replicas : 0
      },
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
      title: 'Conditions',
      key: 'Conditions',
      render(row: V1Deployment) {
        return h(DeployConditionView,
          {
            deploy: row,
          },
        )
      },
    },
    {
      title: 'Action',
      key: 'Action',
      render(row: V1Deployment) {
        return h(DeployActionView,
          {
            deploy: row,
            isDropdown: true,
          },
        )
      },
    },
  ]
}

async function getItemList() {
  itemList.value = await K8sService.playService.deploymentControllerListByNs({ ns: selectedNs.value })
}

async function onRemoveBtnClicked(keys: string[]) {
  DialogHelper.instance.dialog(dialog).confirm('删除', async () => {
    await K8sService.playService.deploymentControllerDelete({ requestBody: keys })
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
  itemList.value = itemList.value.filter(r => r.metadata.name.includes(text))
}

getItemList()
TimerUtils.delayTwoSeconds(() => K8sService.watchService.watchChange(itemList, ResType.Deployments, selectedNs))
</script>

<template>
  <WorkloadListView
    ref="workloadListViewRef"
    :columns="createColumns()"
    :item-list="itemList"
    :show-ns-select="true"
    name="Deployments"
    @on-ns-changed="onNsChanged"
    @on-remove-btn-clicked="onRemoveBtnClicked"
    @on-text-changed="onTextChanged"
  />
</template>
