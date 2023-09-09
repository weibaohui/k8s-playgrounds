<script setup lang="ts">
import { V1ClusterRole } from '@backend/k8s/model/v1ClusterRole'
import ClusterRoleActionView from '@frontend/components/ClusterRole/ClusterRoleActionView.vue'
import ClusterRoleBasicInfoView from '@frontend/components/ClusterRole/ClusterRoleBasicInfoView.vue'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  clusterRole: V1ClusterRole,
})
</script>

<template>
  <NMessageProvider>
    <ClusterRoleActionView :is-dropdown="false" :cluster-role="props.clusterRole" />
  </NMessageProvider>
  <ClusterRoleBasicInfoView :cluster-role="props.clusterRole" :show-title="true" />
  <InvolvedEventView :item="props.clusterRole.metadata" :show-title="true" />
</template>

<style scoped>

</style>
