<script setup lang="ts">
import { V1IngressClass } from '@backend/k8s/model/V1IngressClass'
import { Star } from '@vicons/fa'
import { NIcon, NIconWrapper } from 'naive-ui'

const props = defineProps({
  ingressClass: V1IngressClass,
})
function isDefault() {
  return props.ingressClass.metadata.annotations['ingressclass.kubernetes.io/is-default-class'] === 'true'
}
</script>

<template>
  <NIconWrapper v-if="isDefault()" :size="24" :border-radius="10">
    <NIcon :component="Star" />
  </NIconWrapper>
</template>

<style scoped>

</style>
