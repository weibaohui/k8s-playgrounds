<script setup lang="ts">
import { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import { Edit, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  rs: V1ReplicaSet,
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
        .showWider(props.rs.metadata.name, MonacoView, { item: props.rs }),
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () => dialog.warning({
        title: '警告',
        content: `你确定删除：${props.rs.metadata.name}吗?`,
        positiveText: '删除',
        negativeText: '放弃',
        onPositiveClick: async () => {
          await K8sService.replicasetService.delete([`${props.rs.metadata.namespace}/${props.rs.metadata.name}`])
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
