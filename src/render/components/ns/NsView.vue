<script setup lang="ts">
import NsBasicInfoView from '@render/components/ns/NsBasicInfoView.vue'
import NsEventsView from '@render/components/ns/NsEventsView.vue'
import { NH6, NText } from 'naive-ui'
import { V1Namespace } from '../../../model/V1Namespace'

const props = defineProps({
  ns: V1Namespace,
})
</script>

<template>
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
