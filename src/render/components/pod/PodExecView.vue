<script setup lang="ts">
import { TerminalData } from '@main/watch/watch.model'
import { SocketIOService } from '@render/service/k8s/SocketIOService'
import { debounce } from 'lodash'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { V1Pod } from '../../../model/V1Pod'
import 'xterm/css/xterm.css'

const props = defineProps({
  pod: V1Pod,
})
const terminalDom = ref(null)
const terminalSocket = ref(null)
const term = ref(null)
const fitAddon = new FitAddon()

function createWS() {
  terminalSocket.value = SocketIOService.instance.getSocket()
  console.log(SocketIOService.instance.getSocket())
  console.log(SocketIOService.instance.getSocket().active)
  // server 返回数据写到termjs上
  terminalSocket.value.on('terminal', (data: TerminalData) => {
    term.value.write(data.data)
  })
}
function initWS() {
  if (!terminalSocket.value)
    createWS()
  if (!isWsOpen())
    createWS()
}
// 发送给后端,调整后端终端大小,和前端保持一致,不然前端只是范围变大了,命令还是会换行
function resizeRemoteTerminal() {
  const { cols, rows } = term.value
  if (isWsOpen()) {
    terminalSocket.value.send(JSON.stringify({
      Op: 'resize',
      Cols: cols,
      Rows: rows,
    }))
  }
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
  const c = props.pod.spec.containers[0]
  x.ns = props.pod.metadata.namespace
  x.name = props.pod.metadata.name
  x.containerName = c.name
  x.command = `${cmdData}`
  terminalSocket.value.emit('terminal', x)
}

function termData() {
  sendCommand('clear')

  // 输入与粘贴的情况,onData不能重复绑定,不然会发送多次
  const cmdData = ref('')
  term.value.onKey((e) => {
    if (e.key === '\x7F' || e.key === 'Enter')
      term.value.write('\x1B[D')
  })
  term.value.onData((data) => {
    if (data === '')
      return

    term.value.write(data)
    if (isWsOpen()) {
      if ((data !== '\r') && (data !== '\u0003')) {
        cmdData.value = cmdData.value + data
      }
      else {
        if (data === '\u0003')
          cmdData.value = `${cmdData.value + data}`
        else
          cmdData.value = `${cmdData.value}`
        sendCommand(cmdData.value)
        cmdData.value = ''
      }
    }
  })
}
function onTerminalResize() {
  window.addEventListener('resize', onResize)
}
function removeResizeListener() {
  window.removeEventListener('resize', onResize)
}

onMounted(() => {
  initWS()
  initTerm()
  termData()
  onTerminalResize()
})
onBeforeUnmount(() => {
  removeResizeListener()
  terminalSocket.value && terminalSocket.value.close()
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
