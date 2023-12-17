// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const squareSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Square', additionalProperties: false }
)
export type Square = Static<typeof squareSchema>
export const squareValidator = getValidator(squareSchema, dataValidator)
export const squareResolver = resolve<Square, HookContext>({})

export const squareExternalResolver = resolve<Square, HookContext>({})

// Schema for creating new entries
export const squareDataSchema = Type.Pick(squareSchema, ['text'], {
  $id: 'SquareData'
})
export type SquareData = Static<typeof squareDataSchema>
export const squareDataValidator = getValidator(squareDataSchema, dataValidator)
export const squareDataResolver = resolve<Square, HookContext>({})

// Schema for updating existing entries
export const squarePatchSchema = Type.Partial(squareSchema, {
  $id: 'SquarePatch'
})
export type SquarePatch = Static<typeof squarePatchSchema>
export const squarePatchValidator = getValidator(squarePatchSchema, dataValidator)
export const squarePatchResolver = resolve<Square, HookContext>({})

// Schema for allowed query properties
export const squareQueryProperties = Type.Pick(squareSchema, ['id', 'text'])
export const squareQuerySchema = Type.Intersect(
  [
    querySyntax(squareQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SquareQuery = Static<typeof squareQuerySchema>
export const squareQueryValidator = getValidator(squareQuerySchema, queryValidator)
export const squareQueryResolver = resolve<SquareQuery, HookContext>({})
