// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { orderClient } from './services/order/order.shared'
export type { Order, OrderData, OrderQuery, OrderPatch } from './services/order/order.shared'

import { cartClient } from './services/cart/cart.shared'
export type { Cart, CartData, CartQuery, CartPatch } from './services/cart/cart.shared'

import { menuClient } from './services/menu/menu.shared'
export type { Menu, MenuData, MenuQuery, MenuPatch } from './services/menu/menu.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

import { squareClient } from './services/square/square.shared'
export type { Square, SquareData, SquareQuery, SquarePatch } from './services/square/square.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(squareClient)
  client.configure(userClient)
  client.configure(menuClient)
  client.configure(cartClient)
  client.configure(orderClient)
  return client
}
