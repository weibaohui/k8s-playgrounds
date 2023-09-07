<script setup lang="ts">
import { V1StorageClass } from '@backend/k8s/model/v1StorageClass'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import StorageClassActionView from '@frontend/components/storageClass/StorageClassActionView.vue'
import StorageClassBasicInfoView from '@frontend/components/storageClass/StorageClassBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  storageClass: V1StorageClass,
})
</script>

<template>
  <NMessageProvider>
    <StorageClassActionView :is-dropdown="false" :storage-class="props.storageClass" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <StorageClassBasicInfoView :storage-class="storageClass" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.storageClass.metadata" />
</template>

<style scoped>

</style>
