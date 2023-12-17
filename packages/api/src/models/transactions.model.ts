import { DataTypes, Model, Sequelize } from 'sequelize'
import { Customers } from './customers.model'
import { Orders } from './orders.model'

export class Transaction extends Model {}

export const TransactionModel = (sequelize: Sequelize) => {
  Transaction.init(
    {
      transaction_id: {
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
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Orders,
          key: 'order_id'
        }
      },
      points_earned: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      points_redeemed: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'transactions',
      timestamps: false
    }
  )
}
