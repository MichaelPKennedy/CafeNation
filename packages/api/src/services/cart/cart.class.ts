import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Cart, CartData, CartPatch, CartQuery } from './cart.schema'
import { Op } from 'sequelize'
const process = require('process')
const { Client } = require('square')
import NodeCache from 'node-cache'

const myCache = new NodeCache({ stdTTL: 600 }) // Cache for 10 minutes

export type { Cart, CartData, CartPatch, CartQuery }

export interface CartParams extends Params {
  query?: { user_id: string; cart_id: string }
}

export interface CartItem {
  itemId: string
  quantity: number
  orderDetails: any[]
}

export class CartService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: CartParams): Promise<CartItem[]> {
    if (!params.query || !params.query.user_id) {
      throw new Error('No user_id provided in params')
    }
    const { user_id } = params.query
    const cartItems = await this.sequelize.models.Cart.findAll({
      where: { user_id }
    })
    return cartItems
  }

  async get(cart_id: Id, params?: Params): Promise<CartItem> {
    const cartItem = await this.sequelize.models.Cart.findByPk(cart_id, {})
    return cartItem
  }

  async create(data: CartItem, params?: Params): Promise<CartItem> {
    const newCartItem = await this.sequelize.models.Cart.create(data)
    return this.get(newCartItem.cart_id)
  }

  async update(cart_id: Id, data: any, params?: Params): Promise<CartItem> {
    const { orderDetails, ...cartData } = data

    await this.sequelize.models.Cart.update(cartData, {
      where: { cart_id }
    })

    return this.get(cart_id, params)
  }

  async patch(cart_id: Id, data: any, params?: Params): Promise<CartItem> {
    const { orderDetails, ...cartData } = data

    await this.sequelize.models.Cart.update(cartData, {
      where: { cart_id }
    })

    return this.get(cart_id, params)
  }

  async remove(cart_id: NullableId, params?: Params): Promise<CartItem> {
    if (cart_id === null) {
      if (!params?.query?.user_id) {
        throw new Error('No user_id provided in params')
      }
      const { user_id } = params.query
      const cartItems = await this.sequelize.models.Cart.findAll({
        where: { user_id }
      })
      await this.sequelize.models.Cart.destroy({
        where: { user_id }
      })
      return cartItems
    }

    const cartItem = await this.get(cart_id, params)
    await this.sequelize.models.Cart.destroy({
      where: { cart_id }
    })
    return cartItem
  }
}
