require('dotenv').config()
import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import { Request, Response, NextFunction } from 'express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
import { Sequelize } from 'sequelize'
const { oauth } = require('@feathersjs/authentication-oauth')
import cookieParser from 'cookie-parser'
import crypto from 'crypto'
import { Client, Environment } from 'square'
import { SquareService } from './services/square/square.class'

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logger } from './logger'
import { logError } from './hooks/log-error'
import { authentication } from './authentication'
import { services } from './services/index'
import { channels } from './channels'
import { CartModel } from './models/cart.model'
import { UsersModel } from './models/users.model'
import { IngredientModel } from './models/ingredients.model'
import { InventoryModel } from './models/inventory.model'
import { InventoryIngredientModel } from './models/inventory-ingredients.model'
import { LocationModel } from './models/locations.model'
import { MenuCategoryModel } from './models/menu-categories.model'
import { MenuItemModel } from './models/menu-items.model'
import { MenuModel } from './models/menus.model'
import { MenuScheduleModel } from './models/menus-schedule.model'
import { OrderItemDetailModel } from './models/order-item-details.model'
import { OrderModel } from './models/orders.model'
import { ProductIngredientModel } from './models/product-ingredients.model'
import { ProductModel } from './models/products.model'
import { ReservationModel } from './models/reservations.model'
import { RestaurantModel } from './models/restaurants.model'
import { ScheduleModel } from './models/schedules.model'
import { TransactionModel } from './models/transactions.model'
const app: Application = express(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

const databaseConfig = require('../../config/databaseConfig.js')[process.env.NODE_ENV || 'development']
const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: databaseConfig.dialect
})

app.set('sequelizeClient' as any, sequelize)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

// Initialize your model with this instance
MenuCategoryModel(sequelize)
RestaurantModel(sequelize)
LocationModel(sequelize)
ProductModel(sequelize)
IngredientModel(sequelize)
ProductIngredientModel(sequelize)
InventoryModel(sequelize)
InventoryIngredientModel(sequelize)
MenuModel(sequelize)
MenuItemModel(sequelize)
ScheduleModel(sequelize)
MenuScheduleModel(sequelize)
UsersModel(sequelize)
OrderModel(sequelize)
CartModel(sequelize)
OrderItemDetailModel(sequelize)
TransactionModel(sequelize)
ReservationModel(sequelize)

const Cart = sequelize.models.Cart
const Ingredients = sequelize.models.Ingredients
const Inventory = sequelize.models.Inventory
const InventoryIngredients = sequelize.models.InventoryIngredients
const Locations = sequelize.models.Locations
const MenuCategories = sequelize.models.MenuCategories
const MenuItems = sequelize.models.MenuItems
const Menus = sequelize.models.Menus
const MenusSchedule = sequelize.models.MenusSchedule
const OrderItemDetails = sequelize.models.OrderItemDetails
const Orders = sequelize.models.Orders
const ProductIngredients = sequelize.models.ProductIngredients
const Products = sequelize.models.Products
const Reservations = sequelize.models.Reservations
const Restaurants = sequelize.models.Restaurants
const Schedules = sequelize.models.Schedules
const Transactions = sequelize.models.Transactions
const Users = sequelize.models.Users

// Cart Relationships
Cart.belongsTo(sequelize.models.Orders, { foreignKey: 'order_id' })
Cart.belongsTo(sequelize.models.Products, { foreignKey: 'product_id' })

// Customer Relationships
Users.hasMany(sequelize.models.Orders, { foreignKey: 'user_id' })
Users.hasMany(sequelize.models.Reservations, { foreignKey: 'user_id' })
Users.hasMany(sequelize.models.Transactions, { foreignKey: 'user_id' })

// Order Relationships
Orders.belongsTo(sequelize.models.Users, { foreignKey: 'user_id' })
Orders.belongsTo(sequelize.models.Locations, { foreignKey: 'location_id' })
Orders.hasMany(sequelize.models.Cart, { foreignKey: 'order_id' })
Orders.hasMany(sequelize.models.OrderItemDetails, { foreignKey: 'order_id' })
Orders.hasMany(sequelize.models.Transactions, { foreignKey: 'order_id' })

// Product Relationships
Products.belongsTo(sequelize.models.MenuCategories, { foreignKey: 'category_id' })
Products.hasMany(sequelize.models.Cart, { foreignKey: 'product_id' })
Products.hasMany(sequelize.models.OrderItemDetails, { foreignKey: 'product_id' })
Products.hasMany(sequelize.models.ProductIngredients, { foreignKey: 'product_id' })
Products.hasMany(sequelize.models.MenuItems, { foreignKey: 'product_id' })

// MenuCategory Relationships
MenuCategories.hasMany(sequelize.models.Products, { foreignKey: 'category_id' })

// Menu Relationships
Menus.hasMany(sequelize.models.MenuItems, { foreignKey: 'menu_id' })
Menus.hasMany(sequelize.models.MenusSchedule, { foreignKey: 'menu_id' })

// MenuItems Relationships
MenuItems.belongsTo(sequelize.models.Menus, { foreignKey: 'menu_id' })
MenuItems.belongsTo(sequelize.models.Products, { foreignKey: 'product_id' })

// Ingredient Relationships
Ingredients.hasMany(sequelize.models.InventoryIngredients, { foreignKey: 'ingredient_id' })
Ingredients.hasMany(sequelize.models.OrderItemDetails, { foreignKey: 'ingredient_id' })
Ingredients.hasMany(sequelize.models.ProductIngredients, { foreignKey: 'ingredient_id' })

// Inventory Relationships
Inventory.hasMany(sequelize.models.InventoryIngredients, { foreignKey: 'inventory_id' })

// Location Relationships
Locations.hasMany(sequelize.models.Inventory, { foreignKey: 'location_id' })
Locations.hasMany(sequelize.models.Orders, { foreignKey: 'location_id' })
Locations.hasMany(sequelize.models.Reservations, { foreignKey: 'location_id' })
Locations.hasMany(sequelize.models.Schedules, { foreignKey: 'location_id' })

// Reservation Relationships
Reservations.belongsTo(sequelize.models.Users, { foreignKey: 'user_id' })
Reservations.belongsTo(sequelize.models.Locations, { foreignKey: 'location_id' })

// Restaurant Relationships
Restaurants.hasMany(sequelize.models.Locations, { foreignKey: 'restaurant_id' })

// Schedule Relationships
Schedules.belongsTo(sequelize.models.Locations, { foreignKey: 'location_id' })
Schedules.hasMany(sequelize.models.MenusSchedule, { foreignKey: 'schedule_id' })

// Transaction Relationships
Transactions.belongsTo(sequelize.models.Users, { foreignKey: 'user_id' })
Transactions.belongsTo(sequelize.models.Orders, { foreignKey: 'order_id' })

// OrderItemDetails Relationships
OrderItemDetails.belongsTo(sequelize.models.Orders, { foreignKey: 'order_id' })
OrderItemDetails.belongsTo(sequelize.models.Products, { foreignKey: 'product_id' })
OrderItemDetails.belongsTo(sequelize.models.Ingredients, { foreignKey: 'ingredient_id' })

// InventoryIngredients Relationships
InventoryIngredients.belongsTo(sequelize.models.Inventory, { foreignKey: 'inventory_id' })
InventoryIngredients.belongsTo(sequelize.models.Ingredients, { foreignKey: 'ingredient_id' })

// ProductIngredients Relationships
ProductIngredients.belongsTo(sequelize.models.Products, { foreignKey: 'product_id' })
ProductIngredients.belongsTo(sequelize.models.Ingredients, { foreignKey: 'ingredient_id' })

// MenusSchedule Relationships
MenusSchedule.belongsTo(sequelize.models.Menus, { foreignKey: 'menu_id' })
MenusSchedule.belongsTo(sequelize.models.Schedules, { foreignKey: 'schedule_id' })

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(authentication)
app.configure(oauth({}))
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

//setup Square connection
const squareClient = new Client({
  environment:
    process.env.SQ_ENVIRONMENT?.toLowerCase() === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQ_ACCESS_TOKEN
})
app.squareClient = squareClient
app.use(cookieParser())
const sequelizeClient = app.get('sequelizeClient' as any)
const squareService = new SquareService(app, sequelizeClient)
const handleRequestToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await squareService.requestToken(req.body, req.feathers)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

// Middleware for callback
const handleCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await squareService.callback(req.body, req.feathers)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

app.post('/square/request_token', handleRequestToken)
app.post('/square/callback', handleCallback)

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})

// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
