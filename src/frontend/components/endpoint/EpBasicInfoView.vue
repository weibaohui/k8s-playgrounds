<script setup lang="ts">
import { V1Endpoints } from '@backend/k8s/model/V1Endpoints'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'

const props = defineProps({
  ep: V1Endpoints,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.ep.metadata" />
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
