import { unauthorized } from '@hapi/boom';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserCredentials } from '../interfaces';
import { findUserByUsername } from '.';

export const login = async ({ username, password }: UserCredentials) => {
    const user = await findUserByUsername(username);

    if (!user || !compareSync(password, user.password)) {
        throw unauthorized();
    }

    return sign({ id: user.id, scope: user.role, role: user.role }, process.env.JWT_KEY!, {
        expiresIn: '1h'
    });
};
