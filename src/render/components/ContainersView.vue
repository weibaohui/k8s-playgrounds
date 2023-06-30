<script setup lang="ts">
import ContainerLastState from '@render/components/ContainerLastState.vue'
import { Link12Regular } from '@vicons/fluent'
import { NDivider, NIcon, NTable, NTag } from 'naive-ui'
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
function getContainerStatusByName(name) {
  return props.item.status.containerStatuses.filter(r => r.name === name).pop()
}
function getContainerByName(name) {
  return props.item.spec.containers.filter(r => r.name === name).pop()
}
</script>

<template>
  <NSpace v-for="t in props.item.spec.containers" :key="t.name">
    <NDivider title-placement="left">
      {{ t.name }}
    </NDivider>
    <NTable :single-line="false">
      <tbody>
        <tr>
          <td>Status</td>
          <td>
            {{ getContainerStatusByName(t.name).ready }}
            {{ getContainerStatusByName(t.name).state }}
          </td>
        </tr>
        <tr>
          <td>Last Status</td>
          <td>
            <ContainerLastState :item="getContainerStatusByName(t.name).lastState" />
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
            {{ getContainerByName(t.name).imagePullPolicy }}
          </td>
        </tr>
        <tr v-if="getContainerByName(t.name).ports">
          <td>Ports</td>
          <td>
            <span v-for="p in getContainerByName(t.name).ports" :key="p.containerPort">
              {{ p.containerPort }}/{{ p.protocol }}
            </span>
          </td>
        </tr>
        <tr v-if="getContainerByName(t.name).env">
          <td>Environment</td>
          <td>
            <NTag v-for="p in getContainerByName(t.name).env" :key="p.name">
              {{ p.name }}:{{ p.valueFrom }}({{ p.value }})
            </NTag>
          </td>
        </tr>
        <tr>
          <td>Mounts</td>
          <td>
            <div v-for="p in getContainerByName(t.name).volumeMounts" :key="p.name">
              <NTag type="success">
                {{ p.mountPath }}{{ p.subPath }}
              </NTag>
              <NTag v-if="p.readOnly" type="warning">
                rw
              </NTag>
              <NTag v-else type="error">
                ro
              </NTag>
              <NIcon :component="Link12Regular" />
              <NTag type="success">
                {{ p.name }}
              </NTag>
            </div>
          </td>
        </tr>
        <tr v-if="getContainerByName(t.name).command">
          <td>Command</td>
          <td>
            {{ getContainerByName(t.name).command }}
          </td>
        </tr>
      </tbody>
    </NTable>
  </NSpace>
</template>

<style scoped>

</style>
