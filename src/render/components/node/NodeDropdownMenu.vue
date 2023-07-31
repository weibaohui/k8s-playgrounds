<script setup lang="ts">
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { PauseCircleRegular, PlayCircleRegular, Terminal, Trash } from '@vicons/fa'

import { NButton, NDropdown, NIcon, useDialog, useMessage } from 'naive-ui'
import type { Component } from 'vue'
import { h } from 'vue'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
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

async function cordonNode(node: V1Node) {
  const n = await K8sService.nodeService.cordonNode(node.metadata.name)
  if (n.spec.unschedulable)
    message.success('操作成功')
  else
    message.warning('操作失败')
}
async function deleteNode(node: V1Node) {
  dialog.warning({
    title: '警告',
    content: `你确定删除Node：${node.metadata.name}吗?`,
    positiveText: '删除',
    negativeText: '放弃',
    onPositiveClick: async () => {
      const n = await K8sService.nodeService.deleteNode(node.metadata.name)
      if (n.status === 'Success')
        message.success('操作成功')
      else
        message.warning('操作失败')
    },
    onNegativeClick: () => {
      message.error('放弃删除')
    },
  })
}

async function unCordonNode(node: V1Node) {
  const n = await K8sService.nodeService.unCordonNode(node.metadata.name)
  if (n.spec === null || n.spec === undefined || n.spec.unschedulable === null || n.spec.unschedulable === undefined || n.spec.unschedulable === false)
    message.success('操作成功')
  else
    message.warning('操作失败')
}

function handleSelect(key: string) {
  switch (key) {
    case 'Shell':
      alert('尚未实现')
      break
    case 'Cordon':
      cordonNode(props.node)
      break
    case 'UnCordon':
      unCordonNode(props.node)
      break
    case 'Delete':
      deleteNode(props.node)
      break
    default:
      alert('尚未实现')
  }
}

function getCordonOption() {
  if (props.node.spec && props.node.spec.unschedulable && props.node.spec.unschedulable === true) {
    return {
      label: 'UnCordon',
      key: 'UnCordon',
      icon: renderIcon(PlayCircleRegular),
    }
  }
  else {
    return {
      label: 'Cordon',
      key: 'Cordon',
      icon: renderIcon(PauseCircleRegular),
    }
  }
}

function options() {
  return [
    getCordonOption(),
    {
      label: 'Shell',
      key: 'Shell',
      icon: renderIcon(Terminal),
    },

    {
      label: 'Delete',
      key: 'Delete',
      icon: renderIcon(Trash),
    },
  ]
}
</script>

<template>
  <NDropdown trigger="hover" :options="options()" @select="handleSelect">
    <NButton text>
      ┇
    </NButton>
  </NDropdown>
</template>

<style scoped>
</style>
