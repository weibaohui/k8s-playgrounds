<script setup lang="ts">
import { Edit, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '../../../backend/model/actionMenu'
import MonacoView from '../../components/common/MonacoView.vue'
import MultipleMenuActionView from '../../components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '../../service/drawer-service/use-drawer'
import { K8sService } from '../../service/k8s/K8sService'
import { DrawerHelper } from '../../service/page/DrawerHelper'
import { V1Namespace } from '../../../backend/k8s/model/V1Namespace'

const props = defineProps({
  ns: V1Namespace,
  isDropdown: Boolean,
})

const dialog = useDialog()
const message = useMessage()
const drawer = useDrawerService()
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: () => DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.ns.metadata.name, MonacoView, { item: props.ns }),
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () => dialog.warning({
        title: '警告',
        content: `你确定删除Namespace：${props.ns.metadata.name}吗?`,
        positiveText: '删除',
        negativeText: '放弃',
        onPositiveClick: async () => {
          await K8sService.namespaceService.deleteNamespaces([`${props.ns.metadata.namespace}`])
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
