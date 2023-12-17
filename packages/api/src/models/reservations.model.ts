import { DataTypes, Model, Sequelize } from 'sequelize'
import { Users } from './users.model'
import { Locations } from './locations.model'

export class Reservations extends Model {}

export const ReservationModel = (sequelize: Sequelize) => {
  Reservations.init(
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Users,
          key: 'user_id'
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
