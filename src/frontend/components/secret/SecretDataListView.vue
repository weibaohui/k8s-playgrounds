<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'
import SecretDataValueEditView from '@frontend/components/secret/SecretDataValueEditView.vue'
import { NDivider } from 'naive-ui'

const props = defineProps({
  secret: V1Secret,
})
</script>

<template>
  <div v-for="(v, k) in props.secret.data" :key="k" style="height: 50%;max-height: 100px">
    <NDivider title-placement="left">
      {{ k }}
    </NDivider>
    <SecretDataValueEditView :v="v" :k="k" :meta="props.secret.metadata" />
  </div>
</template>

<style scoped>

</style>
