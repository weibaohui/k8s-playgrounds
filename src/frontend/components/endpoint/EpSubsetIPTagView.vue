<script setup lang="ts">
import { V1Endpoints } from '@backend/k8s/model/V1Endpoints'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTag } from 'naive-ui'

const props = defineProps({
  ep: V1Endpoints,
})
function getIps() {
  const ips = new Array<string>()
  props.ep.subsets?.filter(r => r.addresses !== undefined)
    .forEach((subset) => {
      subset.ports.forEach((p) => {
        subset.addresses.forEach((ip) => {
          ips.push(`${ip.ip}:${p.port}`)
        })
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
