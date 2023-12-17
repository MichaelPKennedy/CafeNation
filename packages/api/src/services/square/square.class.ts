import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Square, SquareData, SquarePatch, SquareQuery } from './square.schema'
import { Client, Environment, ApiError } from 'square'
import crypto from 'crypto'
import { Op } from 'sequelize'
const process = require('process')

export type { Square, SquareData, SquarePatch, SquareQuery }

export interface SquareParams extends Params {
  query?: { latitude: string; longitude: string }
}

export interface ExtendedParams extends Params {
  cookie?: Record<string, string>
}

export class SquareService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: SquareParams): Promise<any[] | Paginated<any>> {
    throw new Error('Method not implemented.')
  }

  async get(id: Id, params?: SquareParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: SquareParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: SquareParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: SquareParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: SquareParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async requestToken(data: any, params?: Params) {
    const state = crypto.randomBytes(32).toString('hex')
    const clientId = process.env.SQ_APPLICATION_ID
    const scopes = [
      'ITEMS_READ',
      'MERCHANT_PROFILE_READ',
      'PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS',
      'PAYMENTS_WRITE',
      'PAYMENTS_READ'
    ].join('+')
    const basePath =
      process.env.SQ_ENVIRONMENT.toLowerCase() === 'production'
        ? `https://connect.squareup.com`
        : `https://connect.squareupsandbox.com`

    const url = `${basePath}/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${scopes}&state=${state}`

    // Setting a cookie for CSRF protection is a bit tricky in FeathersJS context as it does not directly deal with express response objects.
    // You might need to set the cookie on the client-side when redirecting to the URL.
    // Return the URL and state token to the client
    return { url, state }
  }

  async callback(data: any, params?: ExtendedParams) {
    const { code, state } = data
    const expectedState = params?.cookie?.Auth_State // You need to retrieve this from where you stored it

    if (!code || state !== expectedState) {
      throw new Error('Invalid state or missing authorization code')
    }

    const squareClient = new Client({
      environment:
        process.env.SQ_ENVIRONMENT.toLowerCase() === 'production'
          ? Environment.Production
          : Environment.Sandbox
    })

    try {
      const { result } = await squareClient.oAuthApi.obtainToken({
        code,
        clientId: process.env.SQ_APPLICATION_ID,
        clientSecret: process.env.SQ_APPLICATION_SECRET,
        grantType: 'authorization_code'
      })

      const { accessToken, refreshToken, expiresAt, merchantId } = result

      // Here, instead of rendering tokens as in the example, you would typically store these tokens securely,
      // and possibly send a success response back to the client.
      return { accessToken, refreshToken, expiresAt, merchantId }
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Square API error: ${JSON.stringify(error.result)}`)
      } else {
        throw new Error(`An error occurred: ${error}`)
      }
    }
  }
}
