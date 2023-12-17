import { DataTypes, Model, Sequelize } from 'sequelize'
import { Customers } from './customers.model'
import { Locations } from './locations.model'

export class Orders extends Model {}

export const OrderModel = (sequelize: Sequelize) => {
  Orders.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Customers,
          key: 'customer_id'
        }
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Locations,
          key: 'location_id'
        }
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      order_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      order_date_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      special_instruction: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'orders',
      timestamps: false
    }
  )
}
