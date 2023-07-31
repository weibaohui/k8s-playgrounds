<script setup lang="ts">
import MonacoView from '@render/components/common/MonacoView.vue'
import PodExecView from '@render/components/pod/PodExecView.vue'
import PodLogView from '@render/components/pod/PodLogView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import { Edit, StickyNoteRegular, Terminal, Trash } from '@vicons/fa'
import { NButton, NDropdown, NIcon, useDialog, useMessage } from 'naive-ui'
import type { Component } from 'vue'
import { h } from 'vue'

import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})

const dialog = useDialog()
const message = useMessage()
const drawer = useDrawerService()

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}
async function deletePod(pod: V1Pod) {
  dialog.warning({
    title: '警告',
    content: `你确定删除Pod：${pod.metadata.namespace}/${pod.metadata.name}吗?`,
    positiveText: '删除',
    negativeText: '放弃',
    onPositiveClick: async () => {
      await K8sService.podService.deletePods([`${pod.metadata.namespace}/${pod.metadata.name}`])
      drawer.close()
    },
    onNegativeClick: () => {
      message.error('放弃删除')
    },
  })
}
function handleSelect(key: string) {
  switch (key) {
    case 'Shell':
      DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.pod.metadata.name, PodExecView, { pod: props.pod })
      break
    case 'Log':
      DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.pod.metadata.name, PodLogView, { pod: props.pod })
      break
    case 'Delete':
      deletePod(props.pod)
      break
    case 'Edit':
      DrawerHelper
        .instance
        .drawer(drawer)
        .showWider(props.pod.metadata.name, MonacoView, { item: props.pod })
      break
    default:
      alert('尚未实现')
  }
}
const options = [
  {
    label: 'Shell',
    key: 'Shell',
    icon: renderIcon(Terminal),
  },
  {
    label: 'Log',
    key: 'Log',
    icon: renderIcon(StickyNoteRegular),
  },
  {
    label: 'Edit',
    key: 'Edit',
    icon: renderIcon(Edit),
  },
  {
    label: 'Delete',
    key: 'Delete',
    icon: renderIcon(Trash),
  },
]
</script>

<template>
  <NDropdown trigger="hover" :options="options" @select="handleSelect">
    <NButton text>
      ┇
    </NButton>
  </NDropdown>
</template>

<style scoped>
</style>
