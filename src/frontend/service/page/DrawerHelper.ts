import type { ResType } from '@backend/k8s/watch/watch.model'
import EditorWithDocView from '@frontend/components/common/EditorWithDocView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import type { ConcreteComponent } from '@vue/runtime-core'
import { h } from 'vue'
import type { DrawerServiceApiInjection } from '@frontend/service/drawer-service/DrawerServiceProvider'

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

  async showResourceEditor({
    resType,
                             ns,
                             name,
  }: {
    resType: ResType
    ns: string
    name: string
  }) {
    const resource = await K8sService.getResource({
      resType,
      ns,
      name,
    })
    this
      .showWider(`${resource.kind}:${name}`, EditorWithDocView, { item: resource, docType: resType })
  }
}
