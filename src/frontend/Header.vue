<script setup lang="ts">
import {
  StackExchange,
} from '@vicons/fa'
import type { Component } from 'vue'
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'

import {
  NButton,
  NCol, NIcon, NMenu, NRow, NSpace,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'

const containerRef = ref<HTMLElement>()
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
          <NButton>Oops!</NButton>
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
