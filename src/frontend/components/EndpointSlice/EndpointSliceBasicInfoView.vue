<script setup lang="ts">
import { V1EndpointSlice } from '@backend/k8s/model/V1EndpointSlice'
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import type { V1ObjectReference } from '@backend/k8s/model/V1ObjectReference'
import { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import ControlledByView from '@frontend/components/common/ControlledByView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { CheckCircle, ExclamationCircle } from '@vicons/fa'
import { NDivider, NIcon, NTable, NTag } from 'naive-ui'

const props = defineProps({
  ep: V1EndpointSlice,
  showTitle: Boolean,

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
  <TitleBar v-if="props.showTitle === true" title="Basic info" />
  <ResourceMetadataView :item="props.ep.metadata" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          addressType
        </td>
        <td>{{ props.ep.addressType }}</td>
      </tr>
    </tbody>
  </NTable>
  <NDivider v-if="props.ep.ports" title-placement="left">
    Ports
  </NDivider>
  <NTable v-if="props.ep.ports">
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
      <tr v-for="p in props.ep.ports" :key="p">
        <td>
          {{ p.port }}
        </td>
        <td>{{ p.name }}</td>
        <td>{{ p.appProtocol }} {{ p.protocol }}</td>
      </tr>
    </tbody>
  </NTable>
  <NDivider v-if="props.ep.endpoints" title-placement="left">
    addresses
  </NDivider>
  <NTable v-if="props.ep.endpoints">
    <tbody>
      <tr>
        <th class="left">
          IP
        </th>
        <th class="left">
          Status
        </th>
        <th class="middle">
          Hostname
        </th>
        <th class="middle">
          NodeName
        </th>
        <th>Target</th>
      </tr>
      <tr v-for="dep in props.ep.endpoints" :key="dep">
        <td>
          {{ dep.addresses }}
        </td>
        <td>
          <div>
            <NTag v-if="dep.conditions.ready" type="success">
              ready
              <template #icon>
                <NIcon :component="CheckCircle" />
              </template>
            </NTag>
            <NTag v-else type="error">
              ready
              <template #icon>
                <NIcon :component="ExclamationCircle" />
              </template>
            </NTag>
          </div>
          <div>
            <NTag v-if="dep.conditions.serving" type="success">
              serving
              <template #icon>
                <NIcon :component="CheckCircle" />
              </template>
            </NTag>
            <NTag v-else type="error">
              serving
              <template #icon>
                <NIcon :component="ExclamationCircle" />
              </template>
            </NTag>
          </div>
          <div>
            <NTag v-if="dep.conditions.terminating" type="success">
              terminating
              <template #icon>
                <NIcon :component="CheckCircle" />
              </template>
            </NTag>
            <NTag v-else type="error">
              terminating
              <template #icon>
                <NIcon :component="ExclamationCircle" />
              </template>
            </NTag>
          </div>
        </td>
        <td>{{ dep.hostname }}</td>
        <td> {{ dep.nodeName }}</td>
        <td>
          <ControlledByView v-if="dep.targetRef" :item="getFakeV1ObjectMeta(dep.targetRef)" :simple="false" />
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
