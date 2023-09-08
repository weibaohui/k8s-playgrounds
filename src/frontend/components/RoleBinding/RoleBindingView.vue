<script setup lang="ts">
import { V1RoleBinding } from '@backend/k8s/model/v1RoleBinding'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
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
  <TitleBar title="Basic info" />
  <RoleBindingBasicInfoView :role-binding="props.roleBinding" />
  <TitleBar title="Events" />
  <InvolvedEventView :item="props.roleBinding.metadata" />
</template>

<style scoped>

</style>
