<script setup lang="ts">
import { ResType } from '@backend/k8s/watch/watch.model'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, FireExtinguisher, PauseCircleRegular, PlayCircleRegular, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import { V1Node } from '@backend/k8s/model/V1Node'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import NodeDrainView from '@frontend/components/node/NodeDrainView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

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
        const n = await K8sService.playService.nodeControllerCordon({ name: props.node.metadata.name })
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
        const n = await K8sService.playService.nodeControllerUnCordon({ name: props.node.metadata.name })
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
      action: async () => {
        await DrawerHelper.instance.drawer(drawer).showResourceEditor({
          resType: ResType.Node,
          ns: props.node.metadata.namespace,
          name: props.node.metadata.name,
        })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `Node：${props.node.metadata.name}`, async () => {
          await K8sService.playService.nodeControllerDelete({ name: props.node.metadata.name })
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
