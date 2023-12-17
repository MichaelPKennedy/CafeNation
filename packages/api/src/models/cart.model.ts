import { DataTypes, Model, Sequelize } from 'sequelize'
import { Orders } from './orders.model'
import { Products } from './products.model'

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
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Products,
          key: 'product_id'
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
      timestamps: false
    }
  )
}
