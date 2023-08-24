<script setup lang="ts">
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, StickyNoteRegular, Terminal, Trash } from '@vicons/fa'
import { useDialog } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import PodExecView from '@frontend/components/pod/PodExecView.vue'
import PodLogView from '@frontend/components/pod/PodLogView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

import { V1Pod } from '@backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
  isDropdown: Boolean,
})

const dialog = useDialog()
const drawer = useDrawerService()
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Shell',
      key: 'Shell',
      icon: Terminal,
      action: () => DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.pod.metadata.name, PodExecView, { pod: props.pod }),
    },
    {
      label: 'Log',
      key: 'Log',
      icon: StickyNoteRegular,
      action: () => DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.pod.metadata.name, PodLogView, { pod: props.pod }),
    },
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: () => DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.pod.metadata.name, MonacoView, { item: props.pod }),
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `Pod：${props.pod.metadata.namespace}/${props.pod.metadata.name}`, async () => {
          await K8sService.playService.podControllerDeletePods({ requestBody: [`${props.pod.metadata.namespace}/${props.pod.metadata.name}`] })
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
