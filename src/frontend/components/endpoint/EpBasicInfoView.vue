<script setup lang="ts">
import { V1Endpoints } from '@backend/k8s/model/V1Endpoints'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  ep: V1Endpoints,
})
</script>

<template>
  <ResourceMetadataView :item="props.ep.metadata" />
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
