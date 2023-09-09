<script setup lang="ts">
import { V1ClusterRoleBinding } from '@backend/k8s/model/v1ClusterRoleBinding'
import ClusterRoleBindingActionView from '@frontend/components/ClusterRoleBinding/ClusterRoleBindingActionView.vue'
import ClusterRoleBindingBasicInfoView
  from '@frontend/components/ClusterRoleBinding/ClusterRoleBindingBasicInfoView.vue'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  clusterRoleBinding: V1ClusterRoleBinding,
})
</script>

<template>
  <NMessageProvider>
    <ClusterRoleBindingActionView :is-dropdown="false" :cluster-role-binding="props.clusterRoleBinding" />
  </NMessageProvider>

  <ClusterRoleBindingBasicInfoView :cluster-role-binding="props.clusterRoleBinding" :show-title="true" />

  <InvolvedEventView :item="props.clusterRoleBinding.metadata" :show-title="true" />
</template>

<style scoped>

</style>
