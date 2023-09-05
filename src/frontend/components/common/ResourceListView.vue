<script lang="ts" setup>
import _ from 'lodash'
import { NDataTable, NFormItemGi, NGrid, NMessageProvider } from 'naive-ui'
import type { TableColumns } from 'naive-ui/es/data-table/src/interface'
import { ref } from 'vue'
import SearchFilter from '@frontend/components/common/SearchFilter.vue'
import FloatRemoveButton from '@frontend/components/common/FloatRemoveButton.vue'
import NsSelect from '@frontend/components/ns/NsSelect.vue'

const props = defineProps({
  columns: Array<TableColumns<any>>,
  itemList: Array<any>,
  showNsSelect: Boolean,
  name: String,
  miniStyle: Boolean,
  onRowClick: {
    type: Function,
    default: (row: any) => {
      return Function
    },
  },
})
const emit = defineEmits(['onNsChanged', 'onRemoveBtnClicked', 'onTextChanged'])

const selectedNs = ref('default')
const nsSelectRef = ref<InstanceType<typeof NsSelect>>()
const checkedRowKeysRef = ref<string[]>([])

function handleCheck(keys: string[]) {
  checkedRowKeysRef.value = keys
  // 过滤掉不存在的pod,尤其是已经选中的但是被删掉的pod
  _.remove(checkedRowKeysRef.value, (n) => {
    // 找出不存在的
    return _.findIndex(props.itemList.map(r => `${r.metadata.namespace}/${r.metadata.name}`), (m) => {
      // 当前的itemList 先变形ns/name,筛选出其中的选中的一致的。
      return m === n
    }) === -1
    // -1 代表最终没有匹配上，那么用remove删除没有匹配上的，也就是不在pod列表中的，不在是因为已经删除了
  })
}

function rowKey(row: any) {
  return `${row.metadata.namespace}/${row.metadata.name}`
}
function rowProps(row: any) {
  return {
    style: 'cursor: pointer;',
    onClick: async () => {
      props.onRowClick(row)
    },
  }
}
function onTextChanged(text: string) {
  emit('onTextChanged', text)
}

async function onRemoveBtnClicked() {
  emit('onRemoveBtnClicked', checkedRowKeysRef.value)
  checkedRowKeysRef.value = []
}

function onNsChanged(ns: string) {
  selectedNs.value = ns
  emit('onNsChanged', ns)
}
function setNsSelected(ns: string) {
  selectedNs.value = ns
  nsSelectRef.value.setNsSelected(ns)
}
defineExpose({ setNsSelected })
</script>

<template>
  <NGrid v-if="!miniStyle" :cols="24" :x-gap="24">
    <NFormItemGi :span="1" />
    <NFormItemGi :span="5">
      {{ props.name }}
    </NFormItemGi>
    <NFormItemGi :span="2">
      {{ itemList && itemList.length ? itemList.length : 0 }}项
    </NFormItemGi>
    <NFormItemGi :span="5" />
    <NFormItemGi :span="5">
      <NsSelect v-if="showNsSelect" ref="nsSelectRef" @on-ns-changed="onNsChanged" />
    </NFormItemGi>
    <NFormItemGi :span="5">
      <SearchFilter @on-text-changed="onTextChanged" />
    </NFormItemGi>
    <NFormItemGi :span="1" />
  </NGrid>
  <FloatRemoveButton :items="checkedRowKeysRef" @on-clicked="onRemoveBtnClicked" />
  <NMessageProvider>
    <NDataTable
      :columns="props.columns"
      :data="itemList"
      :pagination="false"
      :bordered="false"
      :row-key="rowKey"
      :scroll-x="props.miniStyle ? 500 : 1300"
      :row-props="rowProps"
      @update:checked-row-keys="handleCheck"
    />
  </NMessageProvider>
</template>
