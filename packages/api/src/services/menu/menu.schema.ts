// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const menuSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Menu', additionalProperties: false }
)
export type Menu = Static<typeof menuSchema>
export const menuValidator = getValidator(menuSchema, dataValidator)
export const menuResolver = resolve<Menu, HookContext>({})

export const menuExternalResolver = resolve<Menu, HookContext>({})

// Schema for creating new entries
export const menuDataSchema = Type.Pick(menuSchema, ['text'], {
  $id: 'MenuData'
})
export type MenuData = Static<typeof menuDataSchema>
export const menuDataValidator = getValidator(menuDataSchema, dataValidator)
export const menuDataResolver = resolve<Menu, HookContext>({})

// Schema for updating existing entries
export const menuPatchSchema = Type.Partial(menuSchema, {
  $id: 'MenuPatch'
})
export type MenuPatch = Static<typeof menuPatchSchema>
export const menuPatchValidator = getValidator(menuPatchSchema, dataValidator)
export const menuPatchResolver = resolve<Menu, HookContext>({})

// Schema for allowed query properties
export const menuQueryProperties = Type.Pick(menuSchema, ['id', 'text'])
export const menuQuerySchema = Type.Intersect(
  [
    querySyntax(menuQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MenuQuery = Static<typeof menuQuerySchema>
export const menuQueryValidator = getValidator(menuQuerySchema, queryValidator)
export const menuQueryResolver = resolve<MenuQuery, HookContext>({})
