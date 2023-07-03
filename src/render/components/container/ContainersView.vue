<script setup lang="ts">
import ContainerProbeView from '@render/components/container/ContainerProbeView.vue'
import ContainerState from '@render/components/container/ContainerState.vue'
import { Docker } from '@vicons/fa'
import { NDivider, NIcon, NTable, NTag, NText } from 'naive-ui'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
function getContainerStatusByName(name) {
  return props.item.status.containerStatuses.filter(r => r.name === name).pop()
}
</script>

<template>
  <NSpace v-for="t in props.item.spec.containers" :key="t.name">
    <NDivider title-placement="left">
      <NIcon v-if="getContainerStatusByName(t.name).ready" :component="Docker" color="green" size="20" />
      <NIcon v-else :component="Docker" color="red" size="20" />
      {{ t.name }}
    </NDivider>
    <NTable :single-line="false">
      <tbody>
        <tr>
          <td class="left">
            Status
          </td>
          <td>
            <ContainerState :item="getContainerStatusByName(t.name).state" />
            <NText v-if="getContainerStatusByName(t.name).ready" type="success">
              ready
            </NText>
          </td>
        </tr>
        <tr>
          <td>Image</td>
          <td>
            {{ getContainerStatusByName(t.name).image }}
          </td>
        </tr>
        <tr>
          <td>ImagePullPolicy</td>
          <td>
            {{ t.imagePullPolicy }}
          </td>
        </tr>
        <tr v-if="t.ports">
          <td>Ports</td>
          <td>
            <span v-for="p in t.ports" :key="p.containerPort">
              {{ p.containerPort }}/{{ p.protocol }}
            </span>
          </td>
        </tr>
        <tr v-if="t.env">
          <td>Environment</td>
          <td>
            <NTag v-for="p in t.env" :key="p.name">
              {{ p.name }}:{{ p.valueFrom }}({{ p.value }})
            </NTag>
          </td>
        </tr>
        <tr>
          <td>Mounts</td>
          <td>
            <div v-for="p in t.volumeMounts" :key="p.name">
              <NTag type="success">
                {{ p.mountPath }}{{ p.subPath }}
              </NTag>
              <NTag v-if="p.readOnly" type="warning">
                ro
              </NTag>
              <NTag v-else type="error">
                rw
              </NTag>
              <NIcon :component="Link12Regular" />
              <NTag type="success">
                {{ p.name }}
              </NTag>
            </div>
          </td>
        </tr>
        <tr v-if="t.command">
          <td>Command</td>
          <td>
            {{ t.command }}
          </td>
        </tr>
        <tr v-if="t.livenessProbe">
          <td>readinessProbe</td>
          <td>
            <ContainerProbeView :probe="t.livenessProbe" />
          </td>
        </tr>
        <tr v-if="t.readinessProbe">
          <td>readinessProbe</td>
          <td>
            <ContainerProbeView :probe="t.readinessProbe" />
          </td>
        </tr>
        <tr v-if="t.startupProbe">
          <td>startupProbe</td>
          <td>
            <ContainerProbeView :probe="t.startupProbe" />
          </td>
        </tr>
      </tbody>
    </NTable>
  </NSpace>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
