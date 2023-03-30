import { notFound } from '@hapi/boom';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { User } from '../interfaces';

class UserClass extends Model<User> {}

const UserModel = {
    id: { type: DataTypes.STRING, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
};

export const initUser = (sequelize: Sequelize) => {
    UserClass.init(UserModel, { sequelize, modelName: 'User' });
};

const getUser = (user: UserClass | null) => {
    if (!user) {
        throw notFound();
    }

    return user.toJSON();
};

export const findUserByUsername = async (username: string) =>
    getUser(await UserClass.findOne({ where: { username } }));

export const findUserById = async (id: number) => getUser(await UserClass.findByPk(id));
