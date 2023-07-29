<script setup lang="ts">
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { TerminalRound } from '@vicons/material'
import type { ConcreteComponent } from '@vue/runtime-core'
import { NButton, NButtonGroup, NIcon, NSpace, NTooltip, useDialog, useMessage } from 'naive-ui'
import { V1Node } from '../../../model/V1Node'
import type { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  node: V1Node,
})
const drawer = useDrawerService()
const dialog = useDialog()
const message = useMessage()
function showView(comp: ConcreteComponent, x: V1Node) {
  // drawer.showDrawer(
  //   {
  //     title: x.metadata.name,
  //     width: 1000,
  //   },
  //   h(comp, { pod: x }),
  // )
}
async function cordonNode(node: V1Node) {
  const n = await K8sService.nodeService.cordonNode(node.metadata.name)
  if (n.spec.unschedulable)
    message.success('操作成功')

  else
    message.warning('操作失败')
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
</script>

<template>
  <NSpace>
    <NButtonGroup>
      <NTooltip>
        <template #trigger>
          <NButton type="default" @click="cordonNode(props.node)">
            <NIcon :component="TerminalRound" />
          </NButton>
        </template>
        Cordon
      </NTooltip>
    </NButtonGroup>
  </NSpace>
</template>
