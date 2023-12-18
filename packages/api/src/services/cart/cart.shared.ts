// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Cart, CartData, CartPatch, CartQuery, CartService } from './cart.class'

export type { Cart, CartData, CartPatch, CartQuery }

export type CartClientService = Pick<CartService, (typeof cartMethods)[number]>

export const cartPath = 'cart'

export const cartMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const cartClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(cartPath, connection.service(cartPath), {
    methods: cartMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [cartPath]: CartClientService
  }
}
