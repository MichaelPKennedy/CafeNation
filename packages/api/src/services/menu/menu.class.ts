import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Menu, MenuData, MenuPatch, MenuQuery } from './menu.schema'
import { Op } from 'sequelize'
const process = require('process')
const { Client } = require('square')
import NodeCache from 'node-cache'
const _ = require('lodash')

const myCache = new NodeCache({ stdTTL: 600 }) // Cache for 10 minutes

export type { Menu, MenuData, MenuPatch, MenuQuery }

export interface MenuParams extends Params {
  query?: { latitude: string; longitude: string }
}

export interface category {
  id: string
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
    const processedResponse = Array.isArray(response)
      ? response.map(this.bigIntToString.bind(this))
      : [this.bigIntToString(response)]
    return processedResponse
  }

  async find(params: Params): Promise<any[]> {
    const cacheKey = 'catalog'
    let catalogData: any[] = myCache.get(cacheKey) || []

    if (catalogData.length > 0) {
      return catalogData
    } else {
      try {
        const client = new Client({
          environment: process.env.SQ_ENVIRONMENT,
          accessToken: process.env.SQ_ACCESS_TOKEN
        })

        const response = await client.catalogApi.listCatalog()
        catalogData = this.processApiResponse(response.result.objects)

        //TODO: turn the following logic into one or more feathers hooks
        const categories = catalogData?.filter((item) => item.categoryData)
        if (categories) {
          for (const category of categories) {
            category.categoryItems = []
            for (const item of catalogData) {
              if (item.itemData && item.itemData.categories.some((cat: category) => cat.id === category.id)) {
                category.categoryItems.push(item)
              }
            }
          }
        }
        //set parent type for categories
        for (const item of catalogData) {
          if (item.type === 'CATEGORY') {
            const splitName = item.categoryData.name.split('-', 2)
            if (splitName.length === 2) {
              item.parentType = _.startCase(_.toLower(splitName[0]))
              item.categoryData.name = splitName[1]
            }
          }
          //set image urls
          if (item.type === 'ITEM' && item?.itemData?.imageIds) {
            try {
              const imageId = item.itemData?.imageIds?.[0]
              const imageResponse = await client.catalogApi.retrieveCatalogObject(imageId, true)
              const imageUrl = imageResponse.result.object?.imageData?.url
              item.imageUrl = imageUrl

              if (item.customAttributeValues) {
                for (const key in item.customAttributeValues) {
                  const attribute = item.customAttributeValues[key]
                  if (attribute.name === 'Category Image' && attribute.booleanValue === true) {
                    item.categoryImage = true
                  }
                  if (attribute.name === 'Featured' && attribute.booleanValue === true) {
                    item.featured = true
                  }
                }
              }
            } catch (error) {
              console.error('Error fetching image data:', error)
            }
          }
        }

        //add items to secondary categories
        for (const item of catalogData) {
          if (item.customAttributeValues) {
            for (const key in item.customAttributeValues) {
              const attribute = item.customAttributeValues[key]
              if (attribute.name === 'Secondary Category') {
                const secondaryCategory = catalogData.find(
                  (category) => category?.categoryData?.name === attribute.stringValue
                )
                if (secondaryCategory) {
                  secondaryCategory.categoryItems.push(item)
                }
              }
            }
          }
        }

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
