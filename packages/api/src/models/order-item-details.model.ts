import { DataTypes, Model, Sequelize } from 'sequelize'
import { Orders } from './orders.model'
import { Products } from './products.model'
import { Ingredients } from './ingredients.model'

export class OrderItemDetails extends Model {}

export const OrderItemDetailModel = (sequelize: Sequelize) => {
  OrderItemDetails.init(
    {
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
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Ingredients,
          key: 'ingredient_id'
        }
      },
      instruction_type: {
        type: DataTypes.STRING(10),
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'order_item_details',
      timestamps: false
    }
  )
}
