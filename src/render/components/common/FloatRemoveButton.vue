<script setup lang="ts">
import { Delete28Regular } from '@vicons/fluent'
import { NBadge, NButton, NIcon } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  items: ref<Array<any>>,
})
const emit = defineEmits(['onClicked', 'update'])

function onClicked() {
  emit('onClicked')
}
</script>

<template>
  <NP v-if="props.items.value && props.items.value.length > 0" class="fix">
    <NBadge :value="items.length" :max="15">
      <NButton color="#FADC19" circle @click="onClicked">
        <template #icon>
          <NIcon color="red" :component="Delete28Regular" />
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
