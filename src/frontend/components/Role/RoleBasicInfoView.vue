<script setup lang="ts">
import { V1Role } from '@backend/k8s/model/v1Role'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'

const props = defineProps({
  role: V1Role,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />
  <ResourceMetadataView :item="props.role.metadata" />
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
