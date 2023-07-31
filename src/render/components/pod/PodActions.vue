<script setup lang="ts">
import MonacoView from '@render/components/common/MonacoView.vue'
import PodExecView from '@render/components/pod/PodExecView.vue'
import PodLogView from '@render/components/pod/PodLogView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import { Edit, StickyNoteRegular, Terminal, Trash } from '@vicons/fa'

import { NButton, NButtonGroup, NIcon, NSpace, NTooltip, useDialog, useMessage } from 'naive-ui'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const drawer = useDrawerService()
const dialog = useDialog()
const message = useMessage()

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
          <NButton
            @click="DrawerHelper
              .instance
              .drawer(drawer)
              .show(props.pod.metadata.name, PodExecView, { pod: props.pod })"
          >
            <NIcon :component="Terminal" />
          </NButton>
        </template>
        Exec
      </NTooltip>
      <NTooltip>
        <template #trigger>
          <NButton
            @click="DrawerHelper
              .instance
              .drawer(drawer)
              .show(props.pod.metadata.name, PodLogView, { pod: props.pod })"
          >
            <NIcon :component="StickyNoteRegular" />
          </NButton>
        </template>
        Log
      </NTooltip>
      <NTooltip>
        <template #trigger>
          <NButton
            @click="
              DrawerHelper
                .instance
                .drawer(drawer)
                .show(props.pod.metadata.name, MonacoView, { item: props.pod })
            "
          >
            <NIcon :component="Edit" />
          </NButton>
        </template>
        Edit
      </NTooltip>
      <NTooltip>
        <template #trigger>
          <NButton round @click="deletePod(props.pod)">
            <NIcon :component="Trash" />
          </NButton>
        </template>
        Delete
      </NTooltip>
    </NButtonGroup>
  </NSpace>
</template>
