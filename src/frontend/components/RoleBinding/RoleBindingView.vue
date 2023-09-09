<script setup lang="ts">
import { V1RoleBinding } from '@backend/k8s/model/v1RoleBinding'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import RoleBindingTargetView from '@frontend/components/common/RoleBindingTargetView.vue'
import RoleBindingActionView from '@frontend/components/RoleBinding/RoleBindingActionView.vue'
import RoleBindingBasicInfoView from '@frontend/components/RoleBinding/RoleBindingBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  roleBinding: V1RoleBinding,
})
</script>

<template>
  <NMessageProvider>
    <RoleBindingActionView :is-dropdown="false" :role-binding="props.roleBinding" />
  </NMessageProvider>

  <RoleBindingBasicInfoView :role-binding="props.roleBinding" :show-title="true" />
  <RoleBindingTargetView :role-binding="props.roleBinding" :show-title="true" />

  <InvolvedEventView :item="props.roleBinding.metadata" :show-title="true" />
</template>

<style scoped>

</style>
