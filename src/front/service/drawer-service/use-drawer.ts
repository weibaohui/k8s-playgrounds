import { throwError } from 'naive-ui/es/_utils'
import { inject } from 'vue'
import { drawerServiceApiInjectionKey } from '../../service/drawer-service/context'
import type { DrawerServiceApiInjection } from '../../service/drawer-service/DrawerServiceProvider'

export function useDrawerService(): DrawerServiceApiInjection {
  const api = inject(drawerServiceApiInjectionKey, null)
  if (api === null) {
    throwError(
      'use-drawer',
      'No outer <DrawerServiceProvider></DrawerServiceProvider> founded.',
    )
  }
  return api
}
