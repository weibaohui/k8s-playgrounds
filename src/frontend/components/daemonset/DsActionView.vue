<script setup lang="ts">
import { V1DaemonSet } from '@backend/k8s/model/V1DaemonSet'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, RedoAlt, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  ds: V1DaemonSet,
  isDropdown: Boolean,
})

const dialog = useDialog()
const drawer = useDrawerService()
const message = useMessage()

function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Restart',
      key: 'Restart',
      icon: RedoAlt,
      action: async () => {
        await K8sService.playService.daemonSetControllerRestart({ ns: props.ds.metadata.namespace, name: props.ds.metadata.name })
        message.success('重启成功')
      },
    },
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: () => DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.ds.metadata.name, MonacoView, { item: props.ds }),
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.ds.metadata.namespace}/${props.ds.metadata.name}`, async () => {
          await K8sService.playService.daemonSetControllerDelete({ requestBody: [`${props.ds.metadata.namespace}/${props.ds.metadata.name}`] })
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
