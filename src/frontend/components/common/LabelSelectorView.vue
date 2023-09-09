<script setup lang="ts">
import { V1LabelSelector } from '@backend/k8s/model/v1LabelSelector'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTag } from 'naive-ui'

const props = defineProps({
  ls: V1LabelSelector,
  matchAll: Boolean,
})
</script>

<template>
  <NSpace v-if="props.ls.matchLabels" vertical>
    <NTag v-for="(v, k) in props.ls.matchLabels" :key="k" :color="{ color: ColorHelper.randomColor() }">
      {{ k }}={{ v }}
    </NTag>
  </NSpace>
  <NTag v-else-if="props.matchAll && !(props.ls.matchLabels)" type="error">
    ALL
  </NTag>
  <NSpace v-if="props.ls.matchExpressions" vertical>
    <NTag v-for="m in props.ls.matchExpressions" :key="m" :color="{ color: ColorHelper.randomColor() }">
      {{ m.key }} {{ m.operator }} {{ m.values }}
    </NTag>
  </NSpace>
</template>

<style scoped>
</style>
