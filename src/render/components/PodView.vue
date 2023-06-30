<script setup lang="ts">
import ContainerStatusText from '@render/components/ContainerStatusText.vue'
import ContainersView from '@render/components/ContainersView.vue'
import { GameControllerOutline } from '@vicons/ionicons5'
import moment from 'moment'
import { NAlert, NBadge, NButton, NCollapse, NCollapseItem, NDivider, NIcon, NSpace, NTable, NTag } from 'naive-ui'
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
</script>

<template>
  <NSpace>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
  </NSpace>
  <NDivider title-placement="left" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td>Created</td>
        <td>
          {{ moment(item.status.startTime).format('yyyy-MM-d H:mm:s') }}
          {{ moment(item.status.startTime).fromNow() }}
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ props.item.metadata.name }}</td>
      </tr>
      <tr>
        <td>Namespace</td>
        <td>{{ props.item.metadata.namespace }}</td>
      </tr>
      <tr>
        <td>Labels</td>
        <td>
          <NTag v-for="(v, k) in props.item.metadata.labels" :key="k">
            {{ k }}={{ v }}
          </NTag>
        </td>
      </tr>
      <tr>
        <td>Controlled By</td>
        <td>
          <span v-for="r in props.item.metadata.ownerReferences" :key="r.uid">
            {{ r.kind }} {{ r.name }}
          </span>
        </td>
      </tr>
      <tr>
        <td>Status</td>
        <td><ContainerStatusText :pod="props.item" /></td>
      </tr>
      <tr>
        <td>Node</td>
        <td>{{ props.item.spec.nodeName }}</td>
      </tr>
      <tr>
        <td>Pod IP</td>
        <td>{{ props.item.status.podIP }}</td>
      </tr>
      <tr>
        <td>Pod IPs</td>
        <td>
          <NTag v-for="p in props.item.status.podIPs" :key="p.ip">
            {{ p.ip }}
          </NTag>
        </td>
      </tr>
      <tr>
        <td>Service Account</td>
        <td>{{ props.item.spec.serviceAccount }}</td>
      </tr>
      <tr>
        <td>Priority Class</td>
        <td>{{ props.item.spec.priorityClassName }}</td>
      </tr>
      <tr>
        <td>QoS Class</td>
        <td>{{ props.item.status.qosClass }}</td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td>
          <span v-for="c in props.item.status.conditions" :key="c.type" style="margin-left: 5px">
            <NTag v-if="c.status === 'True'" type="success">
              {{ c.type }}
            </NTag>
            <NTag v-else type="error">
              {{ c.type }}
            </NTag>
          </span>
        </td>
      </tr>
      <tr>
        <td>Node Selector</td>
        <td>
          <NTag v-for="(v, k) in props.item.spec.nodeSelector" :key="k">
            {{ k }}:{{ v }}
          </NTag>
        </td>
      </tr>
      <tr v-if="props.item.spec.tolerations.length">
        <td>Tolerations</td>
        <td>
          <NCollapse>
            <NCollapseItem title="show" name="1">
              <template #header-extra>
                <NBadge :value="props.item.spec.tolerations.length " />
              </template>
              <NTable :single-line="false">
                <thead>
                  <tr>
                    <th>key</th>
                    <th>operator</th>
                    <th>value</th>
                    <th>effect</th>
                    <th>seconds</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in props.item.spec.tolerations" :key="t.key">
                    <td>{{ t.key }}</td>
                    <td>{{ t.operator }}</td>
                    <td>{{ t.value }}</td>
                    <td>{{ t.effect }}</td>
                    <td>{{ t.tolerationSeconds }}</td>
                  </tr>
                </tbody>
              </NTable>
            </NCollapseItem>
          </NCollapse>
        </td>
      </tr>
    </tbody>
  </NTable>
  <NAlert type="info" :show-icon="false">
    Containers
  </NAlert>
  <ContainersView :item="props.item" />
</template>

<style scoped>

</style>
