<script setup lang="ts">
import { V1PersistentVolumeClaim } from '@backend/k8s/model/V1PersistentVolumeClaim'
import { ResType } from '@backend/k8s/watch/watch.model'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, Trash } from '@vicons/fa'
import { useDialog } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  pvc: V1PersistentVolumeClaim,
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
          resType: ResType.PersistentVolumeClaim,
          ns: props.pvc.metadata.namespace,
          name: props.pvc.metadata.name,
        })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.pvc.metadata.namespace}/${props.pvc.metadata.name}`, async () => {
          await K8sService.playService.persistentVolumeClaimControllerDelete({ requestBody: [`${props.pvc.metadata.namespace}/${props.pvc.metadata.name}`] })
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
