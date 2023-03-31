import { Sequelize, Model, DataTypes } from 'sequelize';
import { User } from '../interfaces';

export class UserModel extends Model<User> {}

export const initUser = (sequelize: Sequelize) => {
    UserModel.init(
        {
            id: { type: DataTypes.STRING, primaryKey: true },
            username: { type: DataTypes.STRING, allowNull: false },
            role: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false }
        },
        { sequelize, tableName: 'User' }
    );
};
