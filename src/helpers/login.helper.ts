import { unauthorized } from '@hapi/boom';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { findUserByUsername } from '../classes';
import { UserCredentials } from '../interfaces';

export const login = async ({ username, password }: UserCredentials) => {
    console.log('logging in');
    const user = await findUserByUsername(username);

    console.log(user);
    if (!user || !compareSync(password, user.password)) {
        throw unauthorized();
    }

    return sign({ id: user.id, scope: user.role, role: user.role }, process.env.JWT_KEY!, {
        expiresIn: '1h'
    });
};
