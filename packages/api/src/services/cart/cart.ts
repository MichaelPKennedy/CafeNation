// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { CartService } from './cart.class'
import { cartPath, cartMethods } from './cart.shared'
import { cartHooks } from './cart.hooks'

export * from './cart.class'
export * from './cart.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const cart = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(cartPath, new CartService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: cartMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(cartPath).hooks(cartHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [cartPath]: CartService
  }
}
