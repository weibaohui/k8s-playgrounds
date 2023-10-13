<script setup lang="ts">
import { V1EndpointSlice } from '@backend/k8s/model/V1EndpointSlice'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTag } from 'naive-ui'

const props = defineProps({
  ep: V1EndpointSlice,
})

function getIps() {
  const ips = new Array<string>()
  props.ep.endpoints?.forEach((dep) => {
    dep.addresses?.forEach((ip) => {
      const zone = dep.zone ? dep.zone : ''
      const nodeName = dep.nodeName ? dep.nodeName : ''
      const hostname = dep.hostname ? dep.hostname : ''
      ips.push(` ${ip} @ ${nodeName}${hostname}${zone}`)
    })
  })
  return ips
}
</script>

<template>
  <NSpace v-for="ip in getIps()" :key="ip" :vertical="false">
    <NTag :color="{ color: ColorHelper.randomColor() }">
      {{ ip }}
    </NTag>
  </NSpace>
</template>

<style scoped>

</style>
