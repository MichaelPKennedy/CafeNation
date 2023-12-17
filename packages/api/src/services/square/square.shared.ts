// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Square, SquareData, SquarePatch, SquareQuery, SquareService } from './square.class'

export type { Square, SquareData, SquarePatch, SquareQuery }

export type SquareClientService = Pick<SquareService, (typeof squareMethods)[number]>

export const squarePath = 'square'

export const squareMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const squareClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(squarePath, connection.service(squarePath), {
    methods: squareMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [squarePath]: SquareClientService
  }
}
