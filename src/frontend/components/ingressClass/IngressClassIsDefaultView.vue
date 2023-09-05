<script setup lang="ts">
import { Star } from '@vicons/fa'
import { NIcon } from 'naive-ui'
import { V1IngressClass } from '@backend/k8s/model/V1IngressClass'

const props = defineProps({
  ingressClass: V1IngressClass,
})
function isDefault() {
  console.log(props.ingressClass.metadata.annotations['ingressclass.kubernetes.io/is-default-class'])
  return props.ingressClass.metadata.annotations['ingressclass.kubernetes.io/is-default-class'] === 'true'
}
</script>

<template>
  <NIcon v-if="isDefault()" :component="Star" />
</template>

<style scoped>

</style>
