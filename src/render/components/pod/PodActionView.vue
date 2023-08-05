<script setup lang="ts">
import type { ActionMenuOption } from '@main/model/actionMenu'
import MonacoView from '@render/components/common/MonacoView.vue'
import MultipleMenuActionView from '@render/components/common/MultipleMenuActionView.vue'
import PodExecView from '@render/components/pod/PodExecView.vue'
import PodLogView from '@render/components/pod/PodLogView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import { Edit, StickyNoteRegular, Terminal, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'

import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
  isDropdown: Boolean,
})

const dialog = useDialog()
const message = useMessage()
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
      action: () => dialog.warning({
        title: '警告',
        content: `你确定删除Pod：${props.pod.metadata.namespace}/${props.pod.metadata.name}吗?`,
        positiveText: '删除',
        negativeText: '放弃',
        onPositiveClick: async () => {
          await K8sService.podService.deletePods([`${props.pod.metadata.namespace}/${props.pod.metadata.name}`])
          drawer.close()
        },
        onNegativeClick: () => {
          message.error('放弃删除')
        },
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
