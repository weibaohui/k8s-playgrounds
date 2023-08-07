<script setup lang="ts">
import { saveAs } from 'file-saver'
import { debounce } from 'lodash'
import moment from 'moment'
import type { SelectOption } from 'naive-ui'
import { NButton, NCheckbox, NDatePicker, NDropdown, NFormItemGi, NGrid, NSelect } from 'naive-ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { TerminalData } from '../../../backend/model/watch.model'
import { TimerUtils } from '../../../backend/utils/TimerUtils'
import { SocketIOService } from '../../service/k8s/SocketIOService'
import { K8sService } from '../../service/k8s/K8sService'
import 'xterm/css/xterm.css'
import { V1Pod } from '../../../backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const terminalDom = ref(null)
const terminalSocket = ref(null)
const term = ref(null)
const fitAddon = new FitAddon()
const selectedContainerName = ref('')
const logShowTimestamp = ref<boolean>(false)
const logFollow = ref<boolean>(true)
const logShowAll = ref<boolean>(false)
const sinceTimestamp = ref<number>(moment().valueOf())
const options = ref<SelectOption[]>()
const shortcuts = {
  '1d': () => new Date().getTime() - 24 * 60 * 60 * 1000,
  '1h': () => new Date().getTime() - 60 * 60 * 1000,
  '10m': () => new Date().getTime() - 10 * 60 * 1000,
  '5m': () => new Date().getTime() - 5 * 60 * 1000,
}
const downloadOptions = [
  {
    label: '显示日志',
    key: 'term',
  },
  {
    label: '全部日志',
    key: 'all',
  },
]
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
  TimerUtils.delay(() => fitAddon.fit(), 500)
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
  x.logOptions = {
    showTimestamp: logShowTimestamp.value,
    follow: logFollow.value,
    sinceTimestamp: moment(sinceTimestamp.value).toISOString(),
    showAll: logShowAll.value,
  }
  x.lastHeartBeatTime = moment().toISOString()
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
function handleDownloadSelect(key: string) {
  console.log(key)
  const x = new TerminalData()
  x.ns = props.pod.metadata.namespace
  x.name = props.pod.metadata.name
  x.containerName = selectedContainerName.value
  if (key === 'all') {
    const url = K8sService.podService.getPodContainerLogsDownloadURL(x.ns, x.name, x.containerName)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    document.body.appendChild(link)
    link.click()
  }
  else if (key === 'term') {
    term.value.selectAll()
    const selection = term.value.getSelection()
    const str = new Blob([selection], { type: 'text/plain;charset=utf-8' })
    saveAs(str, `${x.ns}-${x.name}-${x.containerName}-${Math.random()}.txt`)
  }
}
function onShowTimestampChange() {
  sendInitCommand()
}
function onTimeChange() {
  sendInitCommand()
}
function onFollowChange() {
  sendInitCommand()
}
function onShowAllChange() {
  sendInitCommand()
}
function sendInitCommand() {
  TimerUtils.delay(() => sendCommand('start'), 500)
}
function sendHeartBeat() {
  return TimerUtils.everyTwentySeconds(() => sendCommand('HeartBeat'))
}
let heartBeatInstId: number
onMounted(() => {
  initWS()
  initTerm()
  onTerminalResize()
  fillContainerOptions()
  sendInitCommand()
  heartBeatInstId = sendHeartBeat()
})
onBeforeUnmount(() => {
  removeResizeListener()
  clearInterval(heartBeatInstId)
})
</script>

<template>
  <NGrid :cols="24" :x-gap="24">
    <NFormItemGi :span="1" />
    <NFormItemGi :span="4">
      <NSelect
        v-model:value="selectedContainerName" :options="options" show-checkmark show-on-focus
        placeholder="请选择容器"
        @update:value="onContainerChanged"
      />
    </NFormItemGi>
    <NFormItemGi :span="19">
      <NCheckbox
        v-model:checked="logFollow"
        disabled
        @update:checked="onFollowChange"
      >
        跟随
      </NCheckbox>
      <NCheckbox
        v-model:checked="logShowTimestamp"
        @update:checked="onShowTimestampChange"
      >
        显示时间戳
      </NCheckbox>
      日志范围<NCheckbox
        v-model:checked="logShowAll"
        @update:checked="onShowAllChange"
      />
      全部
      <NDatePicker
        v-if="!logShowAll"
        v-model:value="sinceTimestamp"
        type="datetime"
        :shortcuts="shortcuts"
        @update:value="onTimeChange"
      />
      <NDropdown trigger="hover" :options="downloadOptions" @select="handleDownloadSelect">
        <NButton>下载</NButton>
      </NDropdown>
    </NFormItemGi>
  </NGrid>

  <div id="xterm-container" ref="terminalDom" />
</template>

<style scoped>
#xterm-container {
  width: 100%;
  height: 100%;
}
</style>
