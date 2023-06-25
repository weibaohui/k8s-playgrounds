<script lang="ts" setup>
import { get } from '@main/utils/axios/api'
import PodView from '@render/components/PodView.vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NDrawer, NDrawerContent, useMessage } from 'naive-ui'
import { h, ref } from 'vue'
import type { V1Pod } from '../../model/V1Pod'

const show = ref(false)
const item = ref<V1Pod>()
const message = useMessage()
const columns = createColumns({
  play(item: V1Pod) {
    message.success(`Play ${item.metadata.name}`)
  },
})
const podList = ref<V1Pod[]>()
function createColumns({ play }: { play: (row: V1Pod) => void }): DataTableColumns<V1Pod> {
  return [
    {
      title: 'podName',
      key: 'metadata.name',
    },
    {
      title: 'ns',
      key: 'metadata.namespace',
    },
    {
      title: 'Length',
      key: 'status.phase',
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              play(row)
              item.value = row
              show.value = true
            },
          },
          { default: () => 'Play1' },
        )
      },
    },
  ]
}

async function getK8sPodList() {
  podList.value = await get<V1Pod[]>('/cats/k8s')
}
getK8sPodList()
</script>

<template>
  <NDataTable
    :columns="columns"
    :data="podList"
    :pagination="false"
    :bordered="false"
  />
  <NDrawer v-model:show="show" :width="502">
    <NDrawerContent title="斯通纳" closable>
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
      {{ item.metadata.name }}
      <PodView :item="item" />
    </NDrawerContent>
  </NDrawer>
</template>
