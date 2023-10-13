<script setup lang="ts">
import { V1Ingress } from '@backend/k8s/model/V1Ingress'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NTag } from 'naive-ui'

const props = defineProps({
  ing: V1Ingress,
})
</script>

<template>
  <div>
    <div v-for="r in props.ing.spec.rules" :key="r">
      <div v-for="p in r.http.paths" :key="p">
        <NTag :color="{ color: ColorHelper.randomColor() }">
          {{ r.host ? r.host : "*" }}{{ p.path }}
          <span v-if="p.backend.service">
            >> {{ `${p.backend.service.name}:${p.backend.service.port.number}` }}
          </span>
          <span v-if="p.backend.resource">
            >> {{ `${p.backend.resource.kind}:${p.backend.resource.name}` }}
          </span>
        </NTag>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
