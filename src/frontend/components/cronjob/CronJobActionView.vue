<script setup lang="ts">
import { V1CronJob } from '@backend/k8s/model/v1CronJob'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { Edit, PauseCircleRegular, PlayCircleRegular, Trash } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'

const props = defineProps({
  cj: V1CronJob,
  isDropdown: Boolean,
})

const dialog = useDialog()
const drawer = useDrawerService()
const message = useMessage()

function isSuspended() {
  return props.cj && props.cj.spec && props.cj.spec.suspend === true
}

function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Trigger',
      key: 'Trigger',
      icon: Edit,
      action: () => {
        K8sService.playService.cronJobControllerTrigger({
          ns: props.cj.metadata.namespace,
          name: props.cj.metadata.name,
        })
        message.success('Job创建成功')
      },
    },
    {
      label: 'Suspend',
      key: 'Suspend',
      icon: PauseCircleRegular,
      show: !isSuspended(),
      action: async () => {
        const n = await K8sService.playService.cronJobControllerSuspend({
          ns: props.cj.metadata.namespace,
          name: props.cj.metadata.name,
        })
        if (n.spec.suspend)
          message.success('操作成功')
        else
          message.warning('操作失败')

        drawer.close()
      },
    },
    {
      label: 'Resume',
      key: 'Resume',
      icon: PlayCircleRegular,
      show: isSuspended(),
      action: async () => {
        const n = await K8sService.playService.cronJobControllerResume({
          ns: props.cj.metadata.namespace,
          name: props.cj.metadata.name,
        })
        if (n.spec === null || n.spec === undefined || n.spec.suspend === null || n.spec.suspend === false)
          message.success('操作成功')
        else
          message.warning('操作失败')

        drawer.close()
      },
    },
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: () => DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.cj.metadata.name, MonacoView, { item: props.cj }),
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.cj.metadata.namespace}/${props.cj.metadata.name}`, async () => {
          await K8sService.playService.cronJobControllerDelete({ requestBody: [`${props.cj.metadata.namespace}/${props.cj.metadata.name}`] })
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
