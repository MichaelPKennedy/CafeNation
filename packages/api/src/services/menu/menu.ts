// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { MenuService } from './menu.class'
import { menuPath, menuMethods } from './menu.shared'
import { menuHooks } from './menu.hooks'

export * from './menu.class'
export * from './menu.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const menu = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(menuPath, new MenuService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: menuMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(menuPath).hooks(menuHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [menuPath]: MenuService
  }
}
