<script setup lang="ts">
import { V1MutatingWebhookConfiguration } from '@backend/k8s/model/V1MutatingWebhookConfiguration'
import { ResType } from '@backend/k8s/watch/watch.model'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  mw: V1MutatingWebhookConfiguration,
  isDropdown: Boolean,
})

const dialog = useDialog()
const drawer = useDrawerService()
const message = useMessage()

function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: async () => {
        await DrawerHelper.instance.drawer(drawer).showResourceEditor({
          resType: ResType.MutatingWebhookConfiguration,
          ns: props.mw.metadata.namespace,
          name: props.mw.metadata.name,
        })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.mw.metadata.name}`, async () => {
          await K8sService.playService.mutatingWebhookControllerDelete({ requestBody: [`${props.mw.metadata.name}`] })
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
