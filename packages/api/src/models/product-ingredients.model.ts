import { DataTypes, Model, Sequelize } from 'sequelize'
import { Ingredients } from './ingredients.model'
import { Products } from './products.model'

export class ProductIngredients extends Model {}

export const ProductIngredientModel = (sequelize: Sequelize) => {
  ProductIngredients.init(
    {
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Ingredients,
          key: 'ingredient_id'
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Products,
          key: 'product_id'
        }
      }
    },
    {
      sequelize,
      tableName: 'product_ingredients',
      timestamps: false
    }
  )
}
