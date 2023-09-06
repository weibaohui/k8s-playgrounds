<script setup lang="ts">
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTag } from 'naive-ui'
import { V1Namespace } from '@backend/k8s/model/V1Namespace'

const props = defineProps({
  ns: V1Namespace,
})
</script>

<template>
  <NSpace vertical>
    <NTag v-for="(k, v) in props.ns.metadata.labels" :key="k" :color="{ color: ColorHelper.randomColor() }">
      {{ k }}={{ v }}
    </NTag>
  </NSpace>
</template>

<style scoped>

</style>
