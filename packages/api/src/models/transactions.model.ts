import { DataTypes, Model, Sequelize } from 'sequelize'
import { Users } from './users.model'
import { Orders } from './orders.model'

export class Transactions extends Model {}

export const TransactionModel = (sequelize: Sequelize) => {
  Transactions.init(
    {
      transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Users,
          key: 'user_id'
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
