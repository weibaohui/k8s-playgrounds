<script setup lang="ts">
import ControlledByView from '@frontend/components/common/ControlledByView.vue'
import ResourceWarnIcon from '@frontend/components/common/ResourceWarnIcon.vue'
import moment from 'moment/moment'
import { NList, NSpace, NTable } from 'naive-ui'
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'

const props = defineProps({
  item: V1ObjectMeta,
})
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr v-if="item.creationTimestamp">
        <td class="left">
          Created
        </td>
        <td>
          {{ moment(item.creationTimestamp).format('yyyy-MM-DD H:mm:s Z') }}
          {{ moment(item.creationTimestamp).fromNow() }}
        </td>
      </tr>
      <tr v-if="props.item.name">
        <td>Name</td>
        <td>
          {{ props.item.name }}
          <ResourceWarnIcon :item="item" />
        </td>
      </tr>
      <tr v-if="props.item.namespace">
        <td>Namespace</td>
        <td>{{ props.item.namespace }}</td>
      </tr>
      <tr v-if="props.item.labels">
        <td>Labels</td>
        <td>
          <NList>
            <NListItem v-for="(v, k) in props.item.labels" :key="k">
              <NSpace :wrap="true" class="words">
                {{ k }}={{ v }}
              </NSpace>
            </NListItem>
          </NList>
        </td>
      </tr>
      <tr v-if="props.item.annotations">
        <td>Annotations</td>
        <td>
          <NList>
            <NListItem v-for="(v, k) in props.item.annotations" :key="k">
              <NSpace :wrap="true" class="words">
                {{ k }}={{ v }}
              </NSpace>
            </NListItem>
          </NList>
        </td>
      </tr>
      <tr v-if="props.item.ownerReferences">
        <td>Controlled By</td>
        <td>
          <ControlledByView :item="props.item" />
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
.words{
  max-width: 100%;
}
</style>
