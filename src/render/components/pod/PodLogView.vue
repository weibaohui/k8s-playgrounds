<script setup lang="ts">
import { TerminalData } from '@main/watch/watch.model'
import { SocketIOService } from '@render/service/k8s/SocketIOService'
import { debounce } from 'lodash'
import type { SelectOption } from 'naive-ui'
import { NSelect } from 'naive-ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const terminalDom = ref(null)
const terminalSocket = ref(null)
const term = ref(null)
const fitAddon = new FitAddon()
const selectedContainerName = ref('')
const options = ref<SelectOption[]>()

function createWS() {
  terminalSocket.value = SocketIOService.instance.getSocket()
  console.log('isWsOpen()', isWsOpen())
  // server 返回数据写到termjs上
  terminalSocket.value.on('terminal-log', (data: TerminalData) => {
    if (selectedContainerName.value !== data.containerName)
      return

    if (data.data.endsWith('\n'))
      term.value.writeln(data.data.slice(0, data.data.length - 1))
    else
      term.value.writeln(data.data)
  })
}
function initWS() {
  if (!terminalSocket.value)
    createWS()
  if (!isWsOpen())
    createWS()
}

function initTerm() {
  term.value = new Terminal({
    lineHeight: 1.2,
    fontSize: 12,
    fontFamily: 'Monaco, Menlo, Consolas, \'Courier New\', monospace',
    theme: {
      background: '#181d28',
    },
    cursorStyle: 'underline',
    tabStopWidth: 4,
  })
  term.value.open(terminalDom.value)
  term.value.clear()
  term.value.loadAddon(fitAddon)
  // 不能初始化的时候fit,需要等terminal准备就绪,可以设置延时操作
  setTimeout(() => {
    fitAddon.fit()
  }, 5)
}
function isWsOpen() {
  return terminalSocket.value.active
}
function fitTerm() {
  fitAddon.fit()
}
const onResize = debounce(() => fitTerm(), 800)

function sendCommand(cmdData: string) {
  const x = new TerminalData()
  x.ns = props.pod.metadata.namespace
  x.name = props.pod.metadata.name
  x.containerName = selectedContainerName.value
  x.command = `${cmdData}`
  terminalSocket.value.emit('terminal-log', x)
}

function onTerminalResize() {
  window.addEventListener('resize', onResize)
}
function removeResizeListener() {
  window.removeEventListener('resize', onResize)
}

function fillContainerOptions() {
  options.value = props.pod.spec.containers.map((r) => {
    return {
      label: r.name,
      value: r.name,
    }
  })
  selectedContainerName.value = props.pod.spec.containers[0].name
}
function onContainerChanged() {
  // console.log(`ns 变为${selectedNs.value}`)
  // console.log('onContainerChanged', selectedContainerName.value)
  sendInitCommand()
}
function sendInitCommand() {
  setTimeout(() => {
    sendCommand('start')
  }, 500)
}
onMounted(() => {
  initWS()
  initTerm()
  onTerminalResize()
  fillContainerOptions()
  sendInitCommand()
})
onBeforeUnmount(() => {
  removeResizeListener()
})
</script>

<template>
  <NSelect
    v-model:value="selectedContainerName" :options="options" show-checkmark show-on-focus
    placeholder="请选择容器"
    @update:value="onContainerChanged"
  />
  <div id="xterm-container" ref="terminalDom" />
</template>

<style scoped>
#xterm-container {
  width: 100%;
  height: 100%;
}
</style>
