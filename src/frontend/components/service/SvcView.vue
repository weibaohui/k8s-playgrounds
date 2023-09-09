<script setup lang="ts">
import { V1Service } from '@backend/k8s/model/V1Service'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import SvcActionView from '@frontend/components/service/SvcActionView.vue'
import SvcBasicInfoView from '@frontend/components/service/SvcBasicInfoView.vue'
import SvcConnectView from '@frontend/components/service/SvcConnectView.vue'
import SvcEndpointListView from '@frontend/components/service/SvcEndpointListView.vue'
import { NMessageProvider } from 'naive-ui'
import TitleBar from '@frontend/components/common/TitleBar.vue'

const props = defineProps({
  svc: V1Service,
})
</script>

<template>
  <NMessageProvider>
    <SvcActionView :is-dropdown="false" :svc="props.svc" />
  </NMessageProvider>
  <TitleBar title="Basic info" :show-title="true" />
  <SvcBasicInfoView :svc="props.svc" />
  <TitleBar title="Connect Info" />
  <SvcConnectView :svc="props.svc" />
  <TitleBar title="Endpoints" />
  <SvcEndpointListView :svc="props.svc" />

  <InvolvedEventView :item="props.svc.metadata" :show-title="true" />
</template>

<style scoped>

</style>
