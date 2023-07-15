<script setup lang="ts">
import { debounce } from 'lodash'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const socket = ref()
const terminal = ref(null)
const first = ref(true)
const loading = ref(true)
const terminalSocket = ref(null)
const term = ref(null)
const fitAddon = new FitAddon()

function initSocket(socketURI) {
  socket.value = new WebSocket(socketURI)

  socketOnClose()
  socketOnOpen()
  socketOnmessage()
  socketOnError()
}

function errorRealTerminal(ex) {
  let message = ex.message
  if (!message)
    message = 'disconnected'
  term.value.write(`\x1B[31m${message}\x1B[m\r\n`)
  console.log('err')
}
function closeRealTerminal() {
  console.log('close')
}
function runRealTerminal() {
  loading.value = false
}

function onWSReceive(message) {
  // 首次接收消息,发送给后端，进行同步适配
  if (first.value === true) {
    first.value = false
    resizeRemoteTerminal()
  }
  const data = JSON.parse(message.data)
  term.value.element && term.value.focus()
  term.value.write(data.Data)
}

function createWS() {
  const url = 'XXXX'
  terminalSocket.value = new WebSocket(url)
  terminalSocket.value.onopen = runRealTerminal
  terminalSocket.value.onmessage = onWSReceive
  terminalSocket.value.onclose = closeRealTerminal
  terminalSocket.value.onerror = errorRealTerminal
}
function initWS() {
  if (!terminalSocket.value)
    createWS()

  if (terminalSocket.value && terminalSocket.value.readyState > 1) {
    terminalSocket.value.close()
    createWS()
  }
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
    // 光标闪烁
    cursorBlink: true,
    cursorStyle: 'underline',
    scrollback: 100,
    tabStopWidth: 4,
  })
  term.value.open(terminal.value)
  term.value.loadAddon(fitAddon)
  // 不能初始化的时候fit,需要等terminal准备就绪,可以设置延时操作
  setTimeout(() => {
    fitAddon.fit()
  }, 5)
}
// 是否连接中0 1 2 3
function isWsOpen() {
  const readyState = terminalSocket.value && terminalSocket.value.readyState
  return readyState === 1
}
function fitTerm() {
  fitAddon.fit()
}
const onResize = debounce(() => fitTerm(), 800)

function termData() {
  // 输入与粘贴的情况,onData不能重复绑定,不然会发送多次
  term.value.onData((data) => {
    if (isWsOpen()) {
      terminalSocket.value.send(
        JSON.stringify({
          Op: 'stdin',
          Data: data,
        }),
      )
    }
  })
}
function onTerminalResize() {
  window.addEventListener('resize', onResize)
}
function removeResizeListener() {
  window.removeEventListener('resize', onResize)
}
// 监听类型变化，重置term
// watch(() => props.type, () => {
//   first.value = true
//   loading.value = true
//   terminalSocket.value = null
//   initWS()
//   // 重置
//   term.value.reset()
// })

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
function socketOnOpen() {
  socket.value.onopen = () => {
    console.log('web链接成功')
    // 链接成功后
    initTerm()
  }
}
function socketOnmessage() {
  socket.value.onmessage = (evt) => {
    try {
      if (typeof evt.data === 'string') {
        const msg = evt.data
        if (!msg)
          return
        term.value.write(msg.toString())
      }
    }
    catch (e) {
      console.error(e)
      console.log('parse json error.', evt.data)
    }
  }
}
function socketOnClose() {
  socket.value.onclose = (e) => {
    socket.value.close()
    console.log(`关闭 socket${e}`)
    // if (socket.value) {
    //   socket.value.close();
    // }
    // window.removeEventListener("resize", this.onTerminalResize);
  }
}
function socketOnError() {
  socket.value.onerror = (e) => {
    console.log(`socket 链接失败${e}`)
  }
}

function initTerm1() {
  term.value = new Terminal({
    cursorStyle: 'block',
  })
  // const fitAddon = new FitAddon()
  // term.value.loadAddon(fitAddon)
  // // 自适应大小(使终端的尺寸和几何尺寸适合于终端容器的尺寸)，初始化的时候宽高都是对的
  // fitAddon.fit()
  term.value.focus()

  term.value.open(terminal.value)

  // 监视命令行输入
  const cmdData = ref('')
  term.value.onKey((e) => {
    if (e.key === '\x7F')
      term.value.write('\x1B[D')

    console.log(e.domEvent.key)
  })
  term.value.onData((data) => {
    if (data === '')
      return

    console.log(data)
    term.value.write(data)
    if ((data !== '\r') && (data !== '\u0003')) {
      cmdData.value = cmdData.value + data
    }
    else {
      if (data === '\u0003')
        cmdData.value = `${cmdData.value + data}\n`

      else
        cmdData.value = `${cmdData.value}\n`

      // const cmd = Base64.encode(cmdData.value)
      socket.value.send(`0${cmdData.value}`)
      cmdData.value = ''
    }
  })
}

function closeSocket() {
  if (socket.value)
    socket.value.close()

  if (term.value)
    term.value.dispose()
}

// 卸载前
onBeforeUnmount(() => {
  closeSocket()
})
initTerm()
</script>

<template>
  <div id="xterm-container" ref="terminal" />
</template>

<style scoped>
@import "xterm/css/xterm.css";

#xterm-container {
  width: 100%;
  height: 100%;
}
</style>
