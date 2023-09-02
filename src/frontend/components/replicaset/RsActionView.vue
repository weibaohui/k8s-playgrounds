<script setup lang="ts">
import { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import { ResType } from '@backend/k8s/watch/watch.model'
import { DialogHelper } from '@frontend/service/page/DialogHelper'
import { Edit, Trash } from '@vicons/fa'
import { useDialog } from 'naive-ui'
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
const drawer = useDrawerService()
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Edit',
      key: 'Edit',
      icon: Edit,
      action: async () => {
        const resource = await K8sService.getResource({
          resType: ResType.ReplicaSet,
          ns: props.rs.metadata.namespace,
          name: props.rs.metadata.name,
        })
        DrawerHelper
          .instance
          .drawer(drawer)
          .showWider(props.rs.metadata.name, MonacoView, { item: resource })
      },
    },
    {
      label: 'Delete',
      key: 'Delete',
      icon: Trash,
      action: () =>
        DialogHelper.instance.dialog(dialog).confirmWithTarget('删除', `${props.rs.metadata.namespace}/${props.rs.metadata.name}`, async () => {
          await K8sService.playService.replicaSetControllerDelete({ requestBody: [`${props.rs.metadata.namespace}/${props.rs.metadata.name}`] })
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
