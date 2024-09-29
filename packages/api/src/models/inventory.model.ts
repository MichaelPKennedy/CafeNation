import { DataTypes, Model, Sequelize } from 'sequelize'
import { Locations } from './locations.model'

export class Inventory extends Model {}

export const InventoryModel = (sequelize: Sequelize) => {
  Inventory.init(
    {
      inventory_id: {
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
      }
    },
    {
      sequelize,
      tableName: 'inventory',
      timestamps: false
    }
  )
}
