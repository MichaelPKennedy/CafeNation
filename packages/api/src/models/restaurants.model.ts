import { DataTypes, Model, Sequelize } from 'sequelize'

export class Restaurants extends Model {}

export const RestaurantModel = (sequelize: Sequelize) => {
  Restaurants.init(
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'restaurants',
      timestamps: false
    }
  )
}
