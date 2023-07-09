<script setup lang="ts">
import { TrashBinOutline } from '@vicons/ionicons5'
import { NIcon, NInput, NInputGroup } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  n: String,
  placeholder: String,
})
const emit = defineEmits(['onTextChanged', 'update'])
const searchText = ref('')
function onTextChanged() {
  emit('onTextChanged', searchText.value)
}
</script>

<template>
  <NInputGroup>
    <NInput v-model:value="searchText" round clearable :placeholder="props.placeholder" @input="onTextChanged">
      <template #clear-icon>
        <NIcon :component="TrashBinOutline" />
      </template>
    </NInput>
  </NInputGroup>
</template>

<style scoped>

</style>
