<script setup lang="ts">
import { V1ReplicationController } from '@backend/k8s/model/V1ReplicationController'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import RcActionView from '@frontend/components/replicacontroller/RcActionView.vue'
import RcBasicInfoView from '@frontend/components/replicacontroller/RcBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  rc: V1ReplicationController,
})
</script>

<template>
  <NMessageProvider>
    <RcActionView :is-dropdown="false" :rc="props.rc" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <RcBasicInfoView :rc="props.rc" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.rc.metadata" />
</template>

<style scoped>

</style>
