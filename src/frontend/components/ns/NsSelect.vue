<script setup lang="ts">
import { NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { K8sService } from '@frontend/service/k8s/K8sService'

// 定义调用方法
const emit = defineEmits(['onNsChanged', 'update'])
const selectedNs = ref('default')
const options = ref<SelectOption[]>()
onMounted(() => {
  if (localStorage.selectedNs)
    selectedNs.value = localStorage.selectedNs
})
async function getK8sNsList() {
  const ns = await K8sService.playService.nsControllerList()
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
  localStorage.selectedNs = selectedNs.value ? selectedNs.value : ''
}
function setNsSelected(ns: string) {
  selectedNs.value = ns
  localStorage.selectedNs = ns
}
getK8sNsList()

// 导出，父组件可调用
defineExpose({ setNsSelected })
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
