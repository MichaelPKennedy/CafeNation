import { DataTypes, Model, Sequelize } from 'sequelize'

export class Menus extends Model {}

export const MenuModel = (sequelize: Sequelize) => {
  Menus.init(
    {
      menu_id: {
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
      start_time: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      end_time: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'menus',
      timestamps: false
    }
  )
}
