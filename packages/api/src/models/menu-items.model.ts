import { DataTypes, Model, Sequelize } from 'sequelize'
import { Menus } from './menus.model'
import { Products } from './products.model'

export class MenuItems extends Model {}

export const MenuItemModel = (sequelize: Sequelize) => {
  MenuItems.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Products,
          key: 'product_id'
        }
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Menus,
          key: 'menu_id'
        }
      }
    },
    {
      sequelize,
      tableName: 'menu_items',
      timestamps: false
    }
  )
}
