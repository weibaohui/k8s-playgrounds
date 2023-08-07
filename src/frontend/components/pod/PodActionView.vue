<script setup lang="ts">
import { Edit, StickyNoteRegular, Terminal, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '../../../backend/model/actionMenu'
import MonacoView from '../../components/common/MonacoView.vue'
import MultipleMenuActionView from '../../components/common/MultipleMenuActionView.vue'
import PodExecView from '../../components/pod/PodExecView.vue'
import PodLogView from '../../components/pod/PodLogView.vue'
import { useDrawerService } from '../../service/drawer-service/use-drawer'
import { K8sService } from '../../service/k8s/K8sService'
import { DrawerHelper } from '../../service/page/DrawerHelper'

import { V1Pod } from '../../../backend/k8s/model/V1Pod'

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
