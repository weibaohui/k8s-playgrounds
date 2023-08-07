<script setup lang="ts">
import { NButton, NButtonGroup, NDropdown, NIcon, NSpace } from 'naive-ui'
import type { Component } from 'vue'
import { h } from 'vue'
import type { ActionMenuOption } from '../../../backend/model/actionMenu'

const props = defineProps({
  isDropdown: Boolean,
  menuOptions: Array<ActionMenuOption>,
})

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
  props.menuOptions.filter(r => r.key === key).pop().action()
}

function makeMenuList() {
  return props.menuOptions.filter(r => r.show !== false).map((r) => {
    return {
      label: r.label,
      key: r.key,
      icon: renderIcon(r.icon),
    }
  })
}
</script>

<template>
  <NDropdown v-if="isDropdown" trigger="hover" :options="makeMenuList()" @select="handleSelect">
    <NButton text>
      ┇
    </NButton>
  </NDropdown>
  <NSpace v-else>
    <NButtonGroup size="small">
      <NButton v-for="op in makeMenuList()" :key="op.key" round @click="handleSelect(op.key)">
        <template #icon>
          <NIcon size="small" :component="op.icon" />
        </template>
      </NButton>
    </NButtonGroup>
  </NSpace>
</template>

<style scoped>
</style>
