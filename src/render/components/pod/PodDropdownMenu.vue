<script setup lang="ts">
import PodExecView from '@render/components/pod/PodExecView.vue'
import PodLogView from '@render/components/pod/PodLogView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DeleteRound, EditNoteRound, FormatAlignLeftRound, TerminalRound } from '@vicons/material'
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
function showPodExecView(x: V1Pod) {
  drawer.showDrawer(
    {
      title: x.metadata.name,
      width: 1000,
    },
    h(PodExecView, { pod: x }),
  )
}
function showPodLogView(x: V1Pod) {
  drawer.showDrawer(
    {
      title: x.metadata.name,
      width: 1000,
    },
    h(PodLogView, { pod: x }),
  )
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
      showPodExecView(props.pod)
      break
    case 'Log':
      showPodLogView(props.pod)
      break
    case 'Delete':
      deletePod(props.pod)
      break
    default:
      alert('尚未实现')
  }
}
const options = [
  {
    label: 'Shell',
    key: 'Shell',
    icon: renderIcon(TerminalRound),
  },
  {
    label: 'Log',
    key: 'Log',
    icon: renderIcon(FormatAlignLeftRound),
  },
  {
    label: 'Edit',
    key: 'Edit',
    icon: renderIcon(EditNoteRound),
  },
  {
    label: 'Delete',
    key: 'Delete',
    icon: renderIcon(DeleteRound),
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
