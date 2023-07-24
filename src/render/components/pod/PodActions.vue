<script setup lang="ts">
import PodExecView from '@render/components/pod/PodExecView.vue'
import PodLogView from '@render/components/pod/PodLogView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { DeleteRound, EditNoteRound, FormatAlignLeftRound, TerminalRound } from '@vicons/material'
import type { ConcreteComponent } from '@vue/runtime-core'
import { NButton, NButtonGroup, NIcon, NSpace, NTooltip } from 'naive-ui'
import { h } from 'vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const drawer = useDrawerService()
function showView(comp: ConcreteComponent, x: V1Pod) {
  drawer.showDrawer(
    {
      title: x.metadata.name,
      width: 1000,
    },
    h(comp, { pod: x }),
  )
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
          <NButton @click="showPodExecView(props.pod)">
            <NIcon :component="EditNoteRound" />
          </NButton>
        </template>
        Edit
      </NTooltip>
      <NTooltip>
        <template #trigger>
          <NButton round @click="showPodExecView(props.pod)">
            <NIcon :component="DeleteRound" />
          </NButton>
        </template>
        Delete
      </NTooltip>
    </NButtonGroup>
  </NSpace>
</template>
