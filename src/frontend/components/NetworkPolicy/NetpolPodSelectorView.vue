<script setup lang="ts">
import { V1LabelSelector } from '@backend/k8s/model/v1LabelSelector'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTag } from 'naive-ui'

const props = defineProps({
  podSelector: V1LabelSelector,
})
</script>

<template>
  <NSpace v-if="props.podSelector.matchLabels" vertical>
    <NTag v-for="(v, k) in props.podSelector.matchLabels" :key="k" :color="{ color: ColorHelper.randomColor() }">
      {{ k }}={{ v }}
    </NTag>
  </NSpace>
  <NTag v-else type="error">
    ALL
  </NTag>
  <NSpace v-if="props.podSelector.matchExpressions" vertical>
    <NTag v-for="m in props.podSelector.matchExpressions" :key="m" :color="{ color: ColorHelper.randomColor() }">
      {{ m.key }} {{ m.operator }} {{ m.values }}
    </NTag>
  </NSpace>
</template>

<style scoped>
</style>
