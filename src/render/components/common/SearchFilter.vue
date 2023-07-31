<script setup lang="ts">
import { NInput, NInputGroup } from 'naive-ui'
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
    <NInput v-model:value="searchText" round clearable :placeholder="props.placeholder" @input="onTextChanged" />
  </NInputGroup>
</template>

<style scoped>

</style>
