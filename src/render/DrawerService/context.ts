import type { DrawerServiceApiInjection, DrawerServiceSetupProps } from '@render/DrawerService/DrawerServiceProvider'
import { createInjectionKey } from 'naive-ui/es/_utils'

export const drawerServiceApiInjectionKey
  = createInjectionKey<DrawerServiceApiInjection>('x-drawer-service-api')

export const drawerServiceProviderInjectionKey = createInjectionKey<{
  props: DrawerServiceSetupProps
}>('x-drawer-service-provider')
