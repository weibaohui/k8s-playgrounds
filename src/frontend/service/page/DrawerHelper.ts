import type { ConcreteComponent } from '@vue/runtime-core'
import { h } from 'vue'
import type { DrawerServiceApiInjection } from '../../service/drawer-service/DrawerServiceProvider'

export class DrawerHelper {
  private _drawer: DrawerServiceApiInjection
  drawer(drawer: DrawerServiceApiInjection): DrawerHelper {
    this._drawer = drawer
    return this
  }

  static instance = new DrawerHelper()

  /**
   * 显示抽屉
   * @param title 标题
   * @param comp 组件
   * @param compProps 组件参数
   */
  show(title, comp: ConcreteComponent, compProps?: object) {
    this._drawer.showDrawer(
      {
        title,
        width: '50%',
      },
      h(comp, compProps),
    )
  }

  showWider(title, comp: ConcreteComponent, compProps?: object) {
    this._drawer.showDrawer(
      {
        title,
        width: '80%',
      },
      h(comp, compProps),
    )
  }
}
