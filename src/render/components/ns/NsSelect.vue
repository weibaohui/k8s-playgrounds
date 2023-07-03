<script setup lang="ts">
import { get } from '@main/utils/axios/api'
import { NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { ref } from 'vue'
import type { V1Namespace } from '../../../model/V1Namespace'

const props = defineProps({
  ns: String,
})

const emit = defineEmits(['onNsChanged', 'update'])

const selectedNs = ref('default')
const options = ref<SelectOption[]>()

async function getK8sNsList2() {
  const ns = await get<V1Namespace[]>('/watch/ns')
  options.value = ns.map((r) => {
    return {
      label: r.metadata.name,
      value: r.metadata.name,
    }
  })
}
function onNsChanged() {
  // console.log(`ns 变为${selectedNs.value}`)
  emit('onNsChanged', selectedNs.value)
}
function setNsSelected(ns: string) {
  selectedNs.value = ns
}
getK8sNsList2()
</script>

<template>
  <NSelect
    v-model:value="selectedNs" :options="options"
    placeholder="请选择ns"
    clearable @update:value="onNsChanged"
  />
</template>

<style scoped>

</style>
