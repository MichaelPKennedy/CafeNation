// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { OrderService } from './order.class'
import { orderPath, orderMethods } from './order.shared'
import { orderHooks } from './order.hooks'

export * from './order.class'
export * from './order.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const order = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(orderPath, new OrderService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: orderMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(orderPath).hooks(orderHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [orderPath]: OrderService
  }
}
