import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Order, OrderData, OrderPatch, OrderQuery } from './order.schema'
import { Op } from 'sequelize'
const process = require('process')
const { Client } = require('square')
import NodeCache from 'node-cache'

const myCache = new NodeCache({ stdTTL: 600 }) // Cache for 10 minutes

export type { Order, OrderData, OrderPatch, OrderQuery }

export interface OrderParams extends Params {
  query?: { latitude: string; longitude: string }
}

export class OrderService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: Params): Promise<any[]> {
    throw new Error('Method not implemented.')
  }

  async get(id: Id, params?: OrderParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: OrderParams): Promise<any> {
    throw new Error('Method not implemented.')
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
