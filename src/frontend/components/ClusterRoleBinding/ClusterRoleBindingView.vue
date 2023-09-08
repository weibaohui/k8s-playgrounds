<script setup lang="ts">
import { V1ClusterRoleBinding } from '@backend/k8s/model/v1ClusterRoleBinding'
import ClusterRoleBindingActionView from '@frontend/components/ClusterRoleBinding/ClusterRoleBindingActionView.vue'
import ClusterRoleBindingBasicInfoView
  from '@frontend/components/ClusterRoleBinding/ClusterRoleBindingBasicInfoView.vue'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  clusterRoleBinding: V1ClusterRoleBinding,
})
</script>

<template>
  <NMessageProvider>
    <ClusterRoleBindingActionView :is-dropdown="false" :cluster-role-binding="props.clusterRoleBinding" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <ClusterRoleBindingBasicInfoView :cluster-role-binding="props.clusterRoleBinding" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.clusterRoleBinding.metadata" />
</template>

<style scoped>

</style>
