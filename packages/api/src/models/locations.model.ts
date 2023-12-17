import { DataTypes, Model, Sequelize } from 'sequelize'
import { Restaurants } from './restaurants.model'

export class Locations extends Model {}

export const LocationModel = (sequelize: Sequelize) => {
  Locations.init(
    {
      location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Restaurants,
          key: 'restaurant_id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'locations',
      timestamps: false
    }
  )
}
