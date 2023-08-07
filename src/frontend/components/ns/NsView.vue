<script setup lang="ts">
import { NH6, NMessageProvider, NText } from 'naive-ui'
import NsActionView from '../../components/ns/NsActionView.vue'
import NsBasicInfoView from '../../components/ns/NsBasicInfoView.vue'
import NsEventsView from '../../components/ns/NsEventsView.vue'
import { V1Namespace } from '../../../model/V1Namespace'

const props = defineProps({
  ns: V1Namespace,
})
</script>

<template>
  <NMessageProvider>
    <NsActionView :is-dropdown="false" :ns="props.ns" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <NsBasicInfoView :ns="ns" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <NsEventsView :ns="ns" />
</template>

<style scoped>

</style>
