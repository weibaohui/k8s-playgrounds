<script setup lang="ts">
import { ResType } from '@backend/k8s/watch/watch.model'
import { NText } from 'naive-ui'
import _ from 'lodash'
import EventView from '@frontend/components/event/EventView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { V1Event } from '@backend/k8s/model/V1Event'

const props = defineProps({
  event: V1Event,
  truncate: Boolean,
})

const drawer = useDrawerService()

async function showEventView(x: V1Event) {
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`${ResType.Event}:${x.metadata.name}`, EventView, { event: x })
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
