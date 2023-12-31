<script setup lang="ts">
import ControlledByView from '@frontend/components/common/ControlledByView.vue'
import ResourceWarnIcon from '@frontend/components/common/ResourceWarnIcon.vue'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import moment from 'moment/moment'
import { NSpace, NTable, NTag } from 'naive-ui'
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
          <NSpace vertical>
            <NTag v-for="(v, k) in props.item.labels" :key="k" :color="{ color: ColorHelper.randomColor(), textColor: '#fff' }">
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr v-if="props.item.annotations">
        <td>Annotations</td>
        <td>
          <NSpace vertical>
            <NTag
              v-for="(v, k) in props.item.annotations" :key="k"
              :color="{ color: ColorHelper.randomColor(), textColor: '#fff' }"
              :style="{ maxWidth: '100%', wordWrap: 'break-word', wordBreak: 'break-all', whiteSpace: 'normal' }"
            >
              {{ k }}={{ v.length < 30 ? v : `${v.substring(0, 30)}..` }}
            </NTag>
          </NSpace>
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
</style>
