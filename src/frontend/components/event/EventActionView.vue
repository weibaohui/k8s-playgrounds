<script setup lang="ts">
import { Edit } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '../../../backend/model/actionMenu'
import MonacoView from '../../components/common/MonacoView.vue'
import MultipleMenuActionView from '../../components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '../../service/drawer-service/use-drawer'
import { DrawerHelper } from '../../service/page/DrawerHelper'
import { V1Event } from '../../../backend/k8s/model/V1Event'

const props = defineProps({
  event: V1Event,
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
        .showWider(props.event.metadata.name, MonacoView, { item: props.event }),
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
