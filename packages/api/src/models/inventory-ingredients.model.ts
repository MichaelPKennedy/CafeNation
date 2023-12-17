import { DataTypes, Model, Sequelize } from 'sequelize'
import { Inventory } from './inventory.model'
import { Ingredients } from './ingredients.model'

export class InventoryIngredients extends Model {}

export const InventoryIngredientModel = (sequelize: Sequelize) => {
  InventoryIngredients.init(
    {
      inventory_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Inventory,
          key: 'inventory_id'
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      upcharge: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
      },
      removal_credit: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
      }
    },
    {
      sequelize,
      tableName: 'inventory_ingredients',
      timestamps: false
    }
  )
}
