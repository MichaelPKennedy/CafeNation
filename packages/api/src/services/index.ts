import { menu } from './menu/menu'
import { user } from './users/users'
import { square } from './square/square'

// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(menu)
  app.configure(user)
  app.configure(square)
  // All services will be registered here
}
