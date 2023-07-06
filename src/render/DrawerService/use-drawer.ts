import { drawerServiceApiInjectionKey } from '@render/DrawerService/context'
import type { DrawerServiceApiInjection } from '@render/DrawerService/DrawerServiceProvider'
import { throwError } from 'naive-ui/es/_utils'
import { inject } from 'vue'

export function useDrawerService(): DrawerServiceApiInjection {
  const api = inject(drawerServiceApiInjectionKey, null)
  if (api === null) {
    throwError(
      'use-drawer',
      'No outer <n-drawer-service-provider /> founded. xoxoxoxox',
    )
  }
  return api
}
