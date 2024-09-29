import { DataTypes, Model, Sequelize } from 'sequelize'
import { Locations } from './locations.model'

export class Schedules extends Model {}

export const ScheduleModel = (sequelize: Sequelize) => {
  Schedules.init(
    {
      schedule_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      location_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: Locations,
          key: 'location_id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'schedules',
      timestamps: false
    }
  )
}
