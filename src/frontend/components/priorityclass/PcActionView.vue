<script setup lang="ts">
import { V1PriorityClass } from '@backend/k8s/model/V1PriorityClass'
import { ResType } from '@backend/k8s/watch/watch.model'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, Lock, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
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

function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'SetDefault',
      key: 'SetDefault',
      icon: Lock,
      action: async () => {
        await K8sService.playService.priorityClassControllerSetUniqueDefault({ name: props.pc.metadata.name })
        message.success('设置成功')
        drawer.close()
      },
    },
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: async () => {
        await DrawerHelper.instance.drawer(drawer).showResourceEditor({
          resType: ResType.PriorityClass,
          ns: props.pc.metadata.namespace,
          name: props.pc.metadata.name,
        })
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
