import { DataTypes, Model, Sequelize } from 'sequelize'
import { MenuCategories } from './menu-categories.model'

export class Products extends Model {}

export const ProductModel = (sequelize: Sequelize) => {
  Products.init(
    {
      product_id: {
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
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: MenuCategories,
          key: 'category_id'
        }
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      availabile: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'products',
      timestamps: false
    }
  )
}
