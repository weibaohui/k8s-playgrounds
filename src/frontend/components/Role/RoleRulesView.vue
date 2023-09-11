<script setup lang="ts">
import { V1ClusterRole } from '@backend/k8s/model/V1ClusterRole'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NTable } from 'naive-ui'

const props = defineProps({
  clusterRole: V1ClusterRole,
  showTitle: Boolean,
})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Rules" />
  <NTable
    v-for="ru in props.clusterRole.rules" :key="ru"
    :style="{ borderColor: ColorHelper.randomColor() }"
    style="margin-top: 20px;" :single-line="false"
  >
    <tbody>
      <tr v-if="ru.resources">
        <td class="left">
          resources
        </td>
        <td>{{ ru.resources.join(', ') }}</td>
      </tr>
      <tr v-if="ru.nonResourceURLs">
        <td class="left">
          nonResourceURLs
        </td>
        <td>{{ ru.nonResourceURLs.join(', ') }}</td>
      </tr>
      <tr v-if="ru.verbs">
        <td class="left">
          verbs
        </td>
        <td>{{ ru.verbs.join(', ') }}</td>
      </tr>
      <tr v-if="ru.apiGroups">
        <td class="left">
          apiGroups
        </td>
        <td>{{ ru.apiGroups.join('') === '' ? '\'\'' : ru.apiGroups.join(', ') }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left{
  width: 120px;
}
</style>
