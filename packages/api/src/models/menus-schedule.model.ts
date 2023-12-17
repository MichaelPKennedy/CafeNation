import { DataTypes, Model, Sequelize } from 'sequelize'
import { Menus } from './menus.model'
import { Schedules } from './schedules.model'

export class MenusSchedule extends Model {}

export const MenuScheduleModel = (sequelize: Sequelize) => {
  MenusSchedule.init(
    {
      schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Schedules,
          key: 'schedule_id'
        }
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Menus,
          key: 'menu_id'
        }
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'menus_schedule',
      timestamps: false
    }
  )
}
