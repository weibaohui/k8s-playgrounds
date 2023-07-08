<script setup lang="ts">
import { K8sService } from '@render/service/k8s/K8sService'
import { NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  ns: String,
})

// 定义调用方法
const emit = defineEmits(['onNsChanged', 'update'])

const selectedNs = ref('default')
const options = ref<SelectOption[]>()

async function getK8sNsList2() {
  const ns = await K8sService.namespaceService.getNamespaceList()
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
