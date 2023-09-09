<script setup lang="ts">
import { V1StorageClass } from '@backend/k8s/model/v1StorageClass'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import StorageClassActionView from '@frontend/components/storageClass/StorageClassActionView.vue'
import StorageClassBasicInfoView from '@frontend/components/storageClass/StorageClassBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  storageClass: V1StorageClass,
})
</script>

<template>
  <NMessageProvider>
    <StorageClassActionView :is-dropdown="false" :storage-class="props.storageClass" />
  </NMessageProvider>

  <StorageClassBasicInfoView :storage-class="storageClass" :show-title="true" />

  <InvolvedEventView :item="props.storageClass.metadata" :show-title="true" />
</template>

<style scoped>

</style>
