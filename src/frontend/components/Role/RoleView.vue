<script setup lang="ts">
import { V1Role } from '@backend/k8s/model/v1Role'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import RoleActionView from '@frontend/components/Role/RoleActionView.vue'
import RoleBasicInfoView from '@frontend/components/Role/RoleBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  role: V1Role,
})
</script>

<template>
  <NMessageProvider>
    <RoleActionView :is-dropdown="false" :role="props.role" />
  </NMessageProvider>
  <TitleBar title="Basic info" />
  <RoleBasicInfoView :role="props.role" />
  <TitleBar title="Events" />
  <InvolvedEventView :item="props.role.metadata" />
</template>

<style scoped>

</style>
