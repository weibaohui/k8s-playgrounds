<script setup lang="ts">
import { V1PriorityClass } from '@backend/k8s/model/v1PriorityClass'
import { ResType } from '@backend/k8s/watch/watch.model'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, Lock, LockOpen, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  pc: V1PriorityClass,
  isDropdown: Boolean,
})

const dialog = useDialog()
const drawer = useDrawerService()
const message = useMessage()
function isDefault() {
  return !(props.pc.globalDefault === undefined)
}
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'SetDefault',
      key: 'SetDefault',
      icon: Lock,
      show: !isDefault(),
      action: async () => {
        const item = await K8sService.playService.priorityClassControllerSetDefault({ name: props.pc.metadata.name })
        if (item.globalDefault === true)
          message.success('设置成功')
        else
          message.error('设置失败')
      },
    },
    {
      label: 'CancelDefault',
      key: 'CancelDefault',
      icon: LockOpen,
      show: isDefault(),
      action: async () => {
        const item: V1PriorityClass = await K8sService.playService.priorityClassControllerCancelDefault({ name: props.pc.metadata.name })
        if (item.globalDefault === undefined)
          message.success('设置成功')
        else
          message.error('设置失败')
      },
    },
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: async () => {
        const resource = await K8sService.getResource({
          resType: ResType.PriorityClass,
          ns: props.pc.metadata.namespace,
          name: props.pc.metadata.name,
        })
        DrawerHelper
          .instance
          .drawer(drawer)
          .showWider(props.pc.metadata.name, MonacoView, { item: resource })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.pc.metadata.name}`, async () => {
          await K8sService.playService.priorityClassControllerDelete({ requestBody: [`${props.pc.metadata.name}`] })
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
