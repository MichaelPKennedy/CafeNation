import { DataTypes, Model, Sequelize } from 'sequelize'
import { Orders } from './orders.model'
import { Products } from './products.model'
import { Users } from './users.model'

export class Cart extends Model {}

export const CartModel = (sequelize: Sequelize) => {
  Cart.init(
    {
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Orders,
          key: 'order_id'
        }
      },
      product_id: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      item_name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      item_variation_id: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      variation_name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: true
      },
      additional_notes: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Users,
          key: 'user_id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'cart',
      timestamps: true
    }
  )
}
