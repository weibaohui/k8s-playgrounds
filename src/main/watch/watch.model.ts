import { IPty } from 'node-pty'

export class TerminalData {
  ns: string
  name: string
  containerName: string
  /**
   * 命令
    */
  command: string
  /**
   * 执行结果
   */
  data: string
  /**
   * resize
   */
  columns: number
  rows: number
  /**
   * 日志选项
   */
  logOptions: {
    showTimestamp: boolean
    follow: boolean
    sinceTimestamp: string
  }

  /**
   * 心跳
   */
  lastHeartBeatTime: string
}
export class TerminalInstance {
  lastHeartBeatTime: string
  pty: IPty
}
