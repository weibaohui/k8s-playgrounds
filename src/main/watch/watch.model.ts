import { IPty } from 'node-pty'

export class TerminalData {
  ns: string
  name: string
  containerName: string
  // 命令
  command: string
  // 执行结果
  data: string
  // resize
  columns: number
  rows: number
  logOptions: {
    showTimestamp: boolean
    follow: boolean
    sinceTimestamp: string
  }

  lastHeartBeatTime: string
}
export class TerminalInstance {
  lastHeartBeatTime: string
  pty: IPty
}
