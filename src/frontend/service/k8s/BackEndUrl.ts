export class BackEndUrl {
  /**
   * 通过vite 默认端口判断是否在本地调试状态
   *
   */
  static getUrl() {
    if (window.location.port === '5173')
      return 'http://127.0.0.1:3007'
    return `${window.location.protocol}//${window.location.host}`
  }
}
