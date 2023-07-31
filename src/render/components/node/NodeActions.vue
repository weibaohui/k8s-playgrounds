<script setup lang="ts">
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { PauseCircleRegular, PlayCircleRegular, Trash } from '@vicons/fa'

import { NButton, NButtonGroup, NIcon, NSpace, NTooltip, useDialog, useMessage } from 'naive-ui'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
})
const drawer = useDrawerService()
const dialog = useDialog()
const message = useMessage()
async function cordonNode(node: V1Node) {
  const n = await K8sService.nodeService.cordonNode(node.metadata.name)
  if (n.spec.unschedulable)
    message.success('操作成功')
  else
    message.warning('操作失败')
  drawer.close()
}
async function unCordonNode(node: V1Node) {
  const n = await K8sService.nodeService.unCordonNode(node.metadata.name)
  if (n.spec === null || n.spec === undefined || n.spec.unschedulable === null || n.spec.unschedulable === undefined || n.spec.unschedulable === false)
    message.success('操作成功')
  else
    message.warning('操作失败')
  drawer.close()
}
async function deleteNode(node: V1Node) {
  dialog.warning({
    title: '警告',
    content: `你确定删除Node：${node.metadata.name}吗?`,
    positiveText: '删除',
    negativeText: '放弃',
    onPositiveClick: async () => {
      await K8sService.nodeService.deleteNode(node.metadata.name)
      drawer.close()
    },
    onNegativeClick: () => {
      message.error('放弃删除')
    },
  })
}
</script>

<template>
  <NSpace>
    <NButtonGroup>
      <NTooltip v-if="props.node.spec === null || props.node.spec === undefined || props.node.spec.unschedulable === null || props.node.spec.unschedulable === undefined || props.node.spec.unschedulable === false">
        <template #trigger>
          <NButton type="default" @click="cordonNode(props.node)">
            <NIcon :component="PauseCircleRegular" />
          </NButton>
        </template>
        Cordon
      </NTooltip>
      <NTooltip v-else>
        <template #trigger>
          <NButton type="default" @click="unCordonNode(props.node)">
            <NIcon :component="PlayCircleRegular" />
          </NButton>
        </template>
        UnCordon
      </NTooltip>
      <NTooltip>
        <template #trigger>
          <NButton round @click="deleteNode(props.node)">
            <NIcon :component="Trash" />
          </NButton>
        </template>
        Delete
      </NTooltip>
    </NButtonGroup>
  </NSpace>
</template>
