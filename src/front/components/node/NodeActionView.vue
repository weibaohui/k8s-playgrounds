<script setup lang="ts">
import { Edit, FireExtinguisher, PauseCircleRegular, PlayCircleRegular, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '../../../backend/model/actionMenu'
import MonacoView from '../../components/common/MonacoView.vue'
import MultipleMenuActionView from '../../components/common/MultipleMenuActionView.vue'
import NodeDrainView from '../../components/node/NodeDrainView.vue'
import { useDrawerService } from '../../service/drawer-service/use-drawer'
import { K8sService } from '../../service/k8s/K8sService'
import { DrawerHelper } from '../../service/page/DrawerHelper'

import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
  isDropdown: Boolean,

})
const drawer = useDrawerService()
const dialog = useDialog()
const message = useMessage()
function isUnSchedulable() {
  return props.node && props.node.spec && props.node.spec.unschedulable === true
}
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Cordon',
      key: 'Cordon',
      icon: PauseCircleRegular,
      show: !isUnSchedulable(),
      action: async () => {
        const n = await K8sService.nodeService.cordonNode(props.node.metadata.name)
        if (n.spec.unschedulable)
          message.success('操作成功')
        else
          message.warning('操作失败')
        drawer.close()
      },
    },
    {
      label: 'UnCordon',
      key: 'UnCordon',
      icon: PlayCircleRegular,
      show: isUnSchedulable(),
      action: async () => {
        const n = await K8sService.nodeService.unCordonNode(props.node.metadata.name)
        if (n.spec === null || n.spec === undefined || n.spec.unschedulable === null || n.spec.unschedulable === undefined || n.spec.unschedulable === false)
          message.success('操作成功')
        else
          message.warning('操作失败')
        drawer.close()
      },
    },
    {
      label: 'Drain',
      key: 'Drain',
      icon: FireExtinguisher,
      action: () => {
        DrawerHelper
          .instance
          .drawer(drawer)
          .showWider(props.node.metadata.name, NodeDrainView, { node: props.node })
      },
    },
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: () => DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.node.metadata.name, MonacoView, { item: props.node }),
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () => {
        dialog.warning({
          title: '警告',
          content: `你确定删除Node：${props.node.metadata.name}吗?`,
          positiveText: '删除',
          negativeText: '放弃',
          onPositiveClick: async () => {
            await K8sService.nodeService.deleteNode(props.node.metadata.name)
            drawer.close()
          },
          onNegativeClick: () => {
            message.error('放弃删除')
          },
        })
      },
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
