<script setup lang="ts">
import { PortForward } from '@backend/model/PortForward'
import { Chrome, Copy } from '@vicons/fa'
import { useDialog, useMessage } from 'naive-ui'
import type { ActionMenuOption } from '@backend/model/actionMenu'
import MultipleMenuActionView from '@frontend/components/common/MultipleMenuActionView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'

const props = defineProps({
  pdb: PortForward,
  isDropdown: Boolean,
})
const message = useMessage()
const dialog = useDialog()
const drawer = useDrawerService()
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      message.success(`${text}已复制到剪贴板`)
    })
    .catch((error) => {
      console.error(`${text}复制文本到剪贴板时出错:${error}`)
    })
}
function getOptions(): ActionMenuOption[] {
  return [
    {
      label: 'Http Open',
      key: 'HttpOpen',
      icon: Chrome,
      action: async () => {
        window.open(`http://127.0.0.1:${props.pdb.localPort}`)
      },
    },
    {
      label: 'Https Open',
      key: 'HttpsOpen',
      icon: Chrome,
      action: async () => {
        window.open(`https://127.0.0.1:${props.pdb.localPort}`)
      },
    },
    {
      label: 'Http Copy',
      key: 'HttpCopyUrl',
      icon: Copy,
      action: async () => {
        copyToClipboard(`http://127.0.0.1:${props.pdb.localPort}`)
      },
    },
    {
      label: 'Https Copy',
      key: 'HttpsCopyUrl',
      icon: Copy,
      action: async () => {
        copyToClipboard(`https://127.0.0.1:${props.pdb.localPort}`)
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
