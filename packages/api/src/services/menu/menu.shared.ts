// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Menu, MenuData, MenuPatch, MenuQuery, MenuService } from './menu.class'

export type { Menu, MenuData, MenuPatch, MenuQuery }

export type MenuClientService = Pick<MenuService, (typeof menuMethods)[number]>

export const menuPath = 'menu'

export const menuMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const menuClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(menuPath, connection.service(menuPath), {
    methods: menuMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [menuPath]: MenuClientService
  }
}
