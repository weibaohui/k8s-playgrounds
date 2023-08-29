<script setup lang="ts">
import { V1ConfigMap } from '@backend/k8s/model/V1ConfigMap'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  cm: V1ConfigMap,
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
      action: () => DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.cm.metadata.name, MonacoView, { item: props.cm }),
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.cm.metadata.namespace}/${props.cm.metadata.name}`, async () => {
          await K8sService.playService.configmapControllerDelete({ requestBody: [`${props.cm.metadata.namespace}/${props.cm.metadata.name}`] })
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
