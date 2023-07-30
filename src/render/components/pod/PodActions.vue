<script setup lang="ts">
import MonacoView from '@render/components/common/MonacoView.vue'
import PodExecView from '@render/components/pod/PodExecView.vue'
import PodLogView from '@render/components/pod/PodLogView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DeleteRound, EditNoteRound, FormatAlignLeftRound, TerminalRound } from '@vicons/material'
import type { ConcreteComponent } from '@vue/runtime-core'
import { NButton, NButtonGroup, NIcon, NSpace, NTooltip, useDialog, useMessage } from 'naive-ui'
import { h } from 'vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const drawer = useDrawerService()
const dialog = useDialog()
const message = useMessage()
function showView(comp: ConcreteComponent, x: V1Pod) {
  drawer.showDrawer(
    {
      title: x.metadata.name,
      width: 1000,
    },
    h(comp, { pod: x }),
  )
}
function showEditView(item: object, title: string) {
  drawer.showDrawer(
    {
      title,
      width: 1000,
    },
    h(MonacoView, { item }),
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
</script>

<template>
  <NSpace>
    <NButtonGroup>
      <NTooltip>
        <template #trigger>
          <NButton type="default" @click="showView(PodExecView, props.pod)">
            <NIcon :component="TerminalRound" />
          </NButton>
        </template>
        Exec
      </NTooltip>
      <NTooltip>
        <template #trigger>
          <NButton @click="showView(PodLogView, props.pod)">
            <NIcon :component="FormatAlignLeftRound" />
          </NButton>
        </template>
        Log
      </NTooltip>
      <NTooltip>
        <template #trigger>
          <NButton @click="showEditView(props.pod, props.pod.metadata.name)">
            <NIcon :component="EditNoteRound" />
          </NButton>
        </template>
        Edit
      </NTooltip>
      <NTooltip>
        <template #trigger>
          <NButton round @click="deletePod(props.pod)">
            <NIcon :component="DeleteRound" />
          </NButton>
        </template>
        Delete
      </NTooltip>
    </NButtonGroup>
  </NSpace>
</template>
