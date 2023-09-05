<script setup lang="ts">
import { V1Service } from '@backend/k8s/model/V1Service'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTable, NTag } from 'naive-ui'

const props = defineProps({
  svc: V1Service,
})
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Cluster IP
        </td>
        <td>{{ props.svc.spec.clusterIP }}</td>
      </tr>
      <tr>
        <td>
          Cluster IPs
        </td>
        <td>
          <NSpace vertical>
            <NTag v-for="ip in props.svc.spec.clusterIPs" :key="ip" :color="{ color: ColorHelper.randomColor(), textColor: '#fff' }">
              {{ ip }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr>
        <td>
          IP Families
        </td>
        <td>
          <NSpace vertical>
            <NTag v-for="ip in props.svc.spec.ipFamilies" :key="ip" :color="{ color: ColorHelper.randomColor(), textColor: '#fff' }">
              {{ ip }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr>
        <td>
          IP Family Policy
        </td>
        <td>{{ props.svc.spec.ipFamilyPolicy }}</td>
      </tr>
      <tr>
        <td>
          Ports
        </td>
        <td>
          <div v-for="port in props.svc.spec.ports" :key="port">
            {{ port.port }}:{{ port.nodePort ? port.nodePort : port.targetPort }}/{{ port.protocol }}
          </div>
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
