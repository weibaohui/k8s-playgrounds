export class ClipboardHelper {
  static copyToClipboard(text, okCb?: () => void, errCb?: (string?: object) => void) {
    navigator.clipboard.writeText(text)
      .then(() => {
        okCb?.()
      })
      .catch((error) => {
        errCb?.(error)
      })
  }
}
