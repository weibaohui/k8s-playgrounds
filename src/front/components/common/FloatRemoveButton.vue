<script setup lang="ts">
import { NBadge, NButton, NIcon } from 'naive-ui'
import { Trash } from '@vicons/fa'

const props = defineProps({
  items: Array<any>,
})
const emit = defineEmits(['onClicked', 'update'])
function onClicked() {
  emit('onClicked')
}
</script>

<template>
  <NP v-if="props.items && props.items.length > 0" class="fix">
    <NBadge :value="items.length" :max="9">
      <NButton color="#FADC19" circle @click="onClicked">
        <template #icon>
          <NIcon color="red" :component="Trash" />
        </template>
      </NButton>
    </NBadge>
  </NP>
</template>

<style scoped>
.fix {
  z-index: 99999;
  position: fixed;
  bottom: 100px;
  right: 50px;
}
</style>
