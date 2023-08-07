<script setup lang="ts">
import type { ActionMenuOption } from '@main/model/actionMenu'
import MonacoView from '@render/components/common/MonacoView.vue'
import MultipleMenuActionView from '@render/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import { Edit } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import { V1Event } from '../../../model/V1Event'

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
