import { unauthorized } from '@hapi/boom';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getUser } from '.';
import { UserCredentials } from '../interfaces';

export const login = ({ id, password }: UserCredentials) => {
    const user = getUser(id);

    if (!user || !compareSync(password, user.password)) {
        throw unauthorized();
    }

    return sign({ id, scope: user.role, role: user.role }, process.env.JWT_KEY!, {
        expiresIn: '2h'
    });
};
