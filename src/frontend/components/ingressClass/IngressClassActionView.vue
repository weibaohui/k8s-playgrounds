<script setup lang="ts">
import { V1IngressClass } from '@backend/k8s/model/v1IngressClass'
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
  ingressClass: V1IngressClass,
  isDropdown: Boolean,
})
const message = useMessage()
const dialog = useDialog()
const drawer = useDrawerService()
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'SetDefault',
      key: 'SetDefault',
      icon: Lock,
      action: async () => {
        await K8sService.playService.ingressClassControllerSetUniqueDefault({ name: props.ingressClass.metadata.name })
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
          resType: ResType.IngressClass,
          ns: props.ingressClass.metadata.namespace,
          name: props.ingressClass.metadata.name,
        })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `Namespace：${props.ingressClass.metadata.name}`, async () => {
          await K8sService.playService.ingressClassControllerDelete({ requestBody: [`${props.ingressClass.metadata.namespace}`] })
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
