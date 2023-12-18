import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Menu, MenuData, MenuPatch, MenuQuery } from './menu.schema'
import { Op } from 'sequelize'
const process = require('process')
const { Client } = require('square')
import NodeCache from 'node-cache'

const myCache = new NodeCache({ stdTTL: 600 }) // Cache for 10 minutes

export type { Menu, MenuData, MenuPatch, MenuQuery }

export interface MenuParams extends Params {
  query?: { latitude: string; longitude: string }
}

export class MenuService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  bigIntToString(obj: any): any {
    if (typeof obj === 'bigint') {
      return obj.toString()
    } else if (Array.isArray(obj)) {
      return obj.map(this.bigIntToString.bind(this))
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, this.bigIntToString(val)]))
    }
    return obj
  }

  processApiResponse(response: any): any[] {
    // Ensure that the processed response is an array
    const processedResponse = Array.isArray(response)
      ? response.map(this.bigIntToString.bind(this))
      : [this.bigIntToString(response)]
    return processedResponse
  }

  async find(params: Params): Promise<any[]> {
    const cacheKey = 'catalog'
    let catalogData: any[] = myCache.get(cacheKey) || []

    if (catalogData.length > 0) {
      // Cache hit, return the data
      return catalogData
    } else {
      // Cache miss, fetch the data from Square API
      try {
        const client = new Client({
          environment: process.env.SQ_ENVIRONMENT,
          accessToken: process.env.SQ_ACCESS_TOKEN
        })

        const response = await client.catalogApi.listCatalog()
        catalogData = this.processApiResponse(response.result.objects)

        // Cache the processed response
        myCache.set(cacheKey, catalogData)

        return catalogData
      } catch (error) {
        console.error('Error calling Square Catalog API:', error)
        throw new Error('Error fetching menu items.')
      }
    }
  }

  async get(id: Id, params?: MenuParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: MenuParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: MenuParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: MenuParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: MenuParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
