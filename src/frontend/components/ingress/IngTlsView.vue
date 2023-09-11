<script setup lang="ts">
import { V1Ingress } from '@backend/k8s/model/V1Ingress'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTable, NTag } from 'naive-ui'

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
            Secret Name
          </th>
          <th class="Host">
            Host
          </th>
        </tr>
      </tbody>
    </NTable>
    <NTable v-for="tls in props.ing.spec.tls" :key="tls">
      <tbody>
        <tr>
          <td class="Host">
            {{ tls.secretName }}
          </td>
          <td class="Host">
            <NSpace vertical>
              <NTag v-for="host in tls.hosts" :key="host" :color="{ color: ColorHelper.randomColor() }">
                {{ host }}
              </NTag>
            </NSpace>
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
