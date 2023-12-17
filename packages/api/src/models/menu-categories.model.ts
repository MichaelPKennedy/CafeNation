import { DataTypes, Model, Sequelize } from 'sequelize'

export class MenuCategories extends Model {}

export const MenuCategoryModel = (sequelize: Sequelize) => {
  MenuCategories.init(
    {
      category_id: {
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
      tableName: 'menu_categories',
      timestamps: false
    }
  )
}
