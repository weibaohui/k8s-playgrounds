<script setup lang="ts">
import { V1Role } from '@backend/k8s/model/V1Role'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import RoleActionView from '@frontend/components/Role/RoleActionView.vue'
import RoleBasicInfoView from '@frontend/components/Role/RoleBasicInfoView.vue'
import RoleRulesView from '@frontend/components/Role/RoleRulesView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  role: V1Role,
})
</script>

<template>
  <NMessageProvider>
    <RoleActionView :is-dropdown="false" :role="props.role" />
  </NMessageProvider>

  <RoleBasicInfoView :role="props.role" :show-title="true" />
  <RoleRulesView :cluster-role="props.role" :show-title="true" />
  <InvolvedEventView :item="props.role.metadata" :show-title="true" />
</template>

<style scoped>

</style>
