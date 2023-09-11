<script setup lang="ts">
import { V1StorageClass } from '@backend/k8s/model/V1StorageClass'
import { Star } from '@vicons/fa'
import { NIcon, NIconWrapper } from 'naive-ui'

const props = defineProps({
  storageClass: V1StorageClass,
})
function isDefault() {
  return props.storageClass.metadata.annotations['storageclass.kubernetes.io/is-default-class'] === 'true'
}
</script>

<template>
  <NIconWrapper v-if="isDefault()" :size="24" :border-radius="10">
    <NIcon :component="Star" />
  </NIconWrapper>
</template>

<style scoped>

</style>
