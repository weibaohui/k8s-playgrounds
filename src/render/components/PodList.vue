<script lang="ts" setup>
import type { V1Pod } from '@kubernetes/client-node'
import { get } from '@main/utils/axios/api'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, useMessage } from 'naive-ui'
import { h, ref } from 'vue'

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
            onClick: () => play(row),
          },
          { default: () => 'Play' },
        )
      },
    },
  ]
}

const message = useMessage()
const columns = createColumns({
  play(row: V1Pod) {
    message.success(`Play ${row.metadata.name}`)
  },
})
const podList = ref<V1Pod[]>()

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
</template>
