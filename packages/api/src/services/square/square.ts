// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { SquareService } from './square.class'
import { squarePath, squareMethods } from './square.shared'
import { squareHooks } from './square.hooks'

export * from './square.class'
export * from './square.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const square = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(squarePath, new SquareService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: squareMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(squarePath).hooks(squareHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [squarePath]: SquareService
  }
}
