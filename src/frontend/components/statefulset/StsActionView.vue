<script setup lang="ts">
import { V1StatefulSet } from '@backend/k8s/model/V1StatefulSet'
import { ResType } from '@backend/k8s/watch/watch.model'
import StsScaleView from '@frontend/components/statefulset/StsScaleView.vue'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, ExpandArrowsAlt, RedoAlt, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'

const props = defineProps({
  sts: V1StatefulSet,
  isDropdown: Boolean,
})

const dialog = useDialog()
const drawer = useDrawerService()
const message = useMessage()

function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Scale',
      key: 'Scale',
      icon: ExpandArrowsAlt,
      action: async () => DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Scale StatefulSet:${props.sts.metadata.name}`, StsScaleView, { sts: props.sts }),
    },
    {
      label: 'Restart',
      key: 'Restart',
      icon: RedoAlt,
      action: async () => {
        await K8sService.playService.statefulSetControllerRestart({ ns: props.sts.metadata.namespace, name: props.sts.metadata.name })
        message.success('重启成功')
      },
    },
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: async () => {
        await DrawerHelper.instance.drawer(drawer).showResourceEditor({
          resType: ResType.StatefulSet,
          ns: props.sts.metadata.namespace,
          name: props.sts.metadata.name,
        })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.sts.metadata.namespace}/${props.sts.metadata.name}`, async () => {
          await K8sService.playService.statefulSetControllerDelete({ requestBody: [`${props.sts.metadata.namespace}/${props.sts.metadata.name}`] })
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
