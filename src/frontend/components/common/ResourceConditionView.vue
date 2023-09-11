<script setup lang="ts">
import type { V1DeploymentCondition } from '@backend/k8s/model/V1DeploymentCondition'
import { CheckCircle, ExclamationCircle } from '@vicons/fa'
import { NIcon, NTag, NTooltip } from 'naive-ui'

const props = defineProps({
  items: Array<V1DeploymentCondition>,
})
</script>

<template>
  <span v-for="c in props.items" :key="c.type" style="margin-left: 5px">
    <NTooltip v-if="c.status === 'True'" placement="bottom" trigger="hover">
      <template #trigger>
        <NTag type="success">
          {{ c.type }}
          <template #icon>
            <NIcon :component="CheckCircle" />
          </template>
        </NTag>
      </template>
      <span> {{ c.message }} {{ c.reason }} </span>
    </NTooltip>
    <NTooltip v-else-if="c.status === 'False' && c.type.endsWith('Pressure') " placement="bottom" trigger="hover" type="success">
      <template #trigger>
        <NTag type="success">
          {{ c.type }}
          <template #icon>
            <NIcon :component="CheckCircle" />
          </template>
        </NTag>
      </template>
      <span> {{ c.message }}  {{ c.reason }} </span>
    </NTooltip>
    <NTooltip v-else placement="bottom" trigger="hover" type="success">
      <template #trigger>
        <NTag type="error">
          {{ c.type }}
          <template #icon>
            <NIcon :component="ExclamationCircle" />
          </template>
        </NTag>
      </template>
      <span> {{ c.message }}  {{ c.reason }} </span>
    </NTooltip>
  </span>
</template>

<style scoped>

</style>
