<script setup lang="ts">
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import ControlledByView from '@frontend/components/common/ControlledByView.vue'
import { V1Event } from '@backend/k8s/model/V1Event'

const props = defineProps({
  event: V1Event,
})
function getFakeV1ObjectMeta() {
  const ns = props.event.involvedObject.namespace
  const name = props.event.involvedObject.name
  const kind = props.event.involvedObject.kind

  const om = new V1ObjectMeta()
  const own = new V1OwnerReference()
  own.name = name
  own.kind = kind
  om.namespace = ns
  om.ownerReferences = [own]
  return om
}
</script>

<template>
  <ControlledByView :item="getFakeV1ObjectMeta()" :simple="false" />
</template>

<style scoped>

</style>
