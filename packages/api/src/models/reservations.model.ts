import { DataTypes, Model, Sequelize } from 'sequelize'
import { Customers } from './customers.model'
import { Locations } from './locations.model'

export class Reservation extends Model {}

export const ReservationModel = (sequelize: Sequelize) => {
  Reservation.init(
    {
      reservation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Locations,
          key: 'location_id'
        }
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Customers,
          key: 'customer_id'
        }
      },
      guests: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reservation_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      special_requests: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'reservations',
      timestamps: false
    }
  )
}
