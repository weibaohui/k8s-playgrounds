<script setup lang="ts">
import type { ActionMenuOption } from '@main/model/actionMenu'
import MonacoView from '@render/components/common/MonacoView.vue'
import PodExecView from '@render/components/pod/PodExecView.vue'
import PodLogView from '@render/components/pod/PodLogView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import { Edit, StickyNoteRegular, Terminal, Trash } from '@vicons/fa'
import { NButton, NButtonGroup, NDropdown, NIcon, NSpace, useDialog, useMessage } from 'naive-ui'
import type { Component } from 'vue'
import { h } from 'vue'

import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
  isDropdown: Boolean,
})

const dialog = useDialog()
const message = useMessage()
const drawer = useDrawerService()
const options: ActionMenuOption[] = [
  {
    label: 'Shell',
    key: 'Shell',
    icon: Terminal,
    action: () => DrawerHelper
      .instance
      .drawer(drawer)
      .showWider(props.pod.metadata.name, PodExecView, { pod: props.pod }),
  },
  {
    label: 'Log',
    key: 'Log',
    icon: StickyNoteRegular,
    action: () => DrawerHelper
      .instance
      .drawer(drawer)
      .showWider(props.pod.metadata.name, PodLogView, { pod: props.pod }),
  },
  {
    label: 'Edit',
    key: 'Edit',
    icon: Edit,
    action: () => DrawerHelper
      .instance
      .drawer(drawer)
      .showWider(props.pod.metadata.name, MonacoView, { item: props.pod }),
  },
  {
    label: 'Delete',
    key: 'Delete',
    icon: Trash,
    action: () => dialog.warning({
      title: '警告',
      content: `你确定删除Pod：${props.pod.metadata.namespace}/${props.pod.metadata.name}吗?`,
      positiveText: '删除',
      negativeText: '放弃',
      onPositiveClick: async () => {
        await K8sService.podService.deletePods([`${props.pod.metadata.namespace}/${props.pod.metadata.name}`])
        drawer.close()
      },
      onNegativeClick: () => {
        message.error('放弃删除')
      },
    }),
  },
]

function renderIcon(icon: Component) {
  if (props.isDropdown) {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      })
    }
  }
  return () => h(icon)
}

function handleSelect(key: string) {
  options.filter(r => r.key === key).pop().action()
}

function getMenuList() {
  return options.map((r) => {
    return {
      label: r.label,
      key: r.key,
      icon: renderIcon(r.icon),
    }
  })
}
</script>

<template>
  <NDropdown v-if="isDropdown" trigger="hover" :options="getMenuList()" @select="handleSelect">
    <NButton text>
      ┇
    </NButton>
  </NDropdown>
  <NSpace v-else>
    <NButtonGroup size="small">
      <NButton v-for="op in getMenuList()" :key="op.key" round @click="handleSelect(op.key)">
        <template #icon>
          <NIcon size="small" :component="op.icon" />
        </template>
      </NButton>
    </NButtonGroup>
  </NSpace>
</template>

<style scoped>
</style>
