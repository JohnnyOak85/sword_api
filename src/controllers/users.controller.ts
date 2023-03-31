import { notFound } from '@hapi/boom';
import { UserModel } from '../classes';

const getUser = (user: UserModel | null) => {
    if (!user) {
        throw notFound();
    }

    return user.toJSON();
};

export const findUserByUsername = async (username: string) =>
    getUser(await UserModel.findOne({ where: { username } }));

export const findUserById = async (id: number) => getUser(await UserModel.findByPk(id));
