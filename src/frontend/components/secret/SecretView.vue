<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import SecretActionView from '@frontend/components/secret/SecretActionView.vue'
import SecretBasicInfoView from '@frontend/components/secret/SecretBasicInfoView.vue'
import SecretDataEditView from '@frontend/components/secret/SecretDataEditView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  secret: V1Secret,
})
</script>

<template>
  <NMessageProvider>
    <SecretActionView :is-dropdown="false" :secret="props.secret" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <SecretBasicInfoView :secret="props.secret" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.secret.metadata" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Data
    </NText>
  </NH6>
  <NMessageProvider>
    <SecretDataEditView :secret="props.secret" />
  </NMessageProvider>
</template>

<style scoped>

</style>
