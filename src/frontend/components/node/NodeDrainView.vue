<script setup lang="ts">
import { debounce } from 'lodash'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { TimerUtils } from '../../../backend/utils/TimerUtils'
import { SocketIOService } from '../../service/k8s/SocketIOService'
import 'xterm/css/xterm.css'
import { V1Node } from '../../../backend/k8s/model/V1Node'

const props = defineProps({
  node: V1Node,
})
const terminalDom = ref(null)
const terminalSocket = ref(null)
const term = ref(null)
const fitAddon = new FitAddon()
function createWS() {
  terminalSocket.value = SocketIOService.instance.getSocket()
  terminalSocket.value.on('drain-node', (data: { nodeName: string;data: string }) => {
    if (props.node.metadata.name !== data.nodeName)
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
  TimerUtils.delay(() => fitAddon.fit(), 500)
}
function isWsOpen() {
  return terminalSocket.value.active
}
function fitTerm() {
  fitAddon.fit()
}
const onResize = debounce(() => fitTerm(), 800)

function sendCommand() {
  terminalSocket.value.emit('drain-node', props.node.metadata.name)
}

function onTerminalResize() {
  window.addEventListener('resize', onResize)
}
function removeResizeListener() {
  window.removeEventListener('resize', onResize)
}

function sendInitCommand() {
  TimerUtils.delay(() => sendCommand(), 500)
}

onMounted(() => {
  initWS()
  initTerm()
  onTerminalResize()
  sendInitCommand()
})
onBeforeUnmount(() => {
  removeResizeListener()
})
</script>

<template>
  <div id="xterm-container" ref="terminalDom" />
</template>

<style scoped>
#xterm-container {
  width: 100%;
  height: 100%;
}
</style>
