import { drawerServiceApiInjectionKey } from '@render/service/drawer-service/context'
import type { DrawerServiceApiInjection } from '@render/service/drawer-service/DrawerServiceProvider'
import { throwError } from 'naive-ui/es/_utils'
import { inject } from 'vue'

export function useDrawerService(): DrawerServiceApiInjection {
  const api = inject(drawerServiceApiInjectionKey, null)
  if (api === null) {
    throwError(
      'use-drawer',
      'No outer <DrawerServiceProvider></DrawerServiceProvider> founded. xoxoxoxox',
    )
  }
  return api
}
