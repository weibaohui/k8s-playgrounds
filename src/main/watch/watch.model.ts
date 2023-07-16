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
}
