import { DataTypes, Model, Sequelize } from 'sequelize'

export class Ingredients extends Model {}

export const IngredientModel = (sequelize: Sequelize) => {
  Ingredients.init(
    {
      ingredient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'ingredients',
      timestamps: false
    }
  )
}
