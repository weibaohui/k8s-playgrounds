<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'
import SecretDataValueEditView from '@frontend/components/secret/SecretDataValueEditView.vue'
import { NTabPane, NTabs } from 'naive-ui'

const props = defineProps({
  secret: V1Secret,
})
</script>

<template>
  <NTabs type="card">
    <NTabPane v-for="(v, k) in props.secret.data" :key="k" :name="k" :tab="k">
      <div style="height: 100%;min-height: 20px">
        <SecretDataValueEditView :v="v" :k="k" :meta="props.secret.metadata" />
      </div>
    </NTabPane>
  </NTabs>
</template>

<style scoped>

</style>
