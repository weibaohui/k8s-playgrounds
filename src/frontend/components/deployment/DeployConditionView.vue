<script setup lang="ts">
import { V1Deployment } from '@backend/k8s/model/V1Deployment'
import { CheckCircle, ExclamationCircle } from '@vicons/fa'
import { NIcon, NTag, NTooltip } from 'naive-ui'

const props = defineProps({
  deploy: V1Deployment,
})
</script>

<template>
  <span v-for="c in props.deploy.status.conditions" :key="c.type" style="margin-left: 5px">
    <NTooltip v-if="c.status === 'True'" placement="bottom" trigger="hover">
      <template #trigger>
        <NTag type="success">
          {{ c.type }}
          <template #icon>
            <NIcon :component="CheckCircle" />
          </template>
        </NTag>
      </template>
      <span> {{ c.message }} </span>
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
      <span> {{ c.message }} </span>
    </NTooltip>
  </span>
</template>

<style scoped>

</style>
