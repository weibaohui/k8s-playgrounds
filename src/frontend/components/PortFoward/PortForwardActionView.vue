<script setup lang="ts">
import { PortForward } from '@backend/model/PortForward'
import { Edit } from '@vicons/fa'
import { useDialog } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'

const props = defineProps({
  pdb: PortForward,
  isDropdown: Boolean,
})

const dialog = useDialog()
const drawer = useDrawerService()
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Open',
      key: 'Open',
      icon: Edit,
      action: async () => {
        console.log(`open ${props.pdb.localPort}`)
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

<style scoped>
</style>
