import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'

export class DialogHelper {
  static instance = new DialogHelper()
  private _dialog: DialogApiInjection
  Dialog(dialog: DialogApiInjection): DialogHelper {
    this._dialog = dialog
    return this
  }

  /**
   * 显示抽屉
   * @param action
   * @param okFunc
   * @param cancelFunc
   */
  Confirm(action: string, okFunc: () => void, cancelFunc?: () => void) {
    this._dialog.warning({
      title: '警告',
      content: `你确定${action}吗?`,
      positiveText: action,
      negativeText: '取消',
      onPositiveClick: () => {
        okFunc()
      },
      onNegativeClick: () => {
        cancelFunc?.()
      },
    })
  }
}
