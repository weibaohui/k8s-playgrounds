<script setup lang="ts">
import { TimerUtils } from '@backend/utils/TimerUtils'
import { K8sService } from '@frontend/service/k8s/K8sService'
import {
  StackExchange,
} from '@vicons/fa'
import type { Component } from 'vue'
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import {
  NButton,
  NCol, NIcon, NMenu, NRow, NSpace,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'

const currentContext = ref<string>()
const headerMenuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/kubeconfig',
          },
        },
        { default: () => 'Clusters' },
      ),
    key: 'go-to-kubeconfig',
    icon: renderIcon(StackExchange),
  },
]

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
async function getCurrentContext() {
  currentContext.value = await K8sService.playService.clientControllerCurrentContext()
}

let intervalId: number
onBeforeUnmount(() => {
  clearInterval(intervalId)
})
onMounted(() => {
  getCurrentContext()
  intervalId = TimerUtils.everyTwoSeconds(() => {
    getCurrentContext()
  })
})
</script>

<template>
  <NRow gutter="12">
    <NCol :span="4" align="center">
      <div class="header">
        Playgrounds
      </div>
    </NCol>
    <NCol :span="20">
      <div class="header">
        <NSpace justify="end">
          <NMenu
            mode="horizontal" :options="headerMenuOptions"
          />
          <NButton>{{ currentContext }}</NButton>
        </NSpace>
      </div>
    </NCol>
  </NRow>
</template>

<style scoped>
.header{
  height: 60px;
  display: table-cell;
  vertical-align: middle;
}
</style>
