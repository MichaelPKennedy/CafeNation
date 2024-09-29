import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Order, OrderData, OrderPatch, OrderQuery } from './order.schema'
import { Op } from 'sequelize'
import process from 'process'
import { Client, Environment, ApiError } from 'square'
import NodeCache from 'node-cache'

const myCache = new NodeCache({ stdTTL: 600 }) // Cache for 10 minutes

export type { Order, OrderData, OrderPatch, OrderQuery }

export interface OrderParams extends Params {
  query?: { latitude: string; longitude: string }
}

export class OrderService implements ServiceMethods<any> {
  app: Application
  sequelize: any
  squareClient: Client

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
    this.squareClient = new Client({
      environment:
        process.env.SQ_ENVIRONMENT?.toLowerCase() === 'production'
          ? Environment.Production
          : Environment.Sandbox,
      accessToken: process.env.SQ_ACCESS_TOKEN
    })
  }

  async find(params: Params): Promise<any[]> {
    throw new Error('Method not implemented.')
  }

  async get(id: Id, params?: OrderParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: OrderParams): Promise<any> {
    const { user_id, cart_items, total_price, location_id, source_id } = data

    if (!source_id) {
      throw new Error('source_id is required')
    }

    try {
      const result = await this.sequelize.transaction(async (t: any) => {
        const order = await this.sequelize.models.Orders.create(
          {
            user_id,
            location_id,
            total_price,
            order_status: 'PENDING',
            order_date_time: new Date(),
            source_id
          },
          { transaction: t }
        )

        const lineItems = cart_items.map((item: any) => ({
          quantity: item.quantity.toString(),
          catalogObjectId: item.product_id
        }))

        const payment = await this.squareClient.ordersApi.createOrder({
          order: {
            locationId: location_id,
            lineItems: lineItems,
            state: 'OPEN'
          },
          idempotencyKey: order.order_id.toString()
        })

        if (payment.result.order) {
          const squareOrderId = payment.result.order.id

          const paymentResult = await this.squareClient.paymentsApi.createPayment({
            sourceId: source_id,
            idempotencyKey: `${order.order_id}_payment`,
            orderId: squareOrderId,
            amountMoney: {
              amount: total_price,
              currency: 'USD'
            },
            locationId: location_id
          })

          if (paymentResult.result.payment?.status === 'COMPLETED') {
            await order.update({ order_status: 'PAID', square_order_id: squareOrderId }, { transaction: t })
          } else {
            throw new Error('Payment failed')
          }
        } else {
          throw new Error('Failed to create Square order')
        }

        return order
      })

      if (user_id) {
        await this.app.service('cart').remove(null, { query: { user_id } })
      }

      return result
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Square API error: ${JSON.stringify(error.result)}`)
      } else {
        throw new Error(`An error occurred: ${error}`)
      }
    }
  }

  async update(id: NullableId, data: any, params?: OrderParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: OrderParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: OrderParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
