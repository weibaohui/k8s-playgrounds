<script setup lang="ts">
import { V1EndpointSubset } from '@backend/k8s/model/V1EndpointSubset'
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import type { V1ObjectReference } from '@backend/k8s/model/V1ObjectReference'
import { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import ControlledByView from '@frontend/components/common/ControlledByView.vue'
import { NDivider, NTable } from 'naive-ui'

const props = defineProps({
  subset: V1EndpointSubset,
})
function getFakeV1ObjectMeta(t: V1ObjectReference) {
  const om = new V1ObjectMeta()
  const own = new V1OwnerReference()
  own.name = t.name
  own.kind = t.kind
  om.namespace = t.namespace
  om.ownerReferences = [own]
  return om
}
</script>

<template>
  <NDivider title-placement="left">
    addresses
  </NDivider>
  <NTable>
    <tbody>
      <tr>
        <th class="left">
          IP
        </th>
        <th class="middle">
          Hostname
        </th>
        <th>Target</th>
      </tr>
      <tr v-for="sub in props.subset.addresses" :key="sub">
        <td>
          {{ sub.ip }}
        </td>
        <td>{{ sub.hostname }} {{ sub.nodeName }}</td>
        <td>
          <ControlledByView :item="getFakeV1ObjectMeta(sub.targetRef)" :simple="false" />
        </td>
      </tr>
    </tbody>
  </NTable>
  <NDivider title-placement="left">
    notReadyAddresses
  </NDivider>
  <NTable>
    <tbody>
      <tr>
        <th class="left">
          IP
        </th>
        <th class="middle">
          Hostname
        </th>
        <th>Target</th>
      </tr>
      <tr v-for="sub in props.subset.notReadyAddresses" :key="sub">
        <td>
          {{ sub.ip }}
        </td>
        <td>{{ sub.hostname }} {{ sub.nodeName }}</td>
        <td>
          <ControlledByView :item="getFakeV1ObjectMeta(sub.targetRef)" :simple="false" />
        </td>
      </tr>
    </tbody>
  </NTable>
  <NDivider title-placement="left">
    Ports
  </NDivider>
  <NTable>
    <tbody>
      <tr>
        <th class="left">
          Port
        </th>
        <th class="middle">
          Name
        </th>
        <th>Protocol</th>
      </tr>
      <tr v-for="p in props.subset.ports" :key="p">
        <td>
          {{ p.port }}
        </td>
        <td>{{ p.name }} </td>
        <td>{{ p.appProtocol }} {{ p.protocol }}   </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
.middle {
  width: 150px;
}
</style>
