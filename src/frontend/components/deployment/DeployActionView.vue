<script setup lang="ts">
import { V1Deployment } from '@backend/k8s/model/V1Deployment'
import { ResType } from '@backend/k8s/watch/watch.model'
import DeployScaleView from '@frontend/components/deployment/DeployScaleView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, ExpandArrowsAlt, RedoAlt, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  deploy: V1Deployment,
  isDropdown: Boolean,
})

const dialog = useDialog()
const message = useMessage()
const drawer = useDrawerService()
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Scale',
      key: 'Scale',
      icon: ExpandArrowsAlt,
      action: async () => DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Scale Deployment:${props.deploy.metadata.name}`, DeployScaleView, { deploy: props.deploy }),
    },
    {
      label: 'Restart',
      key: 'Restart',
      icon: RedoAlt,
      action: async () => {
        await K8sService.playService.deploymentControllerRestart({ ns: props.deploy.metadata.namespace, name: props.deploy.metadata.name })
        message.success('重启成功')
      },
    },
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: async () => {
        const resource = await K8sService.getResource({
          resType: ResType.Deployment,
          ns: props.deploy.metadata.namespace,
          name: props.deploy.metadata.name,
        })
        DrawerHelper
          .instance
          .drawer(drawer)
          .showWider(props.deploy.metadata.name, MonacoView, { item: resource })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.deploy.metadata.namespace}/${props.deploy.metadata.name}`, async () => {
          await K8sService.playService.deploymentControllerDelete({ requestBody: [`${props.deploy.metadata.namespace}/${props.deploy.metadata.name}`] })
          drawer.close()
        }),
    },
  ]
}
</script>

<template>
  <MultipleMenuActionView
    :is-dropdown="isDropdown"
    :menu-options="getOptions()"
  />
</template>

<style scoped>
</style>
