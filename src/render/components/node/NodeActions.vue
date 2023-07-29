<script setup lang="ts">
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { CaretForwardCircleOutline, PauseCircleOutline } from '@vicons/ionicons5'
import type { ConcreteComponent } from '@vue/runtime-core'
import { NButton, NButtonGroup, NIcon, NSpace, NTooltip, useDialog, useMessage } from 'naive-ui'
import { V1Node } from '../../../model/V1Node'

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
async function unCordonNode(node: V1Node) {
  const n = await K8sService.nodeService.unCordonNode(node.metadata.name)
  if (n.spec === null || n.spec === undefined || n.spec.unschedulable === null || n.spec.unschedulable === undefined || n.spec.unschedulable === false)
    message.success('操作成功')
  else
    message.warning('操作失败')
}
</script>

<template>
  <NSpace>
    <NButtonGroup>
      <NTooltip v-if="props.node.spec.unschedulable !== null && props.node.spec.unschedulable === true">
        <template #trigger>
          <NButton type="default" @click="unCordonNode(props.node)">
            <NIcon :component="CaretForwardCircleOutline" />
          </NButton>
        </template>
        UnCordon
      </NTooltip>
      <NTooltip v-else>
        <template #trigger>
          <NButton type="default" @click="cordonNode(props.node)">
            <NIcon :component="PauseCircleOutline" />
          </NButton>
        </template>
        Cordon
      </NTooltip>
    </NButtonGroup>
  </NSpace>
</template>
