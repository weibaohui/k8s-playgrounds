<script setup lang="ts">
import { V1ClusterRole } from '@backend/k8s/model/v1ClusterRole'
import ClusterRoleActionView from '@frontend/components/ClusterRole/ClusterRoleActionView.vue'
import ClusterRoleBasicInfoView from '@frontend/components/ClusterRole/ClusterRoleBasicInfoView.vue'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  clusterRole: V1ClusterRole,
})
</script>

<template>
  <NMessageProvider>
    <ClusterRoleActionView :is-dropdown="false" :cluster-role="props.clusterRole" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <ClusterRoleBasicInfoView :cluster-role="props.clusterRole" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.clusterRole.metadata" />
</template>

<style scoped>

</style>
