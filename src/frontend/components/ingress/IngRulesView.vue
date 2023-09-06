<script setup lang="ts">
import { V1Ingress } from '@backend/k8s/model/v1Ingress'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NTable, NTag } from 'naive-ui'

const props = defineProps({
  ing: V1Ingress,
})
</script>

<template>
  <div>
    <NTable>
      <tbody>
        <tr>
          <th class="Host">
            Host
          </th>
          <th class="Path">
            Path
          </th>
          <th>Backend</th>
        </tr>
      </tbody>
    </NTable>
    <NTable v-for="r in props.ing.spec.rules" :key="r">
      <tbody>
        <tr v-for="p in r.http.paths" :key="p">
          <td class="Host">
            <NTag :color="{ color: ColorHelper.randomColor() }">
              {{ r.host ? r.host : "*" }}
            </NTag>
          </td>
          <td class="Path">
            {{ p.path }}
          </td>
          <td>
            <span v-if="p.backend.service">
              {{ `${p.backend.service.name}:${p.backend.service.port.number}` }}
            </span>
            <span v-if="p.backend.resource">
              {{ `${p.backend.resource.kind}:${p.backend.resource.name}` }}
            </span>
          </td>
        </tr>
      </tbody>
    </NTable>
  </div>
</template>

<style scoped>
.Host {
  width: 200px;
}
.Path {
  width: 120px;
}
</style>
