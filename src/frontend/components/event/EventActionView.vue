<script setup lang="ts">
import { ResType } from '@backend/k8s/watch/watch.model'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, Trash } from '@vicons/fa'
import { useDialog } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import { V1Event } from '@backend/k8s/model/V1Event'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  event: V1Event,
  isDropdown: Boolean,
})

const dialog = useDialog()
const drawer = useDrawerService()
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: async () => {
        await DrawerHelper.instance.drawer(drawer).showResourceEditor({
          resType: ResType.Event,
          ns: props.event.metadata.namespace,
          name: props.event.metadata.name,
        })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.event.metadata.namespace}/${props.event.metadata.name}`, async () => {
          await K8sService.playService.eventControllerDelete({ requestBody: [`${props.event.metadata.namespace}/${props.event.metadata.name}`] })
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
