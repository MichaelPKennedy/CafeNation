import { DataTypes, Model, Sequelize } from 'sequelize'

export class Users extends Model {}

export const UsersModel = (sequelize: Sequelize) => {
  Users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      googleId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      primary_email: {
        type: DataTypes.STRING(50),
        unique: true,
        defaultValue: null
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
      },
      reward_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'Users',
      timestamps: false,
      indexes: [
        {
          name: 'unique_username',
          unique: true,
          fields: ['username']
        },
        {
          name: 'unique_email',
          unique: true,
          fields: ['primary_email']
        }
      ]
    }
  )
}
