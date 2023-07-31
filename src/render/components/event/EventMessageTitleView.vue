<script setup lang="ts">
import EventView from '@render/components/event/EventView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import { NText } from 'naive-ui'
import _ from 'lodash'

import { V1Event } from '../../../model/V1Event'

const props = defineProps({
  event: V1Event,
  truncate: Boolean,
})

const drawer = useDrawerService()

async function showEventView(x: V1Event) {
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(x.metadata.name, EventView, { event: x })
}
</script>

<template>
  <NText v-if="event.type === 'Warning'" class="hand" type="error" @click="showEventView(event)">
    {{ props.truncate ? _.truncate(event.message) : event.message }}
  </NText>
  <NText v-else class="hand" type="default" @click="showEventView(event)">
    {{ props.truncate ? _.truncate(event.message) : event.message }}
  </NText>
</template>

<style scoped>
.hand {
  cursor: pointer
}
</style>
